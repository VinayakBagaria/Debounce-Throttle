import Ball from './Ball';
import { defaultSceneConfig, SceneConfigType } from './constants';
import { getRandomBallColor, getRandomArbitrary } from './utils';

class Scene {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private config: SceneConfigType;
  private balls: Array<Ball> = [];
  private animationFrame: number = 0;

  constructor(canvas: HTMLCanvasElement, config?: Partial<SceneConfigType>) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (context) {
      this.ctx = context;
    } else {
      throw new Error('Context not retrieved');
    }
    this.config = {
      ...defaultSceneConfig,
      ...config,
    };
    this.canvas.width = this.config.width;
    this.canvas.height = this.config.height;
    this.update();
  }

  public createSingleBall() {
    // random x, y positions
    const x = getRandomArbitrary(
      0.3 * this.config.width,
      0.7 * this.config.width
    );
    const y = 0;

    const sceneForBall = {
      ...this.config,
    };

    const ballProps = {
      color: getRandomBallColor(),
    };

    const ballInstance = new Ball(x, y, sceneForBall, ballProps);
    this.balls.push(ballInstance);

    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.update();
  }

  private update() {
    // queue the next update
    this.animationFrame = window.requestAnimationFrame(() => this.update());

    // clear the canvas
    this.ctx.clearRect(0, 0, this.config.width, this.config.height);

    // update objects
    this.balls.forEach(eachBall => eachBall.update());

    // draw objects
    this.balls.forEach(eachBall => eachBall.draw(this.ctx));
  }

  public getBallCount() {
    return this.balls.length;
  }
}

export default Scene;
