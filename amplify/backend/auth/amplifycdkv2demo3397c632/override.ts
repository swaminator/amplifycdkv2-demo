import { AmplifyAuthCognitoStackTemplate } from '@aws-amplify/cli-extensibility-helper';

export function override(resources: AmplifyAuthCognitoStackTemplate) {
    resources.userPool.policies = { // Set the user pool policies
        passwordPolicy: {
          ...resources.userPool.policies["passwordPolicy"], // Carry over existing settings
          temporaryPasswordValidityDays: 3 // Add new setting not provided Amplify's default
        }
      }
    
}
