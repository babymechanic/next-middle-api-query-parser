# next-middle-api-query-parser

This is a middleware for [next-middle-api](https://www.npmjs.com/package/next-middle-api).

It allows you to do the following

- get parsed query params in your handler
- apply validation for your query params
  - apply simple validations 
  - apply a complex validation if there are no simple validation errors
- get a type based on your params definition
- create a definition for custom type


## define a route with in built data types

```typescript
//  host/api/hello?limit=20&query=test&startFrom=2022-05-21T05:54:34.523Z&ids=2&ids=3
import { createHandlers, PerRequestContext } from 'next-middle-api';
import {
  createOptionalType,
  createQueryParamsMiddleWare,
  dateType,
  intType,
  stringType,
  TypeSafeParams,
  PARSED_QUERY_PARAMS,
  QUERY_PARAM_PARSER_ERRORS,
  QUERY_PARAM_VALIDATION_ERROR
} from '../../../next-middle-api-query-parser';
import { createArrayType, ValidationErrors } from 'next-middle-api-query-parser';


const params = {
  limit: intType,
  query: stringType,
  startFrom: createOptionalType(dateType),
  ids: createArrayType(intType)
};

type ParamsType = typeof params;
type MyQueryParams = TypeSafeParams<ParamsType>;
type ParsingErrors = ValidationErrors<ParamsType>;

const expensiveValidation = async (params: MyQueryParams, context: PerRequestContext): Promise<string | undefined> => {
  return 'some expensive validation';
};

const queryParamsMiddleWare = createQueryParamsMiddleWare({
  params,
  validate: expensiveValidation
});

export default createHandlers({
  get: {
    handler: (req, res, context) => {
      const myParams = context.getItem(PARSED_QUERY_PARAMS) as MyQueryParams;
      const errors = context.getItem(QUERY_PARAM_PARSER_ERRORS) as ParsingErrors;
      const complexError = context.getItem(QUERY_PARAM_VALIDATION_ERROR) as string | undefined;
      res.status(200).json({myParams, errors, complexError});
    },
    preHooks: [queryParamsMiddleWare]
  }
});
```
# License

MIT License

Copyright (c) 2022 Mohnish Chowdhury

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
