import { getSingleCylce } from './cycle-store';

export const handler = async (event) => {
  const { userSub } = event.queryStringParameters;
  const { cycleId } = event.pathParameters

  if (!userSub || !cycleId) {
    return { statusCode: 400, body: 'No userSub or cycleId provided' };
  }

  try {
    const cycle = await getSingleCylce({ userSub, cycleId });
    return { statusCode: 200, body: JSON.stringify({ ...cycle }) };
  } catch (dbError) {
    return { statusCode: 500, body: JSON.stringify(dbError.message) };
  }
};