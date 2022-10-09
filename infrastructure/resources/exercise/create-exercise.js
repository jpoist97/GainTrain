import { storeExercise } from './exercise-store';

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

   console.log(`creating new exercise with userSub: ${userSub}`);

   const exerciseRecord =
      typeof event.body == 'object' ? event.body : JSON.parse(event.body);

   try {
      await storeExercise({ userSub, exerciseRecord });
      return { statusCode: 201, body: '' };
   } catch (dbError) {
      console.log(dbError);
      return { statusCode: 500, body: JSON.stringify(dbError) };
   }
};
