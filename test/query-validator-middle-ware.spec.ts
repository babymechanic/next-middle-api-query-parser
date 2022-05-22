import { createQueryParamsMiddleWare } from '../src/query-validator-middle-ware';
import { intType } from '../src/types/int-type';
import { createArrayType } from '../src/types/array-type';
import { stringType } from '../src/types/string-type';
import { PerRequestContext } from 'next-middle-api';
import { PARSED_QUERY_PARAMS, QUERY_PARAM_PARSER_ERRORS } from '../src/query-parser-constants';
import { TypeSafeParams, ValidationErrors } from '../src/type-definitions';
import { expect } from 'chai';

describe('#createQueryParamsMiddleWare', () => {

  const params = {
    limit: intType,
    ids: createArrayType(intType),
    query: stringType
  };
  const middleware = createQueryParamsMiddleWare({params});
  type ParamDefinition = typeof params;
  type Params = TypeSafeParams<ParamDefinition, keyof ParamDefinition>
  type ParsingErrors = ValidationErrors<ParamDefinition, keyof ParamDefinition>

  it('should be able to parse different types', async function () {
    const query = {limit: '12345', ids: ['123', '124'], query: 'apple'};
    let nextCalled = false;
    const nextMock = async () => {
      nextCalled = true;
    };
    const context = new PerRequestContext();

    await middleware({query} as any, {} as any, context, nextMock)

    const parsed = context.getItem(PARSED_QUERY_PARAMS) as Params;
    expect(parsed.ids).to.eql([123, 124]);
    expect(parsed.limit).to.eql(12345);
    expect(parsed.query).to.eql('apple');
    expect(nextCalled).to.be.true;
  });

  it('should return validation errors', async function () {
    const query = {limit: '12345.6', ids: ['123.6', '124'], query: ''};
    let nextCalled = false;
    const nextMock = async () => {
      nextCalled = true;
    };
    const context = new PerRequestContext();

    await middleware({query} as any, {} as any, context, nextMock)

    const errors = context.getItem(QUERY_PARAM_PARSER_ERRORS) as ParsingErrors;
    expect(errors.ids).to.equal('Not valid int value');
    expect(errors.limit).to.equal('Not valid int value');
    expect(errors.query).to.equal('value missing');
    expect(nextCalled).to.be.true;
  });
});
