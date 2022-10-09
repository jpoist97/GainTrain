import * as AWS from 'aws-sdk';

const db = new AWS.DynamoDB.DocumentClient();

async function putItem(params) {
   console.log('putting item in dynamo with params', params);
   await db.put(params).promise();
}

async function querySingle(queryParams) {
   console.log('single dynamo query with params', queryParams);
   const { Items } = await db.query(queryParams).promise();
   return Items[0];
}

async function queryItems(queryParams) {
   console.log('querying dynamo db for items', queryParams);
   const dbResponse = await db.query(queryParams).promise();
   return dbResponse.Items;
}

export { putItem, querySingle, queryItems };
