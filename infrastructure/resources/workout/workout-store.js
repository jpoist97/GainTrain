import { putItem, querySingle, queryItems, } from '../utils/ddb-utils';
import { WORKOUT_DATA_TABLE, } from '../constants/dynamo-constants';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

function getPk(userSub) {
   return `${userSub}#workout`;
}

function getSk(workoutId) {
   return `${workoutId}`;
}

async function storeWorkout({userSub, workoutRecord}) {
   const params = {
      TableName: WORKOUT_DATA_TABLE,
      Item: {
         pk: getPk(userSub),
         sk: uuidv4(),
         ...workoutRecord,
      }
   }

   await putItem(params);
}

async function queryWorkouts({ userSub }) {
   const queryParams = {
      TableName: WORKOUT_DATA_TABLE,
      Select: 'ALL_ATTRIBUTES',
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: {
         ':pk': getPk(userSub),
      },
   };

   const workoutRecords = await queryItems(queryParams);

   return workoutRecords.map(formatWorkoutRecord);
}

async function getSingleWorkout({ userSub, workoutId }) {
   const queryParams = {
      TableName: WORKOUT_DATA_TABLE,
      Select: 'ALL_ATTRIBUTES',
      KeyConditionExpression: 'pk = :pk and sk = :sk',
      ExpressionAttributeValues: {
         ':pk': getPk(userSub),
         ':sk': getSk(workoutId),
      },
   };

   const workoutRecord = await querySingle(queryParams);

   return formatWorkoutRecord(workoutRecord);
}

function formatWorkoutRecord(workoutRecord) {
   return _.omit({
      ...workoutRecord,
      wokroutId: workoutRecord.sk,
   }, ['pk', 'sk']);
}

export {
   storeWorkout,
   queryWorkouts,
   getSingleWorkout,
};