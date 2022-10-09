import { storeCycle } from './cycle-store';

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

   console.log(`creating new cycle with userSub: ${userSub}`);

   const cycleRecord =
      typeof event.body == 'object' ? event.body : JSON.parse(event.body);

   try {
      await storeCycle({ userSub, cycleRecord });
      return { statusCode: 201, body: '' };
   } catch (dbError) {
      console.log(dbError);
      return { statusCode: 500, body: JSON.stringify(dbError) };
   }
};
