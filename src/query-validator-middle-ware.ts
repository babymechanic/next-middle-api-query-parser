import { NextApiRequest, NextApiResponse } from 'next';
import { ApiRouteMiddleware, PerRequestContext } from 'next-middle-api';
import { isThereAnyError, ValidationResult } from './validation-result';
import { PARSED_QUERY_PARAMS, QUERY_PARAM_PARSER_ERRORS, QUERY_PARAM_VALIDATION_ERROR } from './query-parser-constants';
import { ParamTypes, QueryParams } from './type-definitions';


export interface Opts {
  params: ParamTypes;

  validate?(params: QueryParams, context: PerRequestContext): Promise<string | undefined>;
}

function createSeed(params: ParamTypes) {
  type OptParams = typeof params;
  type KeyOfOptParams = keyof OptParams;
  const errors: ValidationResult<OptParams> = {};
  const parsedParams: Partial<Record<KeyOfOptParams, unknown>> = {};
  return {errors, parsedParams};
}

export const createQueryParamsMiddleWare = (opts: Opts): ApiRouteMiddleware => {
  const params = opts.params;
  const definedParams = Object.keys(params);

  return async (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext, next: () => Promise<void>): Promise<void> => {
    const queryParams = req.query;

    const {parsedParams, errors} = definedParams.reduce((acc, expectedKey) => {
      const paramConfig = params[expectedKey];
      const rawQueryValue = queryParams[expectedKey];
      acc.errors[expectedKey] = paramConfig.validate(rawQueryValue);
      if (acc.errors[expectedKey] != null) return acc;
      acc.parsedParams[expectedKey] = paramConfig.parse(rawQueryValue);
      return acc;
    }, createSeed(params));

    context.addItem(PARSED_QUERY_PARAMS, parsedParams);
    context.addItem(QUERY_PARAM_PARSER_ERRORS, errors);

    if (!isThereAnyError(errors) && opts.validate != null) {
      const validationResult: string | undefined = await opts.validate(queryParams, context);
      context.addItem(QUERY_PARAM_VALIDATION_ERROR, validationResult);
    }
    await next();
  }
}
