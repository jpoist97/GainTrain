import { queryWorkouts } from './workout-store';

export const handler = async (event) => {
  const { userSub } = event.queryStringParameters;

  if (!userSub) {
    return { statusCode: 400, body: 'No userSub provided' };
  }

  try {
    const workouts = await queryWorkouts({ userSub });
    return { statusCode: 200, body: JSON.stringify({ workouts }) };
  } catch (dbError) {
    console.log(dbError);
    return { statusCode: 500, body: JSON.stringify(dbError) };
  }
};