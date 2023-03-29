const { Stack, RemovalPolicy } = require('aws-cdk-lib')
const { Bucket } = require('aws-cdk-lib/aws-s3');
const { BucketDeployment, Source } = require('aws-cdk-lib/aws-s3-deployment');

class CdkStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const websiteBucket = new Bucket(this, 'website', {
    versioned: false,
    removalPolicy: RemovalPolicy.DESTROY,
    autoDeleteObjects: true
    });

    new BucketDeployment(this, 'deployment', {
      destinationBucket: websiteBucket,
      sources: [Source.asset('./build')],
      retainOnDelete: false
    });
  }
}

module.exports = { CdkStack }
