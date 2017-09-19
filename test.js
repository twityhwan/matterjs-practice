var Engine, Render, Runner, Svg, Bodies, World, Common, world, Composites;
var MouseConstraint, Mouse;
var SVG_PATH="./svg/"

function init() {
    Engine = Matter.Engine;
    Render = Matter.Render;
    Runner = Matter.Runner;
    Svg = Matter.Svg;
    Bodies = Matter.Bodies;
    World = Matter.World;
    Common = Matter.Common;
    Composites = Matter.Composites;
    MouseConstraint = Matter.MouseConstraint;
    Mouse = Matter.Mouse;


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
    addParticles();
    World.add(world, [
            Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
            Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
            Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
            Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
        ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    World.add(world, [
            Bodies.edge(100, 100, 200, 200, 2),
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

        var e = MyBodies.fromVertices(100, 100, vertexSets[0], {
            render: {
                fillStyle: color,
                strokeStyle: color,
            },
            isStatic: true
        }, true);
        World.add(world, e);

        World.add(world, Bodies.fromVertices(400, 200, vertexSets[0], {
            render: {
                fillStyle: color,
                strokeStyle: color,
                lineWidth: 1
            },
            isStatic: true
        }, true));
    });
}

function addParticles() {
    // add bodies
    var stack = Composites.stack(20, 20, 20, 5, 0, 0, function(x, y) {
        return Bodies.circle(x, y, Common.random(10, 20), { friction: 0.00001, restitution: 0.5, density: 0.001 });
    });

    World.add(world, stack);

    /*
    // fit the render viewport to the scene
    Render.lookAt(render, Composite.allBodies(world));

    // wrapping using matter-wrap plugin
    for (var i = 0; i < stack.bodies.length; i += 1) {
        stack.bodies[i].plugin.wrap = {
            min: { x: render.bounds.min.x, y: render.bounds.min.y },
            max: { x: render.bounds.max.x, y: render.bounds.max.y }
        };
    }
    */
}

window.onload = function () {
    document.body.appendChild(init());
}
