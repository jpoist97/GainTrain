import { putItem, querySingle, } from '../utils/ddb-utils';
import { LOG_DATA_TABLE, } from '../constants/dynamo-constants';
import _ from 'lodash';

function getPk(userSub) {
   return `${userSub}#initiail_wo_log`;
}

function getSk(workoutId) {
   return `${workoutId}`;
}

async function storeWorkoutLog({ userSub, workoutId, exercisesPerformed }) {
   const params = {
      TableName: LOG_DATA_TABLE,
      Item: {
         pk: getPk(userSub),
         sk: getSk(workoutId),
         exercisesPerformed,
      }
   }

   await putItem(params);
}

async function getInitialWorkoutLog({ userSub, workoutId }) {
   const queryParams = {
      TableName: LOG_DATA_TABLE,
      Select: 'ALL_ATTRIBUTES',
      KeyConditionExpression: 'pk = :pk and sk = :sk',
      ExpressionAttributeValues: {
         ':pk': getPk(userSub),
         ':sk': getSk(workoutId),
      },
   };

   const initialLogRecord = await querySingle(queryParams);

   return formatInitialLogRecord(initialLogRecord);
}

function formatInitialLogRecord(initialLogRecord) {
   return _.omit({
      ...initialLogRecord,
      workoutId: initialLogRecord.sk,
   }, ['pk', 'sk']);
}

export {
   storeWorkoutLog,
   getInitialWorkoutLog,
};