import { queryExercises, querySharedExercises } from './exercise-store';

export const handler = async (event) => {
   const { userSub } = event.queryStringParameters;

   if (!userSub) {
      return { statusCode: 400, body: 'No userSub provided' };
   }

   try {
      const [sharedExercises, customExercises] = await Promise.all([
         querySharedExercises(),
         queryExercises({ userSub }),
      ]);
      return {
         statusCode: 200,
         body: JSON.stringify({
            exercises: [...sharedExercises, ...customExercises],
         }),
      };
   } catch (dbError) {
      console.log(dbError);
      return { statusCode: 500, body: JSON.stringify(dbError) };
   }
};
