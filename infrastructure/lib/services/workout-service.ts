import { IResource, LambdaIntegration, MockIntegration, PassthroughBehavior, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { App, Stack, RemovalPolicy } from 'aws-cdk-lib';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from 'path'
import { Construct } from 'constructs';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { addCorsOptions } from '../utils/cors-utils';

export class WorkoutDataServiceStack extends Construct {
  constructor(scope: Construct, id: string, workoutDataTable: Table, api: RestApi) {
    super(scope, id);

    const nodeJsFunctionProps: NodejsFunctionProps = {
      bundling: {
        externalModules: [
          'aws-sdk',
        ],
      },
      depsLockFilePath: join(__dirname, '..', '..', 'resources', 'package-lock.json'),
      runtime: Runtime.NODEJS_14_X,
    }

    // Create a Lambda function for each of the CRUD operations
   //  const getOneLambda = new NodejsFunction(this, 'getOneItemFunction', {
   //    entry: join(__dirname, 'lambdas', 'get-one.ts'),
   //    ...nodeJsFunctionProps,
   //  });
   //  const getAllLambda = new NodejsFunction(this, 'getAllItemsFunction', {
   //    entry: join(__dirname, 'lambdas', 'get-all.ts'),
   //    ...nodeJsFunctionProps,
   //  });
    const createWorkoutLambda = new NodejsFunction(this, 'createWorkoutLambda', {
      entry: join(__dirname, '..', '..', 'resources', 'workout', 'create-workout.js'),
      functionName: 'createWorkoutLambda',
      ...nodeJsFunctionProps,
    });
    const getWorkoutLambda = new NodejsFunction(this, 'getWorkoutLambda', {
      entry: join(__dirname, '..', '..', 'resources', 'workout', 'get-workout.js'),
      functionName: 'getWorkoutLambda',
      ...nodeJsFunctionProps,
    });
    const listWorkoutsLambda = new NodejsFunction(this, 'listWorkoutsLambda', {
      entry: join(__dirname, '..', '..', 'resources', 'workout', 'list-workouts.js'),
      functionName: 'listWorkoutsLambda',
      ...nodeJsFunctionProps,
    });
   //  const updateOneLambda = new NodejsFunction(this, 'updateItemFunction', {
   //    entry: join(__dirname, 'lambdas', 'update-one.ts'),
   //    ...nodeJsFunctionProps,
   //  });
   //  const deleteOneLambda = new NodejsFunction(this, 'deleteItemFunction', {
   //    entry: join(__dirname, 'lambdas', 'delete-one.ts'),
   //    ...nodeJsFunctionProps,
   //  });

    // Grant the Lambda function read access to the DynamoDB table
   //  dynamoTable.grantReadWriteData(getAllLambda);
    workoutDataTable.grantReadWriteData(getWorkoutLambda);
    workoutDataTable.grantReadWriteData(createWorkoutLambda);
    workoutDataTable.grantReadWriteData(listWorkoutsLambda);
   //  dynamoTable.grantReadWriteData(deleteOneLambda);

    // Integrate the Lambda functions with the API Gateway resource
    const getWorkoutIntegration = new LambdaIntegration(getWorkoutLambda);
    const createWorkoutIntegration = new LambdaIntegration(createWorkoutLambda);
    const listWorkoutsIntegration = new LambdaIntegration(listWorkoutsLambda);
   //  const updateOneIntegration = new LambdaIntegration(updateOneLambda);
   //  const deleteOneIntegration = new LambdaIntegration(deleteOneLambda);


    // Create an API Gateway resource for each of the CRUD operations


    const workouts = api.root.addResource('workouts');
    workouts.addMethod('GET', listWorkoutsIntegration);
    workouts.addMethod('POST', createWorkoutIntegration);
    addCorsOptions(workouts);

    const singleWorkout = workouts.addResource('{workoutId}');
    singleWorkout.addMethod('GET', getWorkoutIntegration);
   //  singleItem.addMethod('PATCH', updateOneIntegration);
   //  singleItem.addMethod('DELETE', deleteOneIntegration);
   //  addCorsOptions(singleItem);
  }
}
