import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from 'path'
import { Construct } from 'constructs';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { addCorsOptions } from '../utils/cors-utils';

export class WorkoutLogDataServiceStack extends Construct {
  constructor(scope: Construct, id: string, logDataTable: Table, api: RestApi) {
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

    const logWorkoutLambda = new NodejsFunction(this, 'logWorkoutLambda', {
      entry: join(__dirname, '..', '..', 'resources', 'workout-log', 'log-workout.js'),
      functionName: 'logWorkoutLambda',
      ...nodeJsFunctionProps,
    });
    const storeInitialLogLambda = new NodejsFunction(this, 'storeInitialLogLambda', {
      entry: join(__dirname, '..', '..', 'resources', 'workout-log', 'store-initial-log.js'),
      functionName: 'storeInitialLogLambda',
      ...nodeJsFunctionProps,
    });
    const queryWorkoutLogsLambda = new NodejsFunction(this, 'queryWorkoutLogsLambda', {
      entry: join(__dirname, '..', '..', 'resources', 'workout-log', 'query-workout-logs.js'),
      functionName: 'queryWorkoutLogsLambda',
      ...nodeJsFunctionProps,
    });


    logDataTable.grantReadWriteData(logWorkoutLambda);
    logDataTable.grantReadWriteData(storeInitialLogLambda);
    logDataTable.grantReadWriteData(queryWorkoutLogsLambda);


    const logWorkoutIntegration = new LambdaIntegration(logWorkoutLambda);
    const storeInitialLogIntegration = new LambdaIntegration(storeInitialLogLambda);
    const queryWorkoutLogsIntegration = new LambdaIntegration(queryWorkoutLogsLambda);


    const workoutLogs = api.root.addResource('workoutLogs');
    workoutLogs.addMethod('POST', logWorkoutIntegration);
    workoutLogs.addMethod('GET', queryWorkoutLogsIntegration);

    addCorsOptions(workoutLogs);

    const initial = workoutLogs.addResource('initial');
    initial.addMethod('POST', storeInitialLogIntegration);
    addCorsOptions(initial);
  }
}
