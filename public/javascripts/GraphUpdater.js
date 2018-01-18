//////////////////////////////////////////
//  Time-based updates

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
Update each group of objects in the D3 force simulation.
 */
function ticked() {
  svg.selectAll("circle")
    .attr("r", nodeRadius)
    .style("fill", function(d) {return color(d.group)})
    .style("stroke", "#424242")
    .style("stroke-width", borderWidth)
    .attr("cx", function (d) { return d.x; })
    .attr("cy", function(d) { return d.y; });
  svg.selectAll("line")
    .style("stroke", "#aaa")
    .style("fill", "#aaa")
    .style("stroke-width", borderWidth)
    .attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });
  svg.selectAll("text")
    .attr("x", function(d) { return d.x; })
    .attr("y", function (d) { return d.y - 1.2*nodeRadius; })
    .style("font-family", "Lato")
    .style("font-size", "12px")
    .style("fill", "#333");
}

/*
Drag methods to adjust the position of the node we are dragging, and also to update the state machine in case any other
controls are activated while we do this.
 */
function dragstarted(d) {
  setState(STATE.DRAGNODE);
  if (!d3.event.active) simulation.alphaTarget(0.3).restart()
  d.fx = d.x;
  d.fy = d.y;
}
function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}
function dragended(d) {
  setState(STATE.HOVERNODE);
  d.fx = null;
  d.fy = null;
  if (!d3.event.active) simulation.alphaTarget(0);
}

//////////////////////////////////////////
//  State based updates

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

TODO: Fix this for fucking links, we enter HOVERLINK but never return from it ugh
 */
function nodeMouseOut(){
    if(bOverrideMouseOver()) {
        return;
    }
    setState(STATE.HOVEREMPTY);
    setSelection({}, TYPE.EMPTY);
}

//////////////////////////////////////////
//  Miscellaneous updates

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