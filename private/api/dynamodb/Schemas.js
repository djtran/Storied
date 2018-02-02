
const Users = {
  TableName : "Users",
  KeySchema: [
    {AttributeName: "id", KeyType: "HASH"}
  ],
  AttributeDefinitions: [
    {AttributeName: "id", AttributeType: "S"},
    {AttributeName: "email", AttributeType: "S"},
    {AttributeName: "username", AttributeType: "S"},
    {AttributeName: "password", AttributeType: "S"},
    {AttributeName: "adventures", AttributeType: "S"} //Array of ids
  ]
};

const Graphs = {
  TableName: "Graphs",
  KeySchema: [
    {AttributeName: "id", KeyType: "HASH"}
  ],
  AttributeDefinitions: [
    {AttributeName: "id", AttributeType: "S"},
    {AttributeName: "nodes", AttributeType: "S"},       //Array of {id:, title:, tags:}
    {AttributeName: "deep_nodes", AttributeType: "S"},  //Array of ids
    {AttributeName: "links", AttributeType: "S"}        //Array of {from: id, to: id}
  ]
};

const Nodes = {
  TableName: "Nodes",
  KeySchema: [
    {AttributeName: "id", KeyType: "HASH"}
  ],
  AttributeDefinitions: [
    {AttributeName: "id", AttributeType: "S"},
    {AttributeName: "title", AttributeType: "S"},
    {AttributeName: "description", AttributeType: "S"},
    {AttributeName: "tags", AttributeType: "S"},
    {AttributeName: "gallery", AttributeType: "S"},     //Array of image URIs. Client will be responsible for retrieval.
    {AttributeName: "assets", AttributeType: "S"},  //Array of ids
    {AttributeName: "environment", AttributeType: "S"}
  ]
};

const Assets = {
  TableName: "Assets",
  KeySchema: [
    {AttributeName: "id", KeyType: "HASH"},
    {AttributeName: "type", KeyType: "RANGE"}
  ],
  AttributeDefinitions: [
    {AttributeName: "id", AttributeType: "S"},
    {AttributeName: "title", AttributeType: "S"},
    {AttributeName: "description", AttributeType: "S"},
    {AttributeName: "tags", AttributeType: "S"},
    {AttributeName: "gallery", AttributeType: "S"},     //Array of image URIs. Client will be responsible for retrieval.
    {AttributeName: "type", AttributeType: "S"}         //User defined string such as "Character". Client will sort node assets into sections
  ]
};

exports.Users = Users;
exports.Graphs = Graphs;
exports.Nodes = Nodes;
exports.Assets= Assets;