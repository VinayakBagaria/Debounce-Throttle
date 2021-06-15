const BALL_COLORS = ['purple', 'red', 'blue', 'lime'];

export function getRandomBallColor() {
  return BALL_COLORS[Math.floor(Math.random() * BALL_COLORS.length)];
}

export function debounce(func: Function, duration: number) {
  let timeout: NodeJS.Timeout | null;

  function clear() {
    if (timeout) {
      clearTimeout(timeout);
    }
  }

  function implementation(...args: Array<any>) {
    clear();
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, duration);
  }

  return {
    clear,
    implementation,
  };
}
