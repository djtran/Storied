//////////////////////////////////////////
//  API shorthander that will be present throughout the webapp
/*
Factory method for creating ApiCall objects. Each ApiCall object will be self contained, and can be checked later for completion.

 */
function createApiCall() {
  return {
    httpRequest: null,
    doRequest: function (httpEnum, path, body, devo) {
      this.httpRequest = new XMLHttpRequest();

      if (!this.httpRequest) {
        alert("Cannot create XMLHTTP instance");
        return false;
      }
      var dest = (debug) ? ENDPOINT.devo : ENDPOINT.prod;
      dest += path;

      // TODO: Figure out a strategy for development testing.
      // Continuously hitting up the endpoint (depending on quantity of calls) could cost us money?
      this.httpRequest.onreadystatechange = (devo) ? this.stateChange() : this.stateChange;
      this.httpRequest.open(httpEnum, dest, true); //Always execute asynchronously
      this.httpRequest.send();
    },
    stateChange: function () {
      var state = this.httpRequest.readyState;
      console.log(state);
      switch(state){
        case XMLHttpRequest.OPENED:
          break;
        case XMLHttpRequest.HEADERS_RECEIVED:
          break;
        case XMLHttpRequest.LOADING:
          break;
        case XMLHttpRequest.DONE:
          if (state.status === 200) {
            console.log(state.responseText);
          } else {
            alert("There was a problem with the request. " + state.status);
          }
          break;
        default:
          console.log("Something went wrong with your request. " + state.toString() + "\n" + state.status);
          break;
      }
    },
    getResponse: function() {
      if (this.httpRequest === null) {
        return API_REQUEST.NONE_MADE;
      } else if (this.httpRequest.readyState === XMLHttpRequest.DONE) {
        return this.httpRequest.responseText;
      } else {
        return API_REQUEST.NOT_DONE;
      }
    }
  }
}