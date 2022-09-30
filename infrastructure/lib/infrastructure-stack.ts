import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import * as workoutService from '../lib/services/workout-service';
import { WORKOUT_DATA_TABLE, LOG_DATA_TABLE, } from '../constants/dynamo-constants';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define workout_data table
    const workoutDataTable = new Table(this, WORKOUT_DATA_TABLE, {
      partitionKey: {
        name: 'pk',
        type: AttributeType.STRING
      },
      sortKey: {
         name: 'sk',
         type: AttributeType.STRING
      },
      tableName: WORKOUT_DATA_TABLE,
    });

    // Define log_data table
    const logDataTable = new Table(this, LOG_DATA_TABLE, {
      partitionKey: {
        name: 'pk',
        type: AttributeType.STRING
      },
      sortKey: {
         name: 'sk',
         type: AttributeType.STRING
      },
      tableName: LOG_DATA_TABLE,
    });

    // The code that defines your stack goes here
    new workoutService.WorkoutDataServiceStack(this, 'WorkoutStack', workoutDataTable);
  }
}
