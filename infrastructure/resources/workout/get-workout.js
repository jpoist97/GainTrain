import { getSingleWorkout } from './workout-store';

export const handler = async (event) => {
   const { userSub } = event.queryStringParameters;
   const { workoutId } = event.pathParameters;

   if (!userSub || !workoutId) {
      return { statusCode: 400, body: 'No userSub or workoutId provided' };
   }

   try {
      const workout = await getSingleWorkout({ userSub, workoutId });
      return { statusCode: 200, body: JSON.stringify({ ...workout }) };
   } catch (dbError) {
      return { statusCode: 500, body: JSON.stringify(dbError.message) };
   }
};
