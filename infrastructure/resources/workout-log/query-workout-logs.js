import { queryWorkoutLogs, getSingleWorkoutLog } from './workout-log-store';

export const handler = async (event) => {
  const { userSub, workoutId, startTs, endTs, limit } = event.queryStringParameters;

  if (!userSub || !workoutId) {
    return { statusCode: 400, body: 'userSub and workoutId are required query params' };
  }

  try { 
   if (startTs && endTs) {
      const workoutLogs = await queryWorkoutLogs({ userSub, workoutId, startTs, endTs, limit});
      return { statusCode: 200, body: JSON.stringify({ workoutLogs })};
   } 

    const log = await getSingleWorkoutLog({ userSub, workoutId });
    return { statusCode: 200, body: JSON.stringify({ ...log }) };
  } catch (dbError) {
    console.log(dbError);
    return { statusCode: 500, body: JSON.stringify(dbError) };
  }
};