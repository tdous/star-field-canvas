import { AnimLoopEngine } from 'anim-loop-engine';

import { Star } from './Star';
import { defaultColor, StarColorObj } from './starColor';

type StarFieldOpts = {
  followMouse?: boolean;
  color?: StarColorObj;
  glow?: boolean;
  maxV?: number;
  minV?: number;
  numStars?: number;
  trails?: boolean;
};

// StarField factory
export class StarField {
  private defaultMaxV: number = 5;
  private defaultMinV: number = 2;
  private defaultNumStars: number = 400;

  private initialized: boolean = false;

  private canvasW: number = 0;
  private canvasH: number = 0;
  private canvasHalfW: number = 0;
  private canvasHalfH: number = 0;

  private offsetX: number = 0;
  private offsetY: number = 0;
  private offsetTX: number = 0;
  private offsetTY: number = 0;

  private stars: Star[] = [];

  private canvas: HTMLCanvasElement;
  private canvasRectLeft: number;
  private canvasRectTop: number;
  private ctx: any;

  private engine: AnimLoopEngine;

  private resizeTimeout: number = 0;

  color: StarColorObj;
  glow: boolean;
  minV: number;
  maxV: number;
  numStars: number;
  trails: boolean;

  constructor(canvasId: string, opts: StarFieldOpts = {}) {
    if (!canvasId) {
      throw 'First argument "id" is required';
      return;
    }

    this.color = opts.color || defaultColor;
    this.glow = opts.glow || false;
    this.minV = opts.minV || this.defaultMinV;
    this.maxV = opts.maxV || this.defaultMaxV;
    this.numStars = this.defaultNumStars;
    this.trails = opts.trails || false;

    this.canvas = <HTMLCanvasElement>document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    const rect = this.canvas.getBoundingClientRect();
    this.canvasRectLeft = rect.left;
    this.canvasRectTop = rect.top;

    this.handleMouseMove = this.handleMouseMove.bind(this);

    // Set up animation engine
    this.engine = new AnimLoopEngine();
    this.engine.addTask(this.draw.bind(this));

    // Set up window events
    // Window blur/focus
    window.addEventListener('blur', () => {
      this.stop();
    });
    window.addEventListener('focus', () => {
      this.start();
    });

    // Window event - on resize to reinitialize canvas, all stars and animation
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout);
      this.stop();
      this.resizeTimeout = setTimeout(() => {
        this.reset();
        this.start();
      }, 500);
    });

    // Did config set a number of stars?
    this.numStars = opts.numStars
      ? Math.abs(opts.numStars)
      : this.defaultNumStars;

    // Setup the canvas
    this.setupCanvas();

    // Gen new stars
    this.generateStars();

    this.initialized = true;

    // Did config enable mouse following?
    if (opts.followMouse) {
      this.setFollowMouse(true);
    }
  }

  // Generate n new stars
  private generateStars() {
    for (let i = 0; i < this.numStars; i++) {
      this.stars.push(
        new Star({
          ctx: this.ctx,
          W: this.canvasW,
          H: this.canvasH,
          hW: this.canvasHalfW,
          hH: this.canvasHalfH,
          minV: this.minV,
          maxV: this.maxV,
          color: this.color,
          glow: this.glow,
          trails: this.trails,
          addTasks: this.engine.addTasks
        })
      );
    }
  }

  // Apply canvas container size to canvas and translate origin to center
  private setupCanvas() {
    const canvasStyle: any = window.getComputedStyle(this.canvas);

    this.canvas.setAttribute('height', canvasStyle.height);
    this.canvas.setAttribute('width', canvasStyle.width);

    // canvasH/W/canvasHalfH/W used here and set to use elsewhere
    this.canvasH = this.canvas.height;
    this.canvasW = this.canvas.width;
    this.canvasHalfH = this.canvasH / 2;
    this.canvasHalfW = this.canvasW / 2;

    this.ctx.translate(this.canvasHalfW, this.canvasHalfH);
  }

  // Draw the stars in this frame
  private draw() {
    // Adjust offsets closer to target offset
    if (this.offsetX !== this.offsetTX) {
      this.offsetX += (this.offsetTX - this.offsetX) * 0.02;
      this.offsetY += (this.offsetTY - this.offsetY) * 0.02;
    }

    // Clear the canvas ready for this frame
    this.ctx.clearRect(
      -this.canvasHalfW,
      -this.canvasHalfH,
      this.canvasW,
      this.canvasH
    );

    for (let i in this.stars) {
      this.stars[i].draw(this.offsetX, this.offsetY);
    }
  }

  // Follow mouse (used in event listener definition)
  private handleMouseMove(e: MouseEvent) {
    if (this.initialized) {
      this.offsetTX = e.clientX - this.canvasRectLeft - this.canvasHalfW;
      this.offsetTY = e.clientY - this.canvasRectTop - this.canvasHalfH;
    }
  }
  private resetMouseOffset() {
    this.offsetTX = 0;
    this.offsetTY = 0;
  }

  // Start/stop the StarField
  start() {
    this.engine.start();
  }
  stop() {
    this.engine.stop();
  }

  reset() {
    // Clear stars
    this.stars = [];

    // Reset canvas
    this.setupCanvas();

    // Gen new stars
    this.generateStars();
  }

  // "Hot"-updateable config values
  setMaxV(val: number) {
    this.maxV = val ? Math.abs(val) : this.defaultMaxV;
    this.reset();
  }
  setMinV(val: number) {
    this.minV = val ? Math.abs(val) : this.defaultMinV;
    this.reset();
  }
  setNumStars(val: number) {
    this.numStars = val ? Math.abs(val) : this.defaultNumStars;
    this.reset();
  }
  setFollowMouse(val: boolean) {
    if (val) {
      this.canvas.addEventListener('mousemove', this.handleMouseMove);
    } else {
      this.canvas.removeEventListener('mousemove', this.handleMouseMove);
      this.resetMouseOffset();
    }
  }
}
