import * as cdk from '@aws-cdk/core';
import * as AmplifyHelpers from '@aws-amplify/cli-extensibility-helper';
import * as sns from '@aws-cdk/aws-sns';
import * as subs from '@aws-cdk/aws-sns-subscriptions';

export class cdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps, amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps) {
    super(scope, id, props);
    /* Do not remove - Amplify CLI automatically injects the current deployment environment in this input parameter */
    new cdk.CfnParameter(this, 'env', {
      type: 'String',
      description: 'Current Amplify CLI env name',
    });
    
    // Create the SNS topic 
    const topic = new sns.Topic(this, 'sns-topic', {
      // Reference the Amplify env to ensure multi-env workflow function correctly
      topicName: `sns-topic-${AmplifyHelpers.getProjectInfo().projectName}-${cdk.Fn.ref('env')}`
    });

    // Add an email subscription
    topic.addSubscription(new subs.EmailSubscription("nikhil.86@gmail.com"));
  }
}
