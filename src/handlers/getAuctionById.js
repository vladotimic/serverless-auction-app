import createError from 'http-errors';
import middy from '../lib/middy';
import { getById } from '../lib/dynamo';

const getAuctionById = async (event) => {
  const { id } = event.pathParameters;

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
