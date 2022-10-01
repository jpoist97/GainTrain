const { queryItems } = require("../utils/ddb-utils");

jest.doMock('../utils/ddb-utils', () => ({
   putItem: jest.fn(),
   queryItems: jest.fn(),
   queryItems: jest.fn(),
}));

import * as ddbUtils from '../utils/ddb-utils';
import * as cycleStore from './cycle-store';
import { WORKOUT_DATA_TABLE, } from '../constants/dynamo-constants';

const userSub = 'test-user-sub';

describe('cycle store tests', () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   describe('storeCycle tests', () => {
      it('should store cycle in DDB', async () => {
         // arrange
         const cycleRecord = {
            name: 'Push pull legs',
            workouts: ['workout-id-1', 'workout-id-2'],
            daysPerWeek: 4,
         }
         ddbUtils.putItem.mockResolvedValueOnce();

         // act
         await cycleStore.storeCycle({ userSub, cycleRecord });

         // assert
         expect(ddbUtils.putItem).toHaveBeenCalledTimes(1);
         expect(ddbUtils.putItem).toHaveBeenCalledWith({
            TableName: WORKOUT_DATA_TABLE,
            Item: {
               pk: 'test-user-sub#cycle',
               // mock uuid here so we can get a consistent response
               sk: '',
               name: 'Push pull legs',
               workouts: ['workout-id-1', 'workout-id-2'],
               daysPerWeek: 4,
            }
         });
      });
   });
});