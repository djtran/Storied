var DynamoClient = require('DynamoClient');
var Schemas = require('Schemas');

/**
 * Initialize and return a new DynamoClient.
 */
create = function(aws_sdk) {
  var dynamo = new aws_sdk.DynamoDB();
  dynamo.listTables(function(err, data) {
    if (err) console.log(err, err.stack);
    else {
      // Initialize DB if needed.
      var tables = data.TableNames;
      if (!tables.includes(Schemas.Users.TableName)) dynamo.createTable(Schemas.Users);
      if (!tables.includes(Schemas.Graphs.TableName)) dynamo.createTable(Schemas.Graphs);
      if (!tables.includes(Schemas.Nodes.TableName)) dynamo.createTable(Schemas.Nodes);
      if (!tables.includes(Schemas.Assets.TableName)) dynamo.createTable(Schemas.Assets);

      return new DynamoClient(dynamo.DocumentClient());
    }
  })
};

exports.create = create;