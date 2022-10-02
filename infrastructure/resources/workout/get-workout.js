import { getSingleWorkout } from './workout-store';

export const handler = async (event) => {
  const { userSub } = event.queryStringParameters;
  const { workoutId } = event.pathParameters

  if (!userSub || !workoutId) {
    return { statusCode: 400, body: 'No userSub or workoutId provided' };
  }

  try {
    const workouts = await getSingleWorkout({ userSub, workoutId });
    return { statusCode: 200, body: JSON.stringify({ workouts }) };
  } catch (dbError) {
    return { statusCode: 500, body: JSON.stringify(dbError.message) };
  }
};