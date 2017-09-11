var MyBodies = {};

var Common = Matter.Common;
var Body = Matter.Body;
var Vertices = Matter.Vertices;

(function() {
    MyBodies.edge = function(x, y, vertex, options) {
        console.log("MyBodies.edge()");
        var width = 0.1;
        var height = 40;
        var rectangle = { 
            label: 'Rectangle Body',
            position: { x: x, y: y },
            vertices: Vertices.fromPath('L 0 0 L ' + width + ' 0 L ' + width + ' ' + height + ' L 0 ' + height)
        };

        return Body.create(Common.extend({}, rectangle, options));
    }
})();
