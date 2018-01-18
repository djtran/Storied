/*
For enums, I would want the value to be an object instead of an enum. Comparisons would be at the very least slightly
more robust - I wouldn't have any possibility of matching positively against a normal int or string value.
 */
enumValue = function(arg) {
    this.key = 'VALUE_' + arg;
    this.value = arg;
};

/*
For graph generation, there is a need to maintain some sort of state to differentiate between what event to call. In the
simplest example, a click is different when clicking on empty space (generating a node) versus clicking on a node itself
(selecting a node).
 */
const STATE = {
    IDLE : new enumValue('IDLE'),
    HOVEREMPTY : new enumValue('HOVEREMPTY'),
    HOVERNODE : new enumValue('HOVERNODE'),
    HOVERLINK : new enumValue('HOVERLINK'),
    DRAGNODE : new enumValue('DRAGNODE'),
    LINKSTART : new enumValue('LINKSTART'),
    CONTEXTMENU : new enumValue('CONTEXTMENU')
};

const TYPE = {
    EMPTY : new enumValue('EMPTY'),
    NODE : new enumValue('NODE'),
    LINK : new enumValue('LINK')
};

const HTTP = {
  GET : "GET",
  POST : "POST",
  PUT : "PUT",
  DELETE : "DELETE"
};

const API_REQUEST = {
  NONE_MADE: "ERR_NO_REQUEST_MADE",
  NOT_DONE: "ERR_REQUEST_NOT_DONE"
};

const ENDPOINT = {
  devo: "localhost:3000/api",
  prod: ""
};
