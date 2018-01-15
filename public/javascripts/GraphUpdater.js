//= GraphManager

/*
Called whenever a change to the graph has been made (New node/link, etc). Updates the groups currently drawn, attaching
any properties or handlers as needed before restarting the simulation with a low alpha to alphaTarget delta. The delta
is a coefficient on forces that changes the way the simulation behaves. The larger the coefficient the more explosive
the force.
 */
function update() {

    //Add Lines
    var updatedLines = svg.selectAll("line")
        .data(data.links);

    updatedLines.enter().append("line")
        .attr("class", "links")
        .on("mouseover", function(link) {linkMouseOver(link);})
        .on("mouseout", function(link) {
            // TODO: There are issues with not triggering if not wrapped in function(link) {}
            // console.log("LINK MOUSE OUT");
            nodeMouseOut()
        });

    //Add Nodes. (After lines to draw over them)
    var updatedNodes = svg.selectAll("circle")
        .data(data.nodes);

    updatedNodes.enter().append("circle")
        .attr("class", "nodes")
        .attr("r", nodeRadius)
        .on("mouseover", function(node) {nodeMouseOver(node);})
        .on("mouseout", nodeMouseOut)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));


    //Add Labels
    var updatedLabels = svg.selectAll("text")
        .data(data.nodes);

    updatedLabels.enter().append("text")
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .text(function(d) { return d.name; });

    updatedNodes.exit().remove();
    updatedLines.exit().remove();
    updatedLabels.exit().remove();

    //update simulation nodes, links, and alpha
    simulation
        .nodes(data.nodes)
        .on("tick", ticked);
    simulation.force("link")
        .links(data.links);

    updateObjectZoom();
    //alpha starts at .05 cause I don't want shit flying everywhere
    simulation.alpha(.05).alphaTarget(0).restart();
}

/*
When hovering over a node, change state. This way we can specify different control behaviors, such as click to select
versus click to create.
 */
function nodeMouseOver(n){
    if (bOverrideMouseOver()) {
        return;
    }
    setState(STATE.HOVERNODE);
    setSelection(n, TYPE.NODE);
}

function linkMouseOver(l){
    if (bOverrideMouseOver()) {
        return;
    }
    setState(STATE.HOVERLINK);
    setSelection(l, TYPE.LINK);
}

function bOverrideMouseOver() {
    //Special cases, we should override the hover action if:
    //1. A dragged node is trying to keep up with the cursor
    //2. Idle. Click to resume tracking.
    var cases = [STATE.DRAGNODE, STATE.IDLE];
    var curState = getState();
    for (var i = 0; i < cases.length; i++) {
        if (curState == cases[i]) {
            return true;
        }
    }
    return false;
}

/*
When the cursor leaves the node, it should be hovering over empty space or a link. Due to the charge force between
nodes, there should never be any overlapping nodes so this should be a safe operation.

TODO: Fix this for fucking links, we enter HOVERLINK but never return ugh
 */
function nodeMouseOut(){
    if(bOverrideMouseOver()) {
        return;
    }
    setState(STATE.HOVEREMPTY);
    setSelection({}, TYPE.EMPTY);
}

/*
Zoom functions
 */
function zoom_actions(){
    zoomTransform = d3.event.transform;
    svg.selectAll("line").attr("transform", zoomTransform);
    svg.selectAll("circle").attr("transform", zoomTransform);
    svg.selectAll("text").attr("transform", zoomTransform);
}

function updateObjectZoom(){
    if(zoomTransform != null) {
        svg.selectAll("line").attr("transform", zoomTransform);
        svg.selectAll("circle").attr("transform", zoomTransform);
        svg.selectAll("text").attr("transform", zoomTransform);
    }
}