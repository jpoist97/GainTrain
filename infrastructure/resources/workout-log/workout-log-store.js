import { putItem, querySingle, queryItems, } from '../utils/ddb-utils';
import { LOG_DATA_TABLE, } from '../constants/dynamo-constants';
import _ from 'lodash';

function getPk(userSub, workoutId) {
   return `${userSub}#wo_log#${workoutId}`;
}

function getSk(ts) {
   return `${ts}`;
}

async function storeWorkoutLog({ userSub, workoutId, exercisesPerformed }) {
   const params = {
      TableName: LOG_DATA_TABLE,
      Item: {
         pk: getPk(userSub, workoutId),
         // TODO: Update this to put the proper ISO formatted date, also import moment
         sk: moment(),
         exercisesPerformed,
      }
   }

   await putItem(params);
}

async function getSingleWorkoutLog({ userSub, workoutId }) {
   const queryParams = {
      TableName: LOG_DATA_TABLE,
      Select: 'ALL_ATTRIBUTES',
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: {
         ':pk': getPk(userSub, workoutId),
      },
   };

   let workoutLogRecord = await querySingle(queryParams);

   if (!workoutLogRecord) {
      workoutLogRecord = await getInitialWorkoutLog({ userSub, workoutId });
   }

   return formatWorkoutLogRecord(workoutLogRecord);
}

// TODO: add a range to this function
async function queryWorkoutLogs({ userSub, workoutId, startTs, endTs }) {
   const queryParams = {
      TableName: LOG_DATA_TABLE,
      Select: 'ALL_ATTRIBUTES',
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: {
         ':pk': getPk(userSub, workoutId),
      },
   };

   const workoutLogRecords = await queryItems(queryParams);

   return workoutLogRecords.map(formatWorkoutLogRecord);
}

function formatWorkoutLogRecord(workoutLogRecord) {
   return _.omit({
      ...workoutLogRecord,
      ts: workoutLogRecord.sk,
   }, ['pk', 'sk']);
}

export {
   storeWorkoutLog,
   getSingleWorkoutLog,
   queryWorkoutLogs,
};