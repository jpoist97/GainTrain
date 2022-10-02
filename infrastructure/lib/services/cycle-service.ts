import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from 'path'
import { Construct } from 'constructs';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { addCorsOptions } from '../utils/cors-utils';

export class CycleDataServiceStack extends Construct {
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

    const createCycleLambda = new NodejsFunction(this, 'createCycleLambda', {
      entry: join(__dirname, '..', '..', 'resources', 'cycle', 'create-cycle.js'),
      functionName: 'createCycleLambda',
      ...nodeJsFunctionProps,
    });
    const ListCyclesLambda = new NodejsFunction(this, 'ListCyclesLambda', {
      entry: join(__dirname, '..', '..', 'resources', 'cycle', 'list-cycles.js'),
      functionName: 'ListCyclesLambda',
      ...nodeJsFunctionProps,
    });
    const getCycleLambda = new NodejsFunction(this, 'getCycleLambda', {
      entry: join(__dirname, '..', '..', 'resources', 'cycle', 'get-cycle.js'),
      functionName: 'getCycleLambda',
      ...nodeJsFunctionProps,
    });


    workoutDataTable.grantReadWriteData(createCycleLambda);
    workoutDataTable.grantReadWriteData(ListCyclesLambda);
    workoutDataTable.grantReadWriteData(getCycleLambda);


    const createCycleIntegration = new LambdaIntegration(createCycleLambda);
    const ListCyclesIntegration = new LambdaIntegration(ListCyclesLambda);
    const getCycleIntegration = new LambdaIntegration(getCycleLambda);


    const cycles = api.root.addResource('cycles');
    cycles.addMethod('POST', createCycleIntegration);
    cycles.addMethod('GET', ListCyclesIntegration);
    addCorsOptions(cycles);

    const singleCycle = cycles.addResource('{cycleId}');
    singleCycle.addMethod('GET', getCycleIntegration);
    addCorsOptions(singleCycle)
  }
}
