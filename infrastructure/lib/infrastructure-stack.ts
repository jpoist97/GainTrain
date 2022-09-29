import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import * as workoutService from '../lib/services/workout-service';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define workout_data table
    const workoutDataTable = new Table(this, 'workout_data', {
      partitionKey: {
        name: 'pk',
        type: AttributeType.STRING
      },
      sortKey: {
         name: 'sk',
         type: AttributeType.STRING
      },
      tableName: 'workout_data',
    });

    // Define log_data table
    const logDataTable = new Table(this, 'log_data', {
      partitionKey: {
        name: 'pk',
        type: AttributeType.STRING
      },
      sortKey: {
         name: 'sk',
         type: AttributeType.STRING
      },
      tableName: 'log_data',
    });

    // The code that defines your stack goes here
    new workoutService.WorkoutDataServiceStack(this, 'WorkoutStack', workoutDataTable);
  }
}
