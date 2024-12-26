import React, { useEffect, useRef, useState } from "react";
import * as Matter from "matter-js";

const BallGame: React.FC = () => {
  const [greenScore, setGreenScore] = useState(8); // Start with 8 balls
  const [blueScore, setBlueScore] = useState(7);  // Start with 7 balls
  const [containerScore, setContainerScore] = useState(0);
  const [activePhase, setActivePhase] = useState<'left' | 'right'>('left');
  const [leftContainerBalls, setLeftContainerBalls] = useState<Matter.Body[]>([]);
  const [rightContainerBalls, setRightContainerBalls] = useState<Matter.Body[]>([]);
  const [platformsVisible, setPlatformsVisible] = useState(true);
  const [activeBallLeft, setActiveBallLeft] = useState<Matter.Body | null>(null);
  const [activeBallRight, setActiveBallRight] = useState<Matter.Body | null>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine>();
  const worldRef = useRef<Matter.World>();
  const containerRef = useRef<Matter.Composite>();
  const rightPlatformRef = useRef<Matter.Composite>();
  const rightContainerRef = useRef<Matter.Composite | null>(null);
  const [clickDisabled, setClickDisabled] = useState(false);

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
    const leftWall = Matter.Bodies.rectangle(x - width/2 + wallThickness/2, y - height/2, wallThickness, height, {
      isStatic: true,
      render: { 
        fillStyle: "#666",
        strokeStyle: "transparent",
      },
    });

    // Right wall
    const rightWall = Matter.Bodies.rectangle(x + width/2 - wallThickness/2, y - height/2, wallThickness, height, {
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
      restitution: 0.6,
      render: { fillStyle: color },
    });
  };

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
    const containerHeight = 200;
    const containerPosition = { x: 390, y: 300 };

    const containerComposite = Matter.Composite.create();

    const parts = [
      Matter.Bodies.rectangle(containerPosition.x + containerWidth/2, containerPosition.y + containerHeight/2, containerWidth, 2, {
        isStatic: true,
        render: { 
          fillStyle: "#666",
          strokeStyle: "transparent",
          lineWidth: 1
        },
      }),
      Matter.Bodies.rectangle(containerPosition.x, containerPosition.y, 2, containerHeight, {
        isStatic: true,
        render: { 
          fillStyle: "#666",
          strokeStyle: "transparent",
          lineWidth: 1
        },
      }),
      Matter.Bodies.rectangle(containerPosition.x + containerWidth, containerPosition.y, 2, containerHeight, {
        isStatic: true,
        render: { 
          fillStyle: "#666",
          strokeStyle: "transparent",
          lineWidth: 1
        },
      }),
    ];

    Matter.Composite.add(containerComposite, parts);
    containerRef.current = containerComposite;
    return containerComposite;
  };

  const flipContainerAndPlatform = () => {
    if (!containerRef.current || !worldRef.current || !rightPlatformRef.current || !rightContainerRef.current) return;

    // Hide left platform
    setPlatformsVisible(false);
    if (worldRef.current) {
      const bodies = Matter.Composite.allBodies(worldRef.current);
      bodies.forEach(body => {
        if (body.label.includes('platform') && body !== rightPlatformRef.current) {
          Matter.Composite.remove(worldRef.current!, body);
        }
      });
    }

    // Center container pivot
    const containerPivot = { x: 400, y: 300 };
    // Right side pivot (between platform and container)
    const rightPivot = { x: 660, y: 180 }; // Middle point between platform and container

    const targetAngle = 4 * Math.PI / 5;
    const steps = 60;
    const containerAngleStep = targetAngle / steps;
    const rightAngleStep = -targetAngle / steps; // Opposite direction
    let currentStep = 0;

    const animate = () => {
      if (currentStep >= steps) return;

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

      currentStep++;
      if (currentStep < steps) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  const createGround = () => {
    return Matter.Bodies.rectangle(400, 590, 800, 20, {
      isStatic: true,
      render: { 
        visible: false
      },
    });
  };

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
    const leftPlatformX = leftContainerX + containerWidth/2 + platformWidth/2;  // Platform right next to container
    
    const leftContainer = createBallContainer(leftContainerX, 180, containerWidth);
    const leftPlatform = createPlatform(leftPlatformX, 180, platformWidth);
    
    // Right side setup (container on right of platform)
    const rightPlatformX = 700 - containerWidth/2 - platformWidth/2;  // Start with platform
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
    setActiveBallLeft(leftActiveBall);
    setActiveBallRight(rightActiveBall);
    Matter.Composite.add(world, [leftActiveBall, rightActiveBall]);

    const leftBalls = createContainerBalls(leftContainerX, "#4CAF50", 8);
    const rightBalls = createContainerBalls(rightContainerX, "#3498db", 7);

    setLeftContainerBalls(leftBalls);
    setRightContainerBalls(rightBalls);
    Matter.Composite.add(world, [...leftBalls, ...rightBalls]);

    return { render, runner, engine };
  };

  const launchBall = (color: 'green' | 'blue') => {
    if (!worldRef.current || containerScore >= 10) return;
    if ((color === 'green' && activePhase !== 'left') || (color === 'blue' && activePhase !== 'right')) return;
    setClickDisabled(true);
    
    const isGreen = color === 'green';
    const platformX = isGreen ? 200 : 600;
    const activeBall = isGreen ? activeBallLeft : activeBallRight;
    const velocity = isGreen ? { x: 6.5, y: -5 } : { x: -6.01, y: -5 };

    if (!activeBall) return;
    
    // Launch the active ball
    Matter.Body.setStatic(activeBall, false);
    Matter.Body.setVelocity(activeBall, velocity);
    
    // Remove a ball from container and make it the new active ball
    const containerBalls = isGreen ? leftContainerBalls : rightContainerBalls;
    
    isGreen ? setGreenScore(prev => prev - 1) : setBlueScore(prev => prev - 1);

    setTimeout(() => {
      if (!worldRef.current) return;
      setTimeout(() => {
        if (containerBalls.length > 0) {
          const ballToMove = containerBalls[containerBalls.length - 1];
          Matter.Body.setPosition(ballToMove, { x: platformX, y: 150 });
          
          if (isGreen) {
            setActiveBallLeft(ballToMove);
            setLeftContainerBalls(prev => prev.slice(0, -1));
          } else {
            setActiveBallRight(ballToMove);
            setRightContainerBalls(prev => prev.slice(0, -1));
          }
        } else {
          if (isGreen) {
            setActiveBallLeft(null);
          } else {
            setActiveBallRight(null);
          }
        }
        setClickDisabled(false);
      }, 300);
      setContainerScore(prev => prev + 1);
    }, 1000);
  };

  const launchGreen = () => launchBall('green');
  const launchBlue = () => launchBall('blue');

  const isGameComplete = containerScore >= 10;

  useEffect(() => {
    const { render, runner, engine } = initializeScene();

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
    if (containerScore === 10) {
      flipContainerAndPlatform();
    }
  }, [containerScore]);

  useEffect(() => {
    if (greenScore === 0 && activePhase === 'left') {
      setActivePhase('right');
    }
  }, [greenScore]);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Gaegu:wght@300;400;700&display=swap"
        rel="stylesheet"
      />
      <div className="flex flex-col items-center font-gaegu rounded-xl bg-white">
        <div className="relative w-[800px] p-5 bg-[linear-gradient(90deg,rgba(0,0,0,.1)_1px,transparent_1px),linear-gradient(rgba(0,0,0,.1)_1px,transparent_1px)] bg-[length:20px_20px]">
          <div className="w-2/3 mx-auto bg-purple-100 border-2 shadow-[-3px_3px_0_0] border-black p-2 mb-5 rounded">
            <p className="text-3xl font-bold text-center text-purple-600">
              {isGameComplete 
                ? "Great job! Now watch the balls combine to make 15!" 
                : activePhase === 'left' 
                  ? "Shoot the green marbles first!" 
                  : "Now shoot the blue marbles!"}
            </p>
          </div>  
          
          <div className="relative">
            <div className="absolute top-5 left-5 text-5xl font-bold px-4 py-2 bg-white border border-green-500 z-10 text-green-500">
              {greenScore}
            </div>
            <div className="absolute top-5 right-5 text-5xl font-bold px-4 py-2 bg-white border border-blue-500 z-10 text-blue-500">
              {blueScore}
            </div>
            
            <div
              ref={sceneRef}
              className="w-[800px] h-[600px] rounded-lg bg-transparent"
            />

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold px-4 py-2 bg-white border border-purple-500 z-10 text-purple-500">
              {containerScore}
            </div>
            
            <div className="flex justify-between w-full px-[50px] -mt-[60px] relative z-10">
              <button 
                onClick={launchGreen}
                disabled={clickDisabled || isGameComplete || activePhase !== 'left'}
                className={`text-2xl px-5 py-2 shadow-[-3px_3px_0_0] shadow-purple-500 border bg-white border-purple-500 text-purple-500 font-bold hover:opacity-90 
                  ${(clickDisabled || isGameComplete || activePhase !== 'left') ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Shoot
              </button>
              <button 
                onClick={launchBlue}
                disabled={clickDisabled || isGameComplete || activePhase !== 'right'}
                className={`text-2xl px-5 py-2 shadow-[-3px_3px_0_0] shadow-purple-500 border bg-white border-purple-500 text-purple-500 font-bold hover:opacity-90 
                  ${(clickDisabled || isGameComplete || activePhase !== 'right') ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Shoot
              </button>
            </div>
          </div>
        </div>

        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Gaegu:wght@300;400;700&display=swap');

          .font-gaegu {
            font-family: 'Gaegu', cursive;
          }
        `}</style>
      </div>
    </>
  );
};

export default BallGame;
