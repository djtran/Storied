
//////////////////////////////////////////
//  Graph Data CRUD

/*
Create a new node at a given (X,Y) coordinate
 */
function addNode(position) {
  var uuid = uuidv4();
  var nodeToAdd = {
    id: uuid,
    name: "Node " + uuid,
    group: Math.floor(Math.random()*100)%5,
    x: position.pageX,
    y: position.pageY
  };
  data.nodes.push(nodeToAdd);
  update();
}

/*
Create a link between two nodes and add it to the graph
 */
function addLink(fromNode, toNode) {
  var linkToAdd = {
    source: fromNode.id,
    target: toNode.id,
    value: 1
  };
  data.links.push(linkToAdd);
  update();
}


//////////////////////////////////////////
//  Direct User Controls.


/*
Enable controls based on our state machine.

TODO: Create a file for event handling in regards to controls. Refactor the shit out of this too.
We should handle the events ourselves, at least w/ mousedown/up. The generalizations in jquery will hold us back.
 */
function setControls() {
  $("svg").on("click", function(event) {
    switch(state) {
      case STATE.IDLE:
        setState(STATE.HOVEREMPTY);
        setSelection({}, TYPE.EMPTY);
        break;
      case STATE.HOVEREMPTY:
        addNode(event);
        break;
      case STATE.HOVERNODE:
        // TODO: Select method
        alert('Selecting Node!' + JSON.stringify(selection));
        break;
      case STATE.CONTEXTMENU:
        // TODO: Select option or click out of context menu.
        break;
      default:
        logDebug("No click handler for " +  state.value);
        return;
    }
  });

  $("svg").on("contextmenu", function(event) {
    //Disable that default context menu shit
    event.preventDefault();
    switch (state) {
      case STATE.HOVEREMPTY:
        // TODO: Context Menu?
        break;
      case STATE.HOVERNODE:
        if(getSpecialState() != STATE.LINKSTART) {
          setSpecialState(STATE.LINKSTART);
          setSpecialSelection(getSelection().object, getSelection().type);
          changeBGColor("#acc6d3");
        } else {
          addLink(getSpecialSelection().object, getSelection().object);
          resetSpecialState();
          clearSpecialSelection();
          changeBGColor("#d3d3d3");
        }
        break;
      default:
        logDebug("No right mouse down handler for " + state.value);
        return;
    }
  });
}

//Debug function I just need some visual feedback on linking ugh
function changeBGColor(hex) {
  $("#graphContainer").css("background-color", hex);
}
