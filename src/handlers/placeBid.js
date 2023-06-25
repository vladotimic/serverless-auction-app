import createError from 'http-errors';
import middy from '../lib/middy';
import { getById, updateBid } from '../lib/dynamo';

const placeBid = async (event) => {
  const { id } = event.pathParameters;
  const { amount } = event.body;

  if (!amount) {
    throw new createError.BadRequest('There is no amount!');
  }

  const auction = await getById(id);
  if (!auction) {
    throw new createError.NotFound(`Auction with id: ${id} not found!`);
  }

  const placedBid = await updateBid(id, amount);

  return {
    statusCode: 200,
    body: JSON.stringify(placedBid),
  };
};

export const handler = middy(placeBid);
