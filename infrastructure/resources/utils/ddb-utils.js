import * as AWS from 'aws-sdk';

const db = new AWS.DynamoDB.DocumentClient();

async function putItem(params) {
   await db.putItem(params).promise();
}

async function querySingle(queryParams) {
   return await db.query(queryParams).promise().Items[0];
}

async function queryItems(queryParams) {
   return await db.query(queryParams).promise().Items;
}

export {
 putItem,
 querySingle,
 queryItems,
}