import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  GetCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: 'eu-west-1' });
const dynamo = DynamoDBDocumentClient.from(client);

const TableName = process.env.AUCTIONS_TABLE_NAME;

const create = async (Item) => {
  const params = {
    TableName,
    Item,
  };

  const command = new PutCommand(params);
  try {
    const data = await dynamo.send(command);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const get = async () => {
  const params = {
    TableName,
  };

  const command = new ScanCommand(params);
  try {
    const data = await dynamo.send(command);
    return data.Items;
  } catch (error) {
    console.error(error);
  }
};

const getById = async (id) => {
  const params = {
    TableName,
    Key: {
      id,
    },
  };

  const command = new GetCommand(params);
  try {
    const data = await dynamo.send(command);
    return data.Item;
  } catch (error) {
    console.error(error);
  }
};

const updateBid = async (id, amount) => {
  const params = {
    TableName,
    Key: {
      id,
    },
    UpdateExpression: 'set highestBid.amount = :amount',
    ExpressionAttributeValues: {
      ':amount': amount,
    },
    ReturnValues: 'ALL_NEW',
  };

  const command = new UpdateCommand(params);
  try {
    const data = await dynamo.send(command);
    return data.Attributes;
  } catch (error) {
    console.error(error);
  }
};

export { create, get, getById, updateBid };
