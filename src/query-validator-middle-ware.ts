import { NextApiRequest, NextApiResponse } from 'next';
import { ParamConfig } from './param-config';
import { ApiRouteMiddleware, PerRequestContext } from 'next-middle-api';
import { ValidationResult } from './validation-result';
import { PARSED_QUERY_PARAMS, QUERY_PARAM_PARSER_ERRORS, QUERY_PARAM_VALIDATION_ERROR } from './query-parser-constants';


type QueryParams = { [p: string]: string | string[] };

interface Opts {
  params: { [i: string]: ParamConfig<unknown> };

  validate?(params: QueryParams, context: PerRequestContext): Promise<string | undefined>;
}


export const createQueryParamsMiddleWare = (opts: Opts): ApiRouteMiddleware => {
  const params = opts.params;
  type OptParams = typeof params;
  const definedParams = Object.keys(params);
  type KeyOfOptParams = keyof OptParams;

  return async (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext, next: () => Promise<void>): Promise<void> => {
    const queryParams = req.query;
    const errors: ValidationResult<OptParams> = {};
    const parsedParams: Partial<Record<KeyOfOptParams, unknown>> = {};

    definedParams.forEach((expectedKey) => {
      const paramConfig = params[expectedKey];
      const rawQueryValue = queryParams[expectedKey];
      if (paramConfig.isOptional && rawQueryValue == null) return;
      errors[expectedKey] = paramConfig.type.validate(rawQueryValue);
      if (errors[expectedKey] != null) return;
      parsedParams[expectedKey] = paramConfig.type.parse(rawQueryValue);
    });
    context.addItem(PARSED_QUERY_PARAMS, parsedParams);
    context.addItem(QUERY_PARAM_PARSER_ERRORS, errors);

    const validationResult: string | undefined = await opts.validate?.(queryParams, context);
    context.addItem(QUERY_PARAM_VALIDATION_ERROR, validationResult);
  }
}
