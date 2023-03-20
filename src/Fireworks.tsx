import { useState, useEffect } from "react";

const randomNumberGenerator = (min: number, max: number) => Math.random() * (max - min) + min;

const particleSettings = {
  gravity: 0.05,
};

class Particle {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D | null;
  private width: number;
  private height: number;
  private x: number;
  private y: number;
  private vx: number;
  private vy: number;
  private canvasWidth: number;
  private canvasHeight: number;
  private color: string;

  constructor(mouseX: number, mouseY: number, canvas: HTMLCanvasElement) {
    this.width = randomNumberGenerator(0.1, 0.9) * 5;
    this.height = randomNumberGenerator(0.1, 0.9) * 5;
    this.x = mouseX - this.width / 2;
    this.y = mouseY - this.height / 2;
    this.vx = (Math.random() - 0.5) * 10;
    this.vy = (Math.random() - 0.5) * 10;
    this.canvas = canvas;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.color = `rgb( ${randomNumberGenerator(0, 255)}, ${randomNumberGenerator(
      0,
      255
    )}, ${randomNumberGenerator(0, 255)}`;
    this.context = this.canvas.getContext("2d");
    this.setVelocity();
  }

  move() {
    if (this.x >= this.canvasWidth || this.y >= this.canvasHeight) {
      return false;
    }
    return true;
  }

  draw() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += particleSettings.gravity;

    if (this.context) {
      this.context.save();
      this.context.beginPath();
      this.context.translate(this.x, this.y);
      this.context.arc(0, 0, this.width, 0, Math.PI * 2);
      this.context.fillStyle = this.color;
      this.context.closePath();
      this.context.fill();
      this.context.restore();
    }
  }

  setVelocity() {
    const vy = Math.sqrt(25 - this.vx * this.vx);
    if (Math.abs(this.vy) > vy) {
      this.vy = this.vy > 0 ? vy : -vy;
    }
  }
}

let particles = [];

const Fireworks = () => {
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const width = window.innerWidth;
    const height = window.innerHeight;

    function startFireWork() {
      const current = [];
      context.fillStyle = "rgba(0,0,0,0.1)";
      context.fillRect(0, 0, width, height);

      for (const particle of particles) {
        particle.draw();
        if (particle.move()) {
          current.push(particle);
        }
      }
      particles = current;
      window.requestAnimationFrame(startFireWork);
    }

    window.onload = () => {
      canvas.width = width;
      canvas.height = height;
      window.requestAnimationFrame(startFireWork);
    };
  }, []);

  const createFirework = (x: number, y: number) => {
    const numberOfParticles = randomNumberGenerator(10, 50);
    for (var i = 0; i < numberOfParticles; i++) {
      const particle = new Particle(x, y, canvas);
      particles.push(particle);
    }
  };

  return (
    <>
      <div className="container">
        <canvas
          id="canvas"
          onMouseDown={(e) => {
            createFirework(e.pageX, e.pageY);
          }}
        >
          Canvas is not supported in your browser.
        </canvas>
      </div>
    </>
  );
};

export default Fireworks;
