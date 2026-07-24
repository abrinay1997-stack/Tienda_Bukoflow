'use client';

import { createElement, useEffect, useRef, useState, type ReactNode } from 'react';

type Particle = { x: number; y: number; tx: number; ty: number };

const PARTICLE_STEP = 3;
const PARTICLE_SIZE = 1.6;
const EASE = 0.1;
const SCATTER_MIN = 90;
const SCATTER_RANGE = 110;
const SETTLE_THRESHOLD = 0.004;

export function ParticleText({
  as,
  className,
  children,
}: {
  as: 'h1' | 'h2';
  className?: string;
  children: ReactNode;
}) {
  const textRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [skip, setSkip] = useState(true);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    setSkip(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (skip) return;
    const textEl = textRef.current;
    const canvas = canvasRef.current;
    if (!textEl || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    let progress = 0;
    let target = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const buildParticles = () => {
      const rect = textEl.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const style = getComputedStyle(textEl);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const off = document.createElement('canvas');
      off.width = canvas.width;
      off.height = canvas.height;
      const offCtx = off.getContext('2d');
      if (!offCtx) return;

      offCtx.scale(dpr, dpr);
      offCtx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      offCtx.textBaseline = 'alphabetic';
      offCtx.fillStyle = '#fff';
      if ('letterSpacing' in offCtx) {
        (offCtx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
          style.letterSpacing;
      }

      const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.2;
      const words = (textEl.textContent ?? '').split(/\s+/).filter(Boolean);
      const lines: string[] = [];
      let line = '';
      for (const word of words) {
        const test = line ? `${line} ${word}` : word;
        if (line && offCtx.measureText(test).width > rect.width) {
          lines.push(line);
          line = word;
        } else {
          line = test;
        }
      }
      if (line) lines.push(line);

      const totalHeight = lines.length * lineHeight;
      const startY = (rect.height - totalHeight) / 2 + lineHeight * 0.8;
      const textAlign = style.textAlign === 'center' ? 'center' : 'left';
      offCtx.textAlign = textAlign;

      lines.forEach((l, i) => {
        const x = textAlign === 'center' ? rect.width / 2 : 0;
        offCtx.fillText(l, x, startY + i * lineHeight);
      });

      const imgData = offCtx.getImageData(0, 0, canvas.width, canvas.height).data;
      const step = PARTICLE_STEP * dpr;
      const pts: Particle[] = [];
      for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
          const alphaIdx = (y * canvas.width + x) * 4 + 3;
          if (imgData[alphaIdx] > 128) {
            const tx = x / dpr;
            const ty = y / dpr;
            const angle = Math.random() * Math.PI * 2;
            const dist = SCATTER_MIN + Math.random() * SCATTER_RANGE;
            pts.push({
              tx,
              ty,
              x: tx + Math.cos(angle) * dist,
              y: ty + Math.sin(angle) * dist,
            });
          }
        }
      }
      particles = pts;
    };

    buildParticles();
    ctx.scale(dpr, dpr);

    const render = () => {
      progress += (target - progress) * EASE;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.3 + 0.7 * progress;
      ctx.fillStyle = getComputedStyle(textEl).color;
      for (const p of particles) {
        const x = p.x + (p.tx - p.x) * progress;
        const y = p.y + (p.ty - p.y) * progress;
        ctx.fillRect(x, y, PARTICLE_SIZE, PARTICLE_SIZE);
      }
      canvas.style.filter = progress < 0.97 ? `blur(${(1 - progress) * 2.5}px)` : '';
      if (Math.abs(progress - target) > SETTLE_THRESHOLD) {
        raf = requestAnimationFrame(render);
      } else {
        raf = 0;
        progress = target;
        if (target === 1) setSolid(true);
      }
    };

    const startLoop = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const entering = entry.isIntersecting;
        target = entering ? 1 : 0;
        if (!entering) setSolid(false);
        startLoop();
      },
      { threshold: 0.3 }
    );
    observer.observe(textEl);

    const onResize = () => buildParticles();
    window.addEventListener('resize', onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [skip]);

  return (
    <div className="relative">
      {createElement(
        as,
        {
          ref: textRef,
          className: `${className ?? ''} ${
            skip ? '' : `transition-opacity duration-300 ${solid ? 'opacity-100' : 'opacity-0'}`
          }`.trim(),
        },
        children
      )}
      {!skip && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
            solid ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}
    </div>
  );
}
