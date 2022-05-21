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
//  host/api/hello?limit=20&query=test&dateFrom=2022-05-21T05%3A56%3A30.053Z
import { createHandlers } from 'next-middle-api';
import { createOptionalType, createQueryParamsMiddleWare, dateType, intType, stringType, TypeSafeParams, PARSED_QUERY_PARAMS } from 'next-middle-api-query-parser';

//  in built types
const params = {
  limit: intType,
  query: stringType,
  // use the optional factory to define an optional type
  startFrom: createOptionalType(dateType)
};

type ParamsType = typeof params;
// Get typed query params from your definition
type MyQueryParams = TypeSafeParams<ParamsType, keyof ParamsType>;

const queryParamsMiddleWare = createQueryParamsMiddleWare({
  params: params
});

export default createHandlers({
  get: {
    handler: (req, res, context) => {
      // fetch the params as a typed value
      const myParams = context.getItem(PARSED_QUERY_PARAMS) as MyQueryParams;
      const {limit, startFrom, query} = myParams;
      res.status(200).json({limit, startFrom, query});
    },
    preHooks: [queryParamsMiddleWare]
  },
})
```

## handle validation errors

```typescript
//  host/api/hello
import { createHandlers } from 'next-middle-api';
import { createOptionalType, createQueryParamsMiddleWare, dateType, intType, stringType, TypeSafeParams, PARSED_QUERY_PARAMS } from 'next-middle-api-query-parser';

const params = {
  limit: intType,
};

type ParamsType = typeof params;
type MyQueryParams = TypeSafeParams<ParamsType, keyof ParamsType>;

const queryParamsMiddleWare = createQueryParamsMiddleWare({
  params: params
});

export default createHandlers({
  get: {
    handler: (req, res, context) => {
      const myParams = context.getItem(PARSED_QUERY_PARAMS) as MyQueryParams;
      const {limit, startFrom, query} = myParams;
      res.status(200).json({limit, startFrom, query});
    },
    preHooks: [queryParamsMiddleWare]
  },
})
```
