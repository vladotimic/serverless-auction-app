import middy from '../lib/middy';
import { get } from '../lib/dynamo';

const getAuctions = async () => {
  const auctions = await get();

  return {
    statusCode: 200,
    body: JSON.stringify({ auctions }),
  };
};

export const handler = middy(getAuctions);
