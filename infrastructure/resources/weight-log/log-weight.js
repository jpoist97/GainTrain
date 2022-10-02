import { storeWeightLog } from './weight-log-store';

export const handler = async (event) => {
  if (!event.body) {
    return { statusCode: 400, body: 'invalid request, you are missing the parameter body' };
  }

  const { userSub } = event.queryStringParameters;
  if (!userSub) {
    return { statusCode: 400, body: 'No userSub provided' };
  }

  console.log(`creating new workout with userSub: ${userSub}`);

  const requestBody = typeof event.body == 'object' ? event.body : JSON.parse(event.body);
  const { weight } = requestBody;

  if (weight === undefined) {
   return { statusCode: 400, body: 'No weight provided' };
  }

  try {
    await storeWeightLog({ userSub, weight });
    return { statusCode: 201, body: '' };
  } catch (dbError) {
    console.log(dbError);
    return { statusCode: 500, body: JSON.stringify(dbError) };
  }
};