import React, { useRef, useEffect, useState } from "react";

const SandWriting = () => {
  const canvasRef = useRef(null);
  const grains = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  const GRAIN_SIZE = 2;
  const GRAIN_COUNT = 100000; // Increased, as we're now more efficient
  const CELL_SIZE = 50; // Size of each grid cell
  const INFLUENCE_DISTANCE = 50;
  const FORCE_MULTIPLIER = 0.5;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gridWidth = Math.ceil(canvas.width / CELL_SIZE);
    const gridHeight = Math.ceil(canvas.height / CELL_SIZE);
    const grid = new Array(gridWidth * gridHeight).fill().map(() => []);

    // Initialize sand grains
    for (let i = 0; i < GRAIN_COUNT; i++) {
      const grain = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 0,
        vy: 0,
        // color: `rgb(${220 + Math.random() * 20}, ${200 + Math.random() * 20}, ${
        //   150 + Math.random() * 20
        // })`,
        color: `rgb(255,255, 255)`,
      };
      grains.current.push(grain);
      const cellX = Math.floor(grain.x / CELL_SIZE);
      const cellY = Math.floor(grain.y / CELL_SIZE);
      grid[cellY * gridWidth + cellX].push(grain);
    }

    const drawGrains = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      grains.current.forEach((grain) => {
        const index =
          (Math.floor(grain.y) * canvas.width + Math.floor(grain.x)) * 4;
        data[index] = parseInt(grain.color.slice(4, 7)); // R
        data[index + 1] = parseInt(grain.color.slice(9, 12)); // G
        data[index + 2] = parseInt(grain.color.slice(14, 17)); // B
        data[index + 3] = 255; // A
      });

      ctx.putImageData(imageData, 0, 0);
    };

    const updateGrains = () => {
      const mouseVelocityX = mousePos.current.x - lastMousePos.current.x;
      const mouseVelocityY = mousePos.current.y - lastMousePos.current.y;

      const cellX = Math.floor(mousePos.current.x / CELL_SIZE);
      const cellY = Math.floor(mousePos.current.y / CELL_SIZE);

      for (let offsetY = -1; offsetY <= 1; offsetY++) {
        for (let offsetX = -1; offsetX <= 1; offsetX++) {
          const checkCellX = cellX + offsetX;
          const checkCellY = cellY + offsetY;
          if (
            checkCellX >= 0 &&
            checkCellX < gridWidth &&
            checkCellY >= 0 &&
            checkCellY < gridHeight
          ) {
            grid[checkCellY * gridWidth + checkCellX].forEach((grain) => {
              const dx = mousePos.current.x - grain.x;
              const dy = mousePos.current.y - grain.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < INFLUENCE_DISTANCE) {
                const force =
                  (INFLUENCE_DISTANCE - distance) / INFLUENCE_DISTANCE;
                grain.vx += mouseVelocityX * force * FORCE_MULTIPLIER;
                grain.vy += mouseVelocityY * force * FORCE_MULTIPLIER;
              }

              grain.x += grain.vx;
              grain.y += grain.vy;
              grain.vx *= 0.9;
              grain.vy *= 0.9;

              grain.x = Math.max(0, Math.min(canvas.width - 1, grain.x));
              grain.y = Math.max(0, Math.min(canvas.height - 1, grain.y));
            });
          }
        }
      }

      lastMousePos.current = { ...mousePos.current };
    };

    const animate = () => {
      updateGrains();
      drawGrains();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-blue-100">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        className="cursor-none"
      />
    </div>
  );
};

export default SandWriting;
