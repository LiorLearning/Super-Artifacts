
import * as Matter from "matter-js";
import { useGameState } from "./state-utils";
import { getSoundManager } from './sounds';
import { useEffect, useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";

interface GameProps {
  sendAdminMessage: (role: string, content: string) => void;
}

interface Vector {
  x: number;
  y: number;
}


export default function Game({ sendAdminMessage }: GameProps) {
  const { gameStateRef, setGameStateRef } = useGameState();

  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const worldRef = useRef<Matter.World | null>(null);
  const containerRef = useRef<Matter.Composite | null>(null);
  const leftPlatformRef = useRef<Matter.Body | null>(null);
  const rightPlatformRef = useRef<Matter.Body | null>(null);
  const rightContainerRef = useRef<Matter.Composite | null>(null);
  const finalContainerRef = useRef<Matter.Composite | null>(null);
  const [slings, setSlings] = useState(true);
  const [finalAnswer, setFinalAnswer] = useState<number>(0);

  const COLLISION_CATEGORIES = {
    BALL: 0x0001,
    CONTAINER_VISUAL: 0x0002,
    CONTAINER_COLLISION: 0x0004,
    FINAL_CONTAINER: 0x0008
  };

  const createBallContainer = (x: number, y: number, width: number) => {
    const height = 60;
    const wallThickness = 2;

    const composite = Matter.Composite.create();

    // Bottom
    const base = Matter.Bodies.rectangle(x, y, width, wallThickness, {
      isStatic: true,
      render: {
        fillStyle: "#666",
        strokeStyle: "transparent",
      },
    });

    // Left wall
    const leftWall = Matter.Bodies.rectangle(x - width / 2 + wallThickness / 2, y - height / 2, wallThickness, height, {
      isStatic: true,
      render: {
        fillStyle: "#666",
        strokeStyle: "transparent",
      },
    });

    // Right wall
    const rightWall = Matter.Bodies.rectangle(x + width / 2 - wallThickness / 2, y - height / 2, wallThickness, height, {
      isStatic: true,
      render: {
        fillStyle: "#666",
        strokeStyle: "transparent",
      },
    });

    Matter.Composite.add(composite, [base, leftWall, rightWall]);
    return composite;
  };

  const createBall = (x: number, y: number, color: string, isStatic: boolean = false) => {
    return Matter.Bodies.circle(x, y, 12, {
      isStatic,
      restitution: 0.1,
      render: {
        fillStyle: color,
        strokeStyle: "black",
        lineWidth: 1
      },
    });
  };

  function createVisualString(bodyA: Matter.Body, pointB: Matter.Vector) {
    return Matter.Constraint.create({
      bodyA,
      pointB,
      // no length here, so the distance is free to change
      stiffness: 0,
      damping: 0,
      render: {
        visible: true,
        strokeStyle: "#000",
        lineWidth: 2,
      },
    });
  }

  const createPlatform = (x: number, y: number, width: number) => {
    return Matter.Bodies.rectangle(x, y, width, 4, {
      isStatic: true,
      render: {
        fillStyle: "#666",
        strokeStyle: "transparent",
      },
    });
  };

    const createContainer = () => {
    const containerWidth = 40;
    const containerHeight = 240;
    const containerPosition = { x: 390, y: 340 };
    const visualWidth = containerWidth + 10;

    const containerComposite = Matter.Composite.create();

    const parts = [
      Matter.Bodies.rectangle(containerPosition.x + containerWidth/2, containerPosition.y + containerHeight/2, containerWidth, 2, {
        isStatic: true,
        render: { visible: false },
        collisionFilter: { category: 0x0004 }
      }),
      Matter.Bodies.rectangle(containerPosition.x, containerPosition.y, 2, containerHeight, {
        isStatic: true,
        render: { visible: false },
        collisionFilter: { category: 0x0004 }
      }),
      Matter.Bodies.rectangle(containerPosition.x + containerWidth, containerPosition.y, 2, containerHeight, {
        isStatic: true,
        render: { visible: false },
        collisionFilter: { category: 0x0004 }
      }),
    ];

    const getColorForIndex = (index: number) => {
      const score = gameStateRef.current.containerScore;
      const isActive = index >= 10 - score;
      return isActive ? "#BA69EF" : "#fff";
    };

    const visualParts = Array.from({length: 10}, (_, i) => {
      const y = containerPosition.y + containerHeight/2 - (i + 0.5) * (containerHeight/10);
      const segment = Matter.Bodies.rectangle(containerPosition.x + containerWidth/2, y, visualWidth, containerHeight/10, {
        isStatic: true,
        isSensor: true,
        render: { 
          fillStyle: getColorForIndex(i),
          strokeStyle: "#000",
          lineWidth: 2
        },
        collisionFilter: { category: 0x0002 },
        label: `container_segment_${i}`
      });

      const circleRadius = 5;
      const circle = Matter.Bodies.circle(containerPosition.x + containerWidth/2, y, circleRadius, {
        isStatic: true,
        isSensor: true,
        render: {
          fillStyle: "#fff",
          strokeStyle: "#fff",
          lineWidth: 1
        },
        collisionFilter: { category: 0x0002 },
        label: `container_circle_${i}`
      });

      return [segment, circle];
    }).flat();

    Matter.Composite.add(containerComposite, [...parts, ...visualParts]);
    containerRef.current = containerComposite;
    return containerComposite;
  };

  const updateContainerColors = () => {
    if (!containerRef.current) return;
    const bodies = Matter.Composite.allBodies(containerRef.current);
    bodies.forEach(body => {
      if (body.label?.startsWith('container_segment_')) {
        const score = gameStateRef.current.containerScore;
        const index = parseInt(body.label.split('_')[2]);
        const isActive = index < score;
        body.render.fillStyle = isActive ? "#BA69EF" : "#fff";
      }
    });
  };

  const createFinalContainer = () => {
    const containerWidth = 400;  // Wider to fit all balls
    const containerHeight = 100;
    const containerPosition = { x: 550, y: 500 }; // Lower position for balls to drop into

    const containerComposite = Matter.Composite.create();

    // Colors for 3D effect
    const colors = {
      front: "#E8F8FF",    // Light blue for front face
      back: "#E8F8FF",     // Light blue for back face
      left: "#B8E8FF",     // Medium blue for left side
      right: "#AAD3E5",    // Grayish blue for right side
      bottom: "#6FA8C3",   // Darker blue for bottom
    };

    const leftFaceVertices: Vector[][] = [[
      { x: 0, y: 20 },
      { x: 20, y: 0 },
      { x: 20, y: containerHeight },
      { x: 0, y: containerHeight + 20 }
    ]];
  
    const bottomFaceVertices: Vector[][] = [[
      { x: -containerWidth / 2, y: 0 },
      { x: containerWidth / 2, y: 0 },
      { x: containerWidth / 2 - 20, y: 20 },
      { x: -containerWidth / 2 - 20, y: 20 }
    ]];
  
    const rightFaceVertices: Vector[][] = [[
      { x: 0, y: 20 },
      { x: 20, y: 0 },
      { x: 20, y: containerHeight },
      { x: 0, y: containerHeight + 20 }
    ]];

    const visualparts = [
      // Back face
      Matter.Bodies.rectangle(
        containerPosition.x,
        containerPosition.y,
        containerWidth,
        containerHeight,
        {
          isStatic: true,
          isSensor: true,
          render: {
            fillStyle: colors.back,
            strokeStyle: "#000",
            lineWidth: 1
          },
          collisionFilter: { 
            category: 0x0002,
            mask: 0x0000
          }
        }
      ),
      // Left face
      Matter.Bodies.fromVertices(
        containerPosition.x - containerWidth / 2 - 10,
        containerPosition.y + 10,
        leftFaceVertices,
        {
          isStatic: true,
          isSensor: true,
          render: {
            fillStyle: colors.left,
            strokeStyle: "#000",
            lineWidth: 1
          },
          collisionFilter: { 
            category: 0x0002,
            mask: 0x0000
          }
        }
      ),
      // Bottom face
      Matter.Bodies.fromVertices(
        containerPosition.x - 10,
        containerPosition.y + containerHeight / 2 + 10,
        bottomFaceVertices,
        {
          isStatic: true,
          isSensor: true,
          render: {
            fillStyle: colors.bottom,
            strokeStyle: "#000",
            lineWidth: 1
          },
          collisionFilter: { 
            category: 0x0002,
            mask: 0x0000
          }
        }
      ),
       // Right face
       Matter.Bodies.fromVertices(
        containerPosition.x + containerWidth / 2 - 10,
        containerPosition.y + 10,
        rightFaceVertices,
        {
          isStatic: true,
          isSensor: true,
          render: {
            fillStyle: colors.right,
            strokeStyle: "#000",
            lineWidth: 1
          },
          collisionFilter: { 
            category: 0x0002 ,
            mask: 0x0000
          }
        }
      ),
      // Front face (semi-transparent)
      Matter.Bodies.rectangle(
        containerPosition.x - 20,
        containerPosition.y + 20, // Slight offset for 3D effect
        containerWidth,
        containerHeight,
        {
          isStatic: true,
          isSensor: true,
          render: {
            fillStyle: "rgba(232, 248, 255, 0.3)", // Semi-transparent front
            strokeStyle: "#000",
            lineWidth: 1,
          },
          collisionFilter: { 
            category: 0x0008 ,
            mask: 0x0000
          }
        }
      ),
    ];

    const parts = [
      // Left invisible border
      Matter.Bodies.rectangle(containerPosition.x - 10, containerPosition.y + 10, containerWidth, 1, {
        isStatic: true,
        render: { visible: false },
        collisionFilter: { category: 0x0004 }
      }),

      // Right invisible border
      Matter.Bodies.rectangle(containerPosition.x + containerWidth / 2 - 10, containerPosition.y + 10, 1, containerHeight, {
        isStatic: true,
        render: { visible: false },
        collisionFilter: { category: 0x0004 }
      }),

      // Bottom invisible border
      Matter.Bodies.rectangle(containerPosition.x - containerWidth / 2 - 10, containerPosition.y + 10, containerWidth, 1, {
        isStatic: true,
        render: { visible: false },
        collisionFilter: { category: 0x0004 }
      }),
    ]


    Matter.Composite.add(containerComposite, [...parts, ...visualparts]);
    finalContainerRef.current = containerComposite;
    return containerComposite;
  };

  const flipContainerAndPlatform = () => {
    if (!containerRef.current || !worldRef.current || !rightPlatformRef.current || !rightContainerRef.current) return;

    // Hide left platform, container, and scores
    if (worldRef.current) {
      const bodies = Matter.Composite.allBodies(worldRef.current);
      bodies.forEach(body => {
        if (body.position.x < 400) {
          Matter.Composite.remove(worldRef.current!, body);
        }
      });
    }

    // Create and add final container
    const finalContainer = createFinalContainer();
    Matter.Composite.add(worldRef.current, finalContainer);

    // Don't set showEmptyButton
    setGameStateRef(prevState => ({
      ...prevState,
      showAdditionStep: true
    }));

    // 
     // Center container pivot
     const containerPivot = { x: 400, y: 300 };
     // Right side pivot (between platform and container)
     const rightPivot = { x: 660, y: 180 }; // Middle point between platform and container
 
     const targetAngle = 4 * Math.PI / 5;
     const flip_steps = 60;
     const containerAngleStep = targetAngle / flip_steps;
     const rightAngleStep = -targetAngle / flip_steps; // Opposite direction
     let flip_currentStep = 0;
 
     const animate = () => {
       if (flip_currentStep >= flip_steps) {
         getSoundManager().play('complete');
         return;
       }
 
       // Rotate center container
       const containerBodies = Matter.Composite.allBodies(containerRef.current!);
       containerBodies.forEach(body => {
         const dx = body.position.x - containerPivot.x;
         const dy = body.position.y - containerPivot.y;
         
         const cos = Math.cos(containerAngleStep);
         const sin = Math.sin(containerAngleStep);
         
         const newX = containerPivot.x + (dx * cos - dy * sin);
         const newY = containerPivot.y + (dx * sin + dy * cos);
         
         Matter.Body.setPosition(body, { x: newX, y: newY });
         Matter.Body.rotate(body, containerAngleStep);
       });
 
       // Rotate right platform and container together
       const rightPlatform = rightPlatformRef.current!;
       const rightContainer = rightContainerRef.current!;
 
       // Platform rotation
       const platformDx = rightPlatform.position.x - rightPivot.x;
       const platformDy = rightPlatform.position.y - rightPivot.y;
       
       const rightCos = Math.cos(rightAngleStep);
       const rightSin = Math.sin(rightAngleStep);
       
       const newPlatformX = rightPivot.x + (platformDx * rightCos - platformDy * rightSin);
       const newPlatformY = rightPivot.y + (platformDx * rightSin + platformDy * rightCos);
       
       Matter.Body.setPosition(rightPlatform, { x: newPlatformX, y: newPlatformY });
       Matter.Body.rotate(rightPlatform, rightAngleStep);
 
       // Container rotation
       const containerBodiesRight = Matter.Composite.allBodies(rightContainer);
       containerBodiesRight.forEach(body => {
         const dx = body.position.x - rightPivot.x;
         const dy = body.position.y - rightPivot.y;
         
         const newX = rightPivot.x + (dx * rightCos - dy * rightSin);
         const newY = rightPivot.y + (dx * rightSin + dy * rightCos);
         
         Matter.Body.setPosition(body, { x: newX, y: newY });
         Matter.Body.rotate(body, rightAngleStep);
       });
 
       flip_currentStep++;
       if (flip_currentStep < flip_steps) {
         requestAnimationFrame(animate);
       }
     };
 
     animate();

    const reduceScoreAndUpdateColor = () => {
      if (gameStateRef.current.containerScore > 0) {
        setGameStateRef(prevState => ({ ...prevState, containerScore: prevState.containerScore - 1 }));
        getSoundManager().play('pop');
        updateContainerColors();
        setTimeout(reduceScoreAndUpdateColor, 200);
      }
    };

    setTimeout(reduceScoreAndUpdateColor, 1000);
     
  };

  const createGround = () => {
    return Matter.Bodies.rectangle(400, 590, 800, 20, {
      isStatic: true,
      render: {
        visible: false
      },
    });
  };

  function attachStringsToBall(
    body: Matter.Body,
    anchor1: Matter.Vector,
    anchor2: Matter.Vector,
    world: Matter.World
  ) {
    const stringA = createVisualString(body, anchor1);
    const stringB = createVisualString(body, anchor2);
    Matter.World.add(world, [stringA, stringB]);
  }

  const initializeScene = () => {
    const engine = Matter.Engine.create();
    const world = engine.world;
    engineRef.current = engine;
    worldRef.current = world;

    const render = Matter.Render.create({
      element: sceneRef.current!,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false,
        background: 'transparent',
      },
    });

    Matter.Render.run(render);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Create platforms and containers side by side
    const platformWidth = 100;
    const containerWidth = 80;

    // Left side setup (container on left of platform)
    const leftContainerX = 100;  // Start with container
    const leftPlatformX = leftContainerX + containerWidth / 2 + platformWidth / 2;  // Platform right next to container

    const leftContainer = createBallContainer(leftContainerX, 180, containerWidth);
    const leftPlatform = createPlatform(leftPlatformX, 180, platformWidth);
    leftPlatformRef.current = leftPlatform;

    // Right side setup (container on right of platform)
    const rightPlatformX = 700 - containerWidth / 2 - platformWidth / 2;  // Start with platform
    const rightContainerX = 700;  // Container right next to platform

    const rightPlatform = createPlatform(rightPlatformX, 180, platformWidth);
    rightPlatformRef.current = rightPlatform;
    const rightContainer = createBallContainer(rightContainerX, 180, containerWidth);
    rightContainerRef.current = rightContainer;

    Matter.Composite.add(world, [leftPlatform, rightPlatform, leftContainer, rightContainer]);

    // Create central container (centered between platforms)
    const container = createContainer();
    containerRef.current = container;
    Matter.Composite.add(world, container);

    // Create ground
    const ground = createGround();
    Matter.Composite.add(world, ground);

    // Create initial balls in containers (n-1 balls)
    const createContainerBalls = (startX: number, color: string, count: number) => {
      const balls = [];
      const spacing = 20;
      const startY = 160;  // Start higher in container

      for (let i = 0; i < count - 1; i++) {  // Create one less ball for container
        const ball = createBall(startX + (i % 4) * spacing - 30, startY - Math.floor(i / 4) * spacing, color);
        balls.push(ball);
      }
      return balls;
    };

    // Create active balls on platforms
    const leftActiveBall = createBall(leftPlatformX, 150, "#4CAF50");
    const rightActiveBall = createBall(rightPlatformX, 150, "#3498db");
    
    // Anchor points for the strings
    const leftAnchor1 = { x: 224, y: 127 };
    const leftAnchor2 = { x: 213, y: 130 };
    const rightAnchor1 = { x: 570, y: 127 };
    const rightAnchor2 = { x: 578, y: 127 };

    // Attach strings to each active ball
    attachStringsToBall(leftActiveBall, leftAnchor1, leftAnchor2, world)
    attachStringsToBall(rightActiveBall, rightAnchor1, rightAnchor2, world)

    setGameStateRef(prevState => ({
      ...prevState,
      activeBallLeft: leftActiveBall,
      activeBallRight: rightActiveBall,
      leftContainerBalls: createContainerBalls(leftContainerX, "#4CAF50", 8),
      rightContainerBalls: createContainerBalls(rightContainerX, "#3498db", 7),
      showAdditionStep: true
    }));

    Matter.Composite.add(world, [
      leftActiveBall,
      rightActiveBall,
      ...gameStateRef.current.leftContainerBalls,
      ...gameStateRef.current.rightContainerBalls
    ]);

    return { render, runner, engine };
  };

  const launchBall = (color: 'green' | 'blue') => {
    if (gameStateRef.current.clickDisabled) return;
    
    getSoundManager().play('shoot');
    if ((color === 'green' && gameStateRef.current.activePhase !== 'left') || (color === 'blue' && gameStateRef.current.activePhase !== 'right')) return;

    setGameStateRef(prevState => ({ ...prevState, clickDisabled: true }));

    const isGreen = color === 'green';
    const platformX = isGreen ? 190 : 610;
    const activeBall = isGreen ? gameStateRef.current.activeBallLeft : gameStateRef.current.activeBallRight;
    const velocity = isGreen ? { x: 6.5, y: -5 } : { x: -5.8, y: -5 };

    // anchor points
    const leftAnchor1 = { x: 224, y: 127 };
    const leftAnchor2 = { x: 213, y: 130 };
    const rightAnchor1 = { x: 570, y: 127 };
    const rightAnchor2 = { x: 578, y: 127 };

    let anchor1: Matter.Vector, anchor2: Matter.Vector;
    if (color === 'green') {
      anchor1 = leftAnchor1;
      anchor2 = leftAnchor2;
    } else {
      anchor1 = rightAnchor1;
      anchor2 = rightAnchor2;
    }


    if (!activeBall) return;

    // Remove strings attached to the active ball
    const allConstraints = Matter.Composite.allConstraints(worldRef.current!).filter(constraint => 
      constraint.bodyA === activeBall
    );
    allConstraints.forEach(constraint => {
      Matter.World.remove(worldRef.current!, constraint);
    });
    Matter.Body.setStatic(activeBall, false);
    Matter.Body.setVelocity(activeBall, velocity);

    setTimeout(() => {
      // Reduce score and manage ball movement
      setGameStateRef(prevState => ({
        ...prevState,
        [isGreen ? 'greenScore' : 'blueScore']: prevState[isGreen ? 'greenScore' : 'blueScore'] - 1,
        containerScore: prevState.containerScore + 1
      }));
      getSoundManager().play('collect');
    }, 1000);

    setTimeout(() => {
      if (!worldRef.current) return;
      setTimeout(() => {
        const containerBalls = isGreen ? gameStateRef.current.leftContainerBalls : gameStateRef.current.rightContainerBalls;

        if (containerBalls.length > 0 && gameStateRef.current.containerScore < 10) {
          const ballToMove = containerBalls[containerBalls.length - 1]; 

          Matter.Body.setPosition(ballToMove, { x: platformX, y: 150 });
          const stringA = createVisualString(ballToMove, isGreen ? anchor1 : anchor2);
          const stringB = createVisualString(ballToMove, isGreen ? anchor2 : anchor1);
          Matter.World.add(worldRef.current!, [stringA, stringB]);

          setGameStateRef(prevState => ({
            ...prevState,
            [isGreen ? 'activeBallLeft' : 'activeBallRight']: ballToMove,
            [isGreen ? 'leftContainerBalls' : 'rightContainerBalls']: containerBalls.slice(0, -1),
            clickDisabled: false
          }));
        } else {
          setGameStateRef(prevState => ({
            ...prevState,
            [isGreen ? 'activeBallLeft' : 'activeBallRight']: null,
            clickDisabled: false
          }));
        }
      }, 500);
    }, 1000);
  };

  const launchGreen = () => launchBall('green');
  const launchBlue = () => launchBall('blue');

  const handleAddition = () => {
    setGameStateRef(prevState => ({
      ...prevState,
      additionStarted: true,
      showAddButton: false
    }));

    getSoundManager().play('rotate');
    setSlings(false)

    // Hide left and right platforms and prepare for animation
    if (worldRef.current) {
      const left = leftPlatformRef.current;
      const right = rightPlatformRef.current;

      Matter.Composite.remove(worldRef.current, left!);
      Matter.Composite.remove(worldRef.current, right!);

    // Start the flip animation after a short delay
    setTimeout(() => {
      flipContainerAndPlatform();
    }, 500);
  }; }

  useEffect(() => {
    const { render, runner, engine } = initializeScene();
    const world = engine.world;

    Matter.Events.on(engine, 'beforeUpdate', () => {
      updateContainerColors();
    });

    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      Matter.Composite.clear(engine.world, false);
      render.canvas.remove();
      render.canvas = null as any;
      render.context = null as any;
      render.textures = {};
    };
  }, []);

  useEffect(() => {
    if (gameStateRef.current.containerScore === 10 && !gameStateRef.current.showAddButton) {
      setGameStateRef(prevState => ({
        ...prevState,
        showAddButton: true,
        clickDisabled: true
      }));
    }
  }, [gameStateRef.current.containerScore]);

  useEffect(() => {
    if (gameStateRef.current.greenScore === 0 && gameStateRef.current.activePhase === 'left') {
      setGameStateRef(prevState => ({
        ...prevState,
        activePhase: 'right'
      }));
    }
  }, [gameStateRef.current.greenScore]);

  return (
    <div className="h-full w-full bg-white">
    <div className="flex flex-col h-full w-full justify-center items-center font-gaegu bg-[linear-gradient(90deg,rgba(0,0,0,.1)_1px,transparent_1px),linear-gradient(rgba(0,0,0,.1)_1px,transparent_1px)] bg-[length:20px_20px]">
      <div className="relative w-[800px] mx-auto p-5 ">
        <div className="w-2/3 mx-auto bg-purple-100 border-2 shadow-[-3px_3px_0_0] border-black p-2 mb-5 rounded">
          <p className="text-3xl font-bold text-center text-purple-600">
            {gameStateRef.current.showAddButton
              ? "Let's add the remaining marbles!"
              : gameStateRef.current.activePhase === 'left'
                ? "Shoot the green marbles first!"
                : "Now shoot the blue marbles!"}
          </p>
        </div>

        <div className="relative w-full">
          {slings && <>
              <div className="absolute top-5 left-5 text-5xl font-bold px-4 py-2 bg-white border border-green-500 z-10 text-green-500">
                {gameStateRef.current.greenScore}
              </div>
              <div className="absolute top-5 right-5 text-5xl font-bold px-4 py-2 bg-white border border-blue-500 z-10 text-blue-500">
                {gameStateRef.current.blueScore}
              </div>
              <div className="absolute left-1/3 transform -translate-x-1/3 -translate-y-1/4 bottom-1/4 text-5xl font-bold px-4 py-2 bg-white border border-purple-500 z-10 text-purple-500">
                {gameStateRef.current.containerScore}
              </div>
              
              <img src="./1.png" alt="Arrow" className="absolute top-[7.7rem] z-10 left-52 w-16 h-14" />
              <img src="./2.png" alt="Arrow" className="absolute top-[7.7rem] z-10 left-52 w-16 h-14" />
              <img src="./3.png" alt="Arrow" className="absolute top-[7.7rem] z-10 right-44 w-16 h-14" />
              <img src="./4.png" alt="Arrow" className="absolute top-[7.7rem] z-10 right-44 w-16 h-14" />
            </>
          }

          <div
            ref={sceneRef}
            className="w-[800px] h-[600px] z-30 mx-auto rounded-lg bg-transparent"
          >
            {/* {renderProceedButton()} */}
          </div>

          {gameStateRef.current.showAddButton ? (
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
              <button
                onClick={handleAddition}
                className="text-xl px-8 py-3 shadow-[-3px_3px_0_0] shadow-purple-500 border bg-white border-purple-500 text-purple-500 font-bold hover:opacity-90"
              >
                Add Remaining Marbles
              </button>
            </div>
          ) : (slings ? (
            <>
              <button
                onClick={launchGreen}
                disabled={gameStateRef.current.clickDisabled || gameStateRef.current.activePhase !== 'left'}
                className={`absolute left-5 top-52 text-2xl px-5 shadow-[-3px_3px_0_0] shadow-purple-500 border bg-white border-purple-500 text-purple-500 font-bold hover:opacity-90 
                  ${(gameStateRef.current.clickDisabled || gameStateRef.current.activePhase !== 'left') ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Shoot
              </button>
              <button
                onClick={launchBlue}
                disabled={gameStateRef.current.clickDisabled || gameStateRef.current.activePhase !== 'right'}
                className={`absolute right-5 top-52 text-2xl px-5 shadow-[-3px_3px_0_0] shadow-purple-500 border bg-white border-purple-500 text-purple-500 font-bold hover:opacity-90 
                  ${(gameStateRef.current.clickDisabled || gameStateRef.current.activePhase !== 'right') ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Shoot
              </button>
            </>
            ) : (
            <div className="absolute h-10 flex flex-col w-full justify-center items-center top-10 left-1/2 transform -translate-x-1/2 gap-2">
              <p className="text-4xl font-bold text-purple-500">
                Count the marbles in the container
              </p>
              <p className="flex">
                  <button 
                    onClick={() => {
                      setFinalAnswer(prev => prev === null ? 1 : prev + 1)
                      getSoundManager().play('pop');
                    }}
                    className="text-md px-2 shadow-[-3px_3px_0_0] shadow-purple-500 border bg-white border-purple-500 text-purple-500 font-bold hover:opacity-90"
                  >
                    <Plus size={16} />
                  </button>
                  <p className="text-4xl mx-8 font-bold text-purple-500">
                    {finalAnswer}
                  </p>
                  <button 
                    onClick={() => {
                      setFinalAnswer(prev => prev === null ? 0 : prev - 1)
                      getSoundManager().play('pop');
                    }}
                    className="text-md px-2 shadow-[-3px_3px_0_0] shadow-purple-500 border bg-white border-purple-500 text-purple-500 font-bold hover:opacity-90"
                  >
                    <Minus size={16} />
                  </button>

              </p>
            </div>
          ))}
          </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Gaegu:wght@300;400;700&display=swap');

        .font-gaegu {
          font-family: 'Gaegu', cursive;
        }
      `}</style>
    </div>
    </div>
  );
};
