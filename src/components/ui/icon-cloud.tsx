"use client";

import React, { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";

interface Icon {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  id: number;
}

interface IconCloudProps {
  icons?: React.ReactNode[];
  images?: string[];
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function IconCloud({ icons, images }: IconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [iconPositions, setIconPositions] = useState<Icon[]>([]);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetRotation, setTargetRotation] = useState<{
    x: number;
    y: number;
    startX: number;
    startY: number;
    distance: number;
    startTime: number;
    duration: number;
  } | null>(null);

  const animationFrameRef = useRef<number>(0);
  const rotationRef = useRef(rotation);
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([]);
  const imagesLoadedRef = useRef<boolean[]>([]);

  // Responsive Canvas Sizing
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current && canvasRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  // Create icon canvases once
  useEffect(() => {
    if (!icons && !images) return;
    const items = icons || images || [];
    imagesLoadedRef.current = new Array(items.length).fill(false);

    const newIconCanvases = items.map((item, index) => {
      const offscreen = document.createElement("canvas");
      offscreen.width = 80; // Increased resolution for scaling
      offscreen.height = 80;
      const offCtx = offscreen.getContext("2d");

      if (offCtx) {
        if (images) {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = items[index] as string;
          img.onload = () => {
            offCtx.clearRect(0, 0, 80, 80);
            offCtx.beginPath();
            offCtx.arc(40, 40, 40, 0, Math.PI * 2);
            offCtx.closePath();
            offCtx.clip();
            offCtx.drawImage(img, 0, 0, 80, 80);
            imagesLoadedRef.current[index] = true;
          };
        } else {
          offCtx.scale(0.8, 0.8);
          const svgString = renderToString(item as React.ReactElement);
          const img = new Image();
          img.src = "data:image/svg+xml;base64," + btoa(svgString);
          img.onload = () => {
            offCtx.clearRect(0, 0, 80, 80);
            offCtx.drawImage(img, 0, 0);
            imagesLoadedRef.current[index] = true;
          };
        }
      }
      return offscreen;
    });

    iconCanvasesRef.current = newIconCanvases;
  }, [icons, images]);

  // Generate sphere positions with LARGER RADIUS
  useEffect(() => {
    const items = icons || images || [];
    const newIcons: Icon[] = [];
    const numIcons = items.length || 20;

    // Architect Choice: Increase radius to fill the Bento Box
    const radius = 170;

    const offset = 2 / numIcons;
    const increment = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;

      newIcons.push({
        x: Math.cos(phi) * r * radius,
        y: y * radius,
        z: Math.sin(phi) * r * radius,
        scale: 1,
        opacity: 1,
        id: i,
      });
    }
    setIconPositions(newIcons);
  }, [icons, images]);

  // Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
    setTargetRotation(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }

    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;
      rotationRef.current.x += deltaY * 0.005;
      rotationRef.current.y += deltaX * 0.005;
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  // Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Auto-rotation when idle
      if (!isDragging && !targetRotation) {
        rotationRef.current.y += 0.002;
        rotationRef.current.x += 0.001;
      }

      // Sort icons by Z-index for correct depth rendering
      const sortedIcons = [...iconPositions].sort((a, b) => {
        const az =
          a.x * Math.sin(rotationRef.current.y) +
          a.z * Math.cos(rotationRef.current.y);
        const bz =
          b.x * Math.sin(rotationRef.current.y) +
          b.z * Math.cos(rotationRef.current.y);
        return az - bz;
      });

      sortedIcons.forEach((icon) => {
        const cosX = Math.cos(rotationRef.current.x);
        const sinX = Math.sin(rotationRef.current.x);
        const cosY = Math.cos(rotationRef.current.y);
        const sinY = Math.sin(rotationRef.current.y);

        const rotatedX = icon.x * cosY - icon.z * sinY;
        const rotatedZ = icon.x * sinY + icon.z * cosY;
        const rotatedY = icon.y * cosX + rotatedZ * sinX;

        // Modern Perspective Logic
        const perspective = 300;
        const scale = (rotatedZ + perspective) / (perspective * 1.5);
        const opacity = Math.max(0.15, Math.min(1, (rotatedZ + 200) / 300));

        ctx.save();
        ctx.translate(
          canvas.width / 2 + rotatedX,
          canvas.height / 2 + rotatedY
        );
        ctx.scale(scale, scale);
        ctx.globalAlpha = opacity;

        // Apply a subtle blur to background icons
        if (rotatedZ < 0) {
          ctx.filter = `blur(${Math.abs(rotatedZ) / 50}px)`;
        }

        if (
          iconCanvasesRef.current[icon.id] &&
          imagesLoadedRef.current[icon.id]
        ) {
          ctx.drawImage(iconCanvasesRef.current[icon.id], -30, -30, 60, 60);
        }

        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [iconPositions, isDragging, targetRotation]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[300px] flex items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        className="cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
