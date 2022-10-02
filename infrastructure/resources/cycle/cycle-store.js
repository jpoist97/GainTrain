import { putItem, querySingle, queryItems, } from '../utils/ddb-utils';
import { WORKOUT_DATA_TABLE, } from '../constants/dynamo-constants';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

function getPk(userSub) {
   return `${userSub}#cycle`;
}

function getSk(cycleId) {
   return `${cycleId}`;
}

async function storeCycle({userSub, cycleRecord}) {
   const params = {
      TableName: WORKOUT_DATA_TABLE,
      Item: {
         pk: getPk(userSub),
         sk: uuidv4(),
         ...cycleRecord,
      }
   }

   await putItem(params);
}

async function queryCycles({ userSub }) {
   const queryParams = {
      TableName: WORKOUT_DATA_TABLE,
      Select: 'ALL_ATTRIBUTES',
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: {
         ':pk': getPk(userSub),
      },
   };

   const cycleRecords = await queryItems(queryParams);

   return cycleRecords.map(formatCycleRecord);
}

async function getSingleCylce({ userSub, cycleId }) {
   const queryParams = {
      TableName: WORKOUT_DATA_TABLE,
      Select: 'ALL_ATTRIBUTES',
      KeyConditionExpression: 'pk = :pk and sk = :sk',
      ExpressionAttributeValues: {
         ':pk': getPk(userSub),
         ':sk': getSk(cycleId),
      },
   };

   const cycleRecord = await querySingle(queryParams);

   return formatExerciseRecord(cycleRecord);
}

function formatCycleRecord(cycleRecord) {
   return _.omit({
      ...cycleRecord,
      cycleId: cycleRecord.sk,
   }, ['pk', 'sk']);
}

export {
   queryCycles,
   getSingleCylce,
   storeCycle,
};