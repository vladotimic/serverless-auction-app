import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

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

export { create };
