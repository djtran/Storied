var AWS = require('aws-sdk');
var DynamoClientFactory = require('dynamodb/DynamoClientFactory');

AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000'
});

var mux = RequestMultiplexer.prototype;

function RequestMultiplexer() {
  this.client = DynamoClientFactory.create(AWS);
}

mux.handle = function(request) {
  return "haHAA";
};

module.exports = new RequestMultiplexer();