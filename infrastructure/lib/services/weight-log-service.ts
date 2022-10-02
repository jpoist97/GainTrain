import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from 'path'
import { Construct } from 'constructs';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { addCorsOptions } from '../utils/cors-utils';

export class WeightLogDataServiceStack extends Construct {
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

    const logWeightLambda = new NodejsFunction(this, 'logWeightLambda', {
      entry: join(__dirname, '..', '..', 'resources', 'weight-log', 'log-weight.js'),
      functionName: 'logWeightLambda',
      ...nodeJsFunctionProps,
    });
    const queryWeightLogsLambda = new NodejsFunction(this, 'queryWeightLogsLambda', {
      entry: join(__dirname, '..', '..', 'resources', 'weight-log', 'query-weight-logs.js'),
      functionName: 'queryWeightLogsLambda',
      ...nodeJsFunctionProps,
    });


    logDataTable.grantReadWriteData(logWeightLambda);
    logDataTable.grantReadWriteData(queryWeightLogsLambda);


    const logWeightIntegration = new LambdaIntegration(logWeightLambda);
    const queryWeightLogsIntegration = new LambdaIntegration(queryWeightLogsLambda);


    const weightLogs = api.root.addResource('weightLogs');
    weightLogs.addMethod('POST', logWeightIntegration);
    weightLogs.addMethod('GET', queryWeightLogsIntegration);

    addCorsOptions(weightLogs);
  }
}
