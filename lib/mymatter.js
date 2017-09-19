var MyBodies = {};

var Common = Matter.Common;
var Body = Matter.Body;
var Vertices = Matter.Vertices;
var decomp = (typeof window !== "undefined" ? window['decomp'] : typeof global !== "undefined" ? global['decomp'] : null);
var Composite = Matter.Composite;
var World = Matter.World;

(function() {
    MyBodies.fromVertices = function(x, y, vertexSets, options, flagInternal, removeCollinear, minimumArea) {
    console.log(vertexSets);
        options = options || {};
        var bodies = [];
        var size = vertexSets.length;
        if (size <= 1) return bodies;
        var startX, startY, preX, preY;
        for (var i=0; i<vertexSets.length-1; i++) {
            if (i==0) {
                startX = vertexSets[i].x;
                startY = vertexSets[i].y;
            }
            var e = Bodies.edge(vertexSets[i].x, vertexSets[i].y, vertexSets[i+1].x, vertexSets[i+1].y, 2, options);
            Body.setPosition(e, {x: x, y: y});
            bodies.push(e);
            preX = vertexSets[i+1].x, preY = vertexSets[i+1].y;
        }
        var e = Bodies.edge(preX, preY, startX, startY, 2, options);
        Body.setPosition(e, {x: x, y: y});
        bodies.push(e);

        return bodies;
     }
})();
