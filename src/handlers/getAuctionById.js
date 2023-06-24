import createError from 'http-errors';
import middy from '../lib/middy';
import { getById } from '../lib/dynamo';

const getAuctionById = async (event) => {
  console.log('event', event);
  const { id } = event.pathParameters;
  console.log('id', id);

  const auction = await getById(id);
  if (!auction) {
    throw new createError.NotFound(`Auction with id: ${id} is not found!`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(auction),
  };
};

export const handler = middy(getAuctionById);
