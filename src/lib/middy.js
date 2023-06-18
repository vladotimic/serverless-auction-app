import middy from '@middy/core';
import httpCors from '@middy/http-cors';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import httpEventNormalizer from '@middy/http-event-normalizer';

export default (handler) =>
  middy(handler).use([
    httpCors(),
    httpJsonBodyParser(),
    httpErrorHandler(),
    httpEventNormalizer(),
  ]);
