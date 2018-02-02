var Schemas = require('Schemas');
var dynamo_client = DynamoClient.prototype;

function DynamoClient (doc_client) {
  this.client = doc_client;
}

//TODO: PUT/CREATE
//TODO: GET/READ
//TODO: UPDATE (normal, atomic, and conditional)
//TODO: DELETE

module.exports = dynamo_client;