import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from 'path'
import { Construct } from 'constructs';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { addCorsOptions } from '../utils/cors-utils';

export class ExerciseDataServiceStack extends Construct {
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

    const createExerciseLambda = new NodejsFunction(this, 'createExerciseLambda', {
      entry: join(__dirname, '..', '..', 'resources', 'exercise', 'create-exercise.js'),
      functionName: 'createExerciseLambda',
      ...nodeJsFunctionProps,
    });
    const listExercisesLambda = new NodejsFunction(this, 'listExercisesLambda', {
      entry: join(__dirname, '..', '..', 'resources', 'exercise', 'list-exercises.js'),
      functionName: 'listExercisesLambda',
      ...nodeJsFunctionProps,
    });


    workoutDataTable.grantReadWriteData(createExerciseLambda);
    workoutDataTable.grantReadWriteData(listExercisesLambda);


    const createExerciseIntegration = new LambdaIntegration(createExerciseLambda);
    const listExercisesIntegration = new LambdaIntegration(listExercisesLambda);


    const exercises = api.root.addResource('exercises');
    exercises.addMethod('GET', listExercisesIntegration);
    exercises.addMethod('POST', createExerciseIntegration);
    addCorsOptions(exercises);
  }
}
