import { createQueryParamsMiddleWare } from '../src/query-validator-middle-ware';
import { intType } from '../src/types/int-type';
import { createArrayType } from '../src/types/array-type';
import { stringType } from '../src/types/string-type';
import { PerRequestContext } from 'next-middle-api';
import { PARSED_QUERY_PARAMS, QUERY_PARAM_PARSER_ERRORS, QUERY_PARAM_VALIDATION_ERROR } from '../src/query-parser-constants';
import { TypeSafeParams, ValidationErrors } from '../src/type-definitions';
import { expect } from 'chai';
import { createOptionalType } from '../src/types/optional-type';
import { dateType } from '../src/types/date-type';

describe('#createQueryParamsMiddleWare', () => {

  const params = {
    limit: intType,
    ids: createArrayType(intType),
    query: stringType,
    from: createOptionalType(dateType)
  };
  type ParamDefinition = typeof params;
  type Params = TypeSafeParams<ParamDefinition, keyof ParamDefinition>;
  type ParsingErrors = ValidationErrors<ParamDefinition, keyof ParamDefinition>;


  it('should be able to parse different types', async function () {
    const date = new Date();
    const query = {limit: '12345', ids: ['123', '124'], query: 'apple', from: date.toISOString()};
    let nextCalled = false;
    const nextMock = async () => {
      nextCalled = true;
    };
    const context = new PerRequestContext();
    const middleware = createQueryParamsMiddleWare({params});

    await middleware({query} as any, {} as any, context, nextMock)

    const parsed = context.getItem(PARSED_QUERY_PARAMS) as Params;
    expect(parsed.ids).to.eql([123, 124]);
    expect(parsed.limit).to.eql(12345);
    expect(parsed.query).to.eql('apple');
    expect(parsed.from!.getTime()).to.eql(date.getTime());
    expect(nextCalled).to.be.true;
  });


  it('should return validation errors', async function () {
    const query = {limit: '12345.6', ids: ['123.6', '124'], query: ''};
    let nextCalled = false;
    const nextMock = async () => {
      nextCalled = true;
    };
    const context = new PerRequestContext();
    const middleware = createQueryParamsMiddleWare({params});

    await middleware({query} as any, {} as any, context, nextMock)

    const errors = context.getItem(QUERY_PARAM_PARSER_ERRORS) as ParsingErrors;
    expect(errors.ids).to.equal('Not valid int value');
    expect(errors.limit).to.equal('Not valid int value');
    expect(errors.query).to.equal('value missing');
    expect(nextCalled).to.be.true;
  });


  it('should perform complex validations after if there no validator errors', async function () {
    const query = {limit: '12345', ids: ['123', '124'], query: 'apple'};
    const context = new PerRequestContext();
    const expectedError = 'something went wrong';
    const validate = async (params: Params, con: PerRequestContext): Promise<string | undefined> => {
      return expectedError;
    };
    const middleware = createQueryParamsMiddleWare({params, validate});

    await middleware({query} as any, {} as any, context, async () => {
    })

    const complexValidationError = context.getItem(QUERY_PARAM_VALIDATION_ERROR) as string;
    expect(complexValidationError).to.equal(expectedError);
  });
});
