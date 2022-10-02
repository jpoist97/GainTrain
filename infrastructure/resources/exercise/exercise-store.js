import { putItem, querySingle, queryItems, } from '../utils/ddb-utils';
import { WORKOUT_DATA_TABLE, } from '../constants/dynamo-constants';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

function getPk(userSub) {
   return `${userSub}#exercise`;
}

function getSk(exerciseId) {
   return `${exerciseId}`;
}

async function storeExercise({userSub, exerciseRecord}) {
   const params = {
      TableName: WORKOUT_DATA_TABLE,
      Item: {
         pk: getPk(userSub),
         sk: uuidv4(),
         ...exerciseRecord,
      }
   }

   await putItem(params);
}

async function queryExercises({ userSub }) {
   const queryParams = {
      TableName: WORKOUT_DATA_TABLE,
      Select: 'ALL_ATTRIBUTES',
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: {
         ':pk': getPk(userSub),
      },
   };

   const exerciseRecords = await queryItems(queryParams);

   return exerciseRecords.map(formatExerciseRecord);
}

async function getSingleExercise({ userSub, exerciseId }) {
   const queryParams = {
      TableName: WORKOUT_DATA_TABLE,
      Select: 'ALL_ATTRIBUTES',
      KeyConditionExpression: 'pk = :pk and sk = :sk',
      ExpressionAttributeValues: {
         ':pk': getPk(userSub),
         ':sk': getSk(exerciseId),
      },
   };

   const exerciseRecord = await querySingle(queryParams);

   return formatExerciseRecord(exerciseRecord);
}

function formatExerciseRecord(exerciseRecord) {
   return _.omit({
      ...exerciseRecord,
      exerciseId: exerciseRecord.sk,
   }, ['pk', 'sk']);
}

export {
   storeExercise,
   queryExercises,
   getSingleExercise,
};