import { queryWeightLogs } from './weight-log-store';

export const handler = async (event) => {
  const { userSub, startTs, endTs, limit } = event.queryStringParameters;

  if (!userSub) {
    return { statusCode: 400, body: 'No userSub provided' };
  }

  try {
    const logs = await queryWeightLogs({ userSub, startTs, endTs, limit });
    return { statusCode: 200, body: JSON.stringify({ logs }) };
  } catch (dbError) {
    console.log(dbError);
    return { statusCode: 500, body: JSON.stringify(dbError) };
  }
};