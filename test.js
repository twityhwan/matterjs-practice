var Engine, Render, Runner, Svg, Bodies, World, Common, world;
var SVG_PATH="./svg/"

function init() {
    Engine = Matter.Engine;
    Render = Matter.Render;
    Runner = Matter.Runner;
    Svg = Matter.Svg;
    Bodies = Matter.Bodies;
    World = Matter.World;
    Common = Matter.Common;


    var engine = Engine.create();
    world = engine.world;

    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 600,
            showVelocity: true
        }
    });

    Render.run(render);

    var runner = Runner.create();
    Runner.run(runner, engine);

    addSVG();
    World.add(world, [
            Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
            Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
            Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
            Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
        ]);


    return render.canvas;
}

function addSVG() {
    $.get(SVG_PATH + 'svg.svg').done(function(data) {
        var vertexSets = [],
            color = Common.choose(['#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58']);


        $(data).find('path').each(function(i, path) {
            vertexSets.push(Svg.pathToVertices(path, 30));
        });

        World.add(world, Bodies.fromVertices(400, 80, vertexSets, {
            render: {
                fillStyle: color,
                strokeStyle: color,
                lineWidth: 1
            }
        }, true));
    });
}

window.onload = function () {
    document.body.appendChild(init());
}
