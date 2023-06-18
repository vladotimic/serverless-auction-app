import { v4 as uuid } from 'uuid';
import createError from 'http-errors';
import middy from '../middlewares/middy';
import { create } from '../services/dynamo';

async function createAuction(event) {
  const { title } = event.body;

  if (!title) {
    return new createError.BadRequest('There is no title!');
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
  };

  await create(auction);

  return {
    statusCode: 201,
    body: JSON.stringify({ auction }),
  };
}

export const handler = middy(createAuction);
