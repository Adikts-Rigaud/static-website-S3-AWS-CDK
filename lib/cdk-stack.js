const { Stack, RemovalPolicy } = require('aws-cdk-lib')
const { Bucket } = require('aws-cdk-lib/aws-s3');

class CdkStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const websiteBucket = new Bucket(this, 'website', {
    versioned: false,
    removalPolicy: RemovalPolicy.DESTROY,
    autoDeleteObjects: true
    });
  }
}

module.exports = { CdkStack }
