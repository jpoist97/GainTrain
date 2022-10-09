import { storeWorkout } from './workout-store';

export const handler = async (event) => {
   if (!event.body) {
      return {
         statusCode: 400,
         body: 'invalid request, you are missing the parameter body',
      };
   }

   const { userSub } = event.queryStringParameters;
   if (!userSub) {
      return { statusCode: 400, body: 'No userSub provided' };
   }

   console.log(`creating new workout with userSub: ${userSub}`);

   const workoutRecord =
      typeof event.body == 'object' ? event.body : JSON.parse(event.body);

   try {
      await storeWorkout({ userSub, workoutRecord });
      return { statusCode: 201, body: '' };
   } catch (dbError) {
      console.log(dbError);
      return { statusCode: 500, body: JSON.stringify(dbError) };
   }
};
