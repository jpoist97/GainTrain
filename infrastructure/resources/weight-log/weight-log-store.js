import { putItem, queryItems } from '../utils/ddb-utils';
import { LOG_DATA_TABLE } from '../constants/dynamo-constants';
import _ from 'lodash';
import { DateTime } from 'luxon';

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
         sk: DateTime.utc().toISO(),
         weight,
      },
   };

   await putItem(params);
}

async function queryWeightLogs({ userSub, startTs, endTs, limit }) {
   let KeyConditionExpression = 'pk = :pk';
   const ExpressionAttributeValues = {
      ':pk': getPk(userSub),
   };

   if (startTs && endTs) {
      KeyConditionExpression += 'and sk between :startTs and :endTs';
      ExpressionAttributeValues[':startTs'] = startTs;
      ExpressionAttributeValues[':endTs'] = endTs;
   }

   const queryParams = {
      TableName: LOG_DATA_TABLE,
      Select: 'ALL_ATTRIBUTES',
      KeyConditionExpression,
      ExpressionAttributeValues,
   };

   if (limit) {
      queryParams['Limit'] = limit;
   }

   const weightLogRecords = await queryItems(queryParams);

   return weightLogRecords.map(formatWeightLogRecord);
}

function formatWeightLogRecord(weightLogRecord) {
   return _.omit(
      {
         ...weightLogRecord,
         ts: weightLogRecord.sk,
      },
      ['pk', 'sk']
   );
}

export { storeWeightLog, queryWeightLogs };
