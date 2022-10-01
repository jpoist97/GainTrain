import { putItem, queryItems, } from '../utils/ddb-utils';
import { LOG_DATA_TABLE, } from '../constants/dynamo-constants';

function getPk(userSub) {
   return `${userSub}#weight`;
}

function getSk(ts) {
   return `${ts}`;
}

async function storeWeightLog({ userSub, weight }) {
   const params = {
      TableName: LOG_DATA_TABLE,
      Item: {
         pk: getPk(userSub),
         // TODO: Update this to put the proper ISO formatted date, also import moment
         sk: moment(),
         weight,
      }
   }

   await putItem(params);
}

// TODO: add a range to this function
async function queryWeightLogs({ userSub, startTs, endTs }) {
   const queryParams = {
      TableName: LOG_DATA_TABLE,
      Select: 'ALL_ATTRIBUTES',
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: {
         ':pk': getPk(userSub),
      },
   };

   const weightLogRecords = await queryItems(queryParams);

   return weightLogRecords.map(formatWeightLogRecord);
}

function formatWeightLogRecord(weightLogRecord) {
   return _.omit({
      ...weightLogRecord,
      ts: weightLogRecord.sk,
   }, ['pk', 'sk']);
}

export {
   storeWeightLog,
   queryWeightLogs,
};