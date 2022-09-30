import { storeWorkout } from './workout-store';

export const handler = async (event) => {
  if (!event.body) {
    return { statusCode: 400, body: 'invalid request, you are missing the parameter body' };
  }

  const workoutRecord = typeof event.body == 'object' ? event.body : JSON.parse(event.body);
  const userSub = 'temp-user-sub';

  try {
    await storeWorkout({ userSub, workoutRecord });
    return { statusCode: 201, body: '' };
  } catch (dbError) {
    return { statusCode: 500, body: dbError };
  }
};