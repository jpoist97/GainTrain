import { storeWorkoutLog } from './initial-workout-log-store';

export const handler = async (event) => {
  if (!event.body) {
    return { statusCode: 400, body: 'invalid request, you are missing the parameter body' };
  }

  const { userSub, workoutId } = event.queryStringParameters;
  if (!userSub || !workoutId) {
    return { statusCode: 400, body: 'No userSub or workoutId provided' };
  }

  console.log(`sotring initial workout log`, userSub, workoutId, exercisesPerformed);

  const requestBody = typeof event.body == 'object' ? event.body : JSON.parse(event.body);

  if (!requestBody.exercisesPerformed) {
     return { statusCode: 400, body: 'exercisesPerformed is a required body field'};
  }

  try {
    await storeWorkoutLog({ userSub, workoutId, exercisesPerformed });
    return { statusCode: 201, body: '' };
  } catch (dbError) {
    console.log(dbError);
    return { statusCode: 500, body: JSON.stringify(dbError) };
  }
};