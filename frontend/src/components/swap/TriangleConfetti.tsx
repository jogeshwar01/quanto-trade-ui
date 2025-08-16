import React from "react";
import Confetti from "react-confetti";

const ConfettiWithTriangles: React.FC = () => {
  return (
    <Confetti
      colors={["#42C78D"]}
      tweenDuration={1000}
      numberOfPieces={400}
      gravity={0.2}
      confettiSource={{
        x: 0,
        y: 0,
        w: window.innerWidth,
        h: window.innerHeight,
      }}
      drawShape={(ctx) => {
        ctx.beginPath();

        // Set up the triangle's vertices
        const size = 10; // Size of the triangle (you can adjust this)
        const centerX = 0;
        const centerY = 0;

        // Triangle vertices
        const points = [
          { x: centerX, y: centerY - size }, // Top vertex
          { x: centerX - size, y: centerY + size }, // Bottom left vertex
          { x: centerX + size, y: centerY + size }, // Bottom right vertex
        ];

        // Draw the triangle
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();

        ctx.fill();
      }}
    />
  );
};

export default ConfettiWithTriangles;
