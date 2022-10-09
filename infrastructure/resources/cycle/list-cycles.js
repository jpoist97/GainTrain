import { queryCycles } from './cycle-store';

export const handler = async (event) => {
   const { userSub } = event.queryStringParameters;

   if (!userSub) {
      return { statusCode: 400, body: 'No userSub provided' };
   }

   try {
      const cycles = await queryCycles({ userSub });
      return { statusCode: 200, body: JSON.stringify({ cycles }) };
   } catch (dbError) {
      console.log(dbError);
      return { statusCode: 500, body: JSON.stringify(dbError) };
   }
};
