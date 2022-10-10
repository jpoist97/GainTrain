import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import * as workoutService from '../lib/services/workout-service';
import * as exerciseService from '../lib/services/exercise-service';
import * as cycleService from '../lib/services/cycle-service';
import * as weightLogService from '../lib/services/weight-log-service';
import {
   WORKOUT_DATA_TABLE,
   LOG_DATA_TABLE,
} from '../constants/dynamo-constants';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import * as cognito from 'aws-cdk-lib/aws-cognito';

export class InfrastructureStack extends cdk.Stack {
   constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);

      const userPool = new cognito.UserPool(this, 'gaintrain-user-pool', {
         selfSignUpEnabled: true,
         accountRecovery: cognito.AccountRecovery.PHONE_AND_EMAIL,
         userVerification: {
            emailStyle: cognito.VerificationEmailStyle.LINK,
         },
         autoVerify: {
            email: true,
         },
         standardAttributes: {
            email: {
               required: true,
               mutable: true,
            },
         },
      });

      const userPoolClient = new cognito.UserPoolClient(
         this,
         'gaintrain-user-client',
         {
            userPool,
         }
      );

      const domain = userPool.addDomain('Domain', {
         cognitoDomain: {
            domainPrefix: 'gaintrain',
         },
      });

      // Define workout_data table
      const workoutDataTable = new Table(this, WORKOUT_DATA_TABLE, {
         partitionKey: {
            name: 'pk',
            type: AttributeType.STRING,
         },
         sortKey: {
            name: 'sk',
            type: AttributeType.STRING,
         },
         tableName: WORKOUT_DATA_TABLE,
      });

      // Define log_data table
      const logDataTable = new Table(this, LOG_DATA_TABLE, {
         partitionKey: {
            name: 'pk',
            type: AttributeType.STRING,
         },
         sortKey: {
            name: 'sk',
            type: AttributeType.STRING,
         },
         tableName: LOG_DATA_TABLE,
      });

      const gainTrainApi = new RestApi(this, 'GainTrain API', {
         restApiName: 'GainTrain API',
      });

      new workoutService.WorkoutDataServiceStack(
         this,
         'WorkoutStack',
         workoutDataTable,
         gainTrainApi
      );
      new exerciseService.ExerciseDataServiceStack(
         this,
         'ExerciseStack',
         workoutDataTable,
         gainTrainApi
      );
      new cycleService.CycleDataServiceStack(
         this,
         'CycleStack',
         workoutDataTable,
         gainTrainApi
      );

      new weightLogService.WeightLogDataServiceStack(
         this,
         'WeightLogStack',
         logDataTable,
         gainTrainApi
      );
   }
}
