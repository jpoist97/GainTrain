import { IResource, LambdaIntegration, MockIntegration, PassthroughBehavior, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { App, Stack, RemovalPolicy } from 'aws-cdk-lib';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from 'path'
import { Construct } from 'constructs';
import { Table } from 'aws-cdk-lib/aws-dynamodb';

export class WorkoutDataServiceStack extends Construct {
  constructor(scope: Construct, id: string, workoutDataTable: Table) {
    super(scope, id);

    const nodeJsFunctionProps: NodejsFunctionProps = {
      bundling: {
        externalModules: [
          'aws-sdk', // Use the 'aws-sdk' available in the Lambda runtime
        ],
      },
      depsLockFilePath: join(__dirname, '..', '..', 'resources', 'package-lock.json'),
      environment: {
        TABLE_NAME: workoutDataTable.tableName,
      },
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
    const createOneLambda = new NodejsFunction(this, 'createWorkoutFunction', {
      entry: join(__dirname, '..', '..', 'resources', 'workout', 'create-workout.js'),
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
   //  dynamoTable.grantReadWriteData(getOneLambda);
    workoutDataTable.grantReadWriteData(createOneLambda);
   //  dynamoTable.grantReadWriteData(updateOneLambda);
   //  dynamoTable.grantReadWriteData(deleteOneLambda);

    // Integrate the Lambda functions with the API Gateway resource
   //  const getAllIntegration = new LambdaIntegration(getAllLambda);
    const createOneIntegration = new LambdaIntegration(createOneLambda);
   //  const getOneIntegration = new LambdaIntegration(getOneLambda);
   //  const updateOneIntegration = new LambdaIntegration(updateOneLambda);
   //  const deleteOneIntegration = new LambdaIntegration(deleteOneLambda);


    // Create an API Gateway resource for each of the CRUD operations
    const api = new RestApi(this, 'workoutApi', {
      restApiName: 'Workout Service'
    });

    const items = api.root.addResource('workout');
   //  items.addMethod('GET', getAllIntegration);
    items.addMethod('POST', createOneIntegration);
    addCorsOptions(items);

   //  const singleItem = items.addResource('{id}');
   //  singleItem.addMethod('GET', getOneIntegration);
   //  singleItem.addMethod('PATCH', updateOneIntegration);
   //  singleItem.addMethod('DELETE', deleteOneIntegration);
   //  addCorsOptions(singleItem);
  }
}

export function addCorsOptions(apiResource: IResource) {
  apiResource.addMethod('OPTIONS', new MockIntegration({
    integrationResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
        'method.response.header.Access-Control-Allow-Origin': "'*'",
        'method.response.header.Access-Control-Allow-Credentials': "'false'",
        'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,GET,PUT,POST,DELETE'",
      },
    }],
    passthroughBehavior: PassthroughBehavior.NEVER,
    requestTemplates: {
      "application/json": "{\"statusCode\": 200}"
    },
  }), {
    methodResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers': true,
        'method.response.header.Access-Control-Allow-Methods': true,
        'method.response.header.Access-Control-Allow-Credentials': true,
        'method.response.header.Access-Control-Allow-Origin': true,
      },
    }]
  })
}
