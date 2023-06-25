import { v4 as uuid } from 'uuid';
import createError from 'http-errors';
import middy from '../lib/middy';
import { create } from '../lib/dynamo';

const createAuction = async (event) => {
  const { title } = event.body;

  if (!title) {
    throw new createError.BadRequest('There is no title!');
  }

  const now = new Date();
  const endDate = new Date();
  endDate.setHours(now.getHours() + 1);

  const auction = {
    id: uuid(),
    title,
    status: 'OPEN',
    createdAt: now.toISOString(),
    endingAt: endDate.toISOString(),
    highestBid: {
      amount: 0,
    },
  };

  await create(auction);

  return {
    statusCode: 201,
    body: JSON.stringify({ auction }),
  };
};

export const handler = middy(createAuction);
