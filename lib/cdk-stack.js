const { Stack, RemovalPolicy, CfnOutput } = require('aws-cdk-lib')
const { Bucket, BucketAccessControl } = require('aws-cdk-lib/aws-s3');
const { BucketDeployment, Source } = require('aws-cdk-lib/aws-s3-deployment');
const { Distribution, OriginAccessIdentity } = require('aws-cdk-lib/aws-cloudfront');
const { S3Origin } = require('aws-cdk-lib/aws-cloudfront-origins');

class CdkStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const websiteBucket = new Bucket(this, 'website', {
      versioned: false,
      accessControl: BucketAccessControl.PRIVATE,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    });

    new BucketDeployment(this, 'deployment', {
      destinationBucket: websiteBucket,
      sources: [Source.asset('./build')],
      retainOnDelete: false
    });

    const originAccessIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity');
    websiteBucket.grantRead(originAccessIdentity);

    const websiteDistribution = new Distribution(this, 'Distribution', {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: new S3Origin(websiteBucket, { originAccessIdentity })
      }
    });

    new CfnOutput(this, 'bucketName', {
      value: websiteBucket.bucketName,
      description: 'The name of the s3 bucket',
      exportName: 'websiteBucketName',
    });

    new CfnOutput(this, 'websiteDomainName', {
      value: websiteDistribution.domainName,
      description: 'The website domain name',
      exportName: 'domainName',
    });    
  }
}

module.exports = { CdkStack }
