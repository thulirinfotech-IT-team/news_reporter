import React, { useEffect, useRef } from 'react';

const CursorGlow = () => {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    // Only show on desktop
    if (window.innerWidth < 1024) return;

    let x = 0, y = 0;
    let trailX = 0, trailY = 0;

    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = x + 'px';
        cursorRef.current.style.top = y + 'px';
      }
    };

    const animateTrail = () => {
      trailX += (x - trailX) * 0.15;
      trailY += (y - trailY) * 0.15;
      if (trailRef.current) {
        trailRef.current.style.left = trailX + 'px';
        trailRef.current.style.top = trailY + 'px';
      }
      requestAnimationFrame(animateTrail);
    };

    window.addEventListener('mousemove', move);
    animateTrail();

    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      {/* Cursor dot */}
      <div
        ref={cursorRef}
        className="fixed w-3 h-3 bg-gold-400 rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{ transform: 'translate(-50%, -50%)', transition: 'none' }}
      />
      {/* Trail ring */}
      <div
        ref={trailRef}
        className="fixed w-8 h-8 border border-gold-500/50 rounded-full pointer-events-none z-[9998]"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};

export default CursorGlow;
