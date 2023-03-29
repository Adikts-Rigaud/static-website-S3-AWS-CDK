const { Stack, RemovalPolicy, CfnOutput } = require('aws-cdk-lib')
const { Bucket } = require('aws-cdk-lib/aws-s3');
const { BucketDeployment, Source } = require('aws-cdk-lib/aws-s3-deployment');

class CdkStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const websiteBucket = new Bucket(this, 'website', {
      versioned: false,
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    });

    new BucketDeployment(this, 'deployment', {
      destinationBucket: websiteBucket,
      sources: [Source.asset('./build')],
      retainOnDelete: false
    });

    new CfnOutput(this, 'bucketName', {
      value: websiteBucket.bucketName,
      description: 'The name of the s3 bucket',
      exportName: 'websiteBucketName',
    });

    new CfnOutput(this, 'bucketWebsiteUrl', {
      value: websiteBucket.bucketWebsiteUrl,
      description: 'The name of the s3 bucket',
      exportName: 'websiteBucketWebsiteUrl',
    });    
  }
}

module.exports = { CdkStack }
