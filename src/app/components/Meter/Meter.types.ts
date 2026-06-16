export interface MeterProps {
  min?: number;
  max?: number;
  value?: number;
  optimum?: number;
  low?: number;
  high?: number;
}

function getMeterColor(
  val: number,
  min: number,
  max: number,
  optimum: number | undefined,
  low: number | undefined,
  high: number | undefined,
): string {
  const range = max - min;
  const lowThreshold = low ?? min + range * 0.33;
  const highThreshold = high ?? min + range * 0.66;
  const optimumValue = optimum ?? max;

  if (optimumValue >= lowThreshold && optimumValue <= highThreshold) {
    if (val >= lowThreshold && val <= highThreshold) {
      return 'var(--color-green-500)';
    } else if (val < lowThreshold || val > highThreshold) {
      return 'var(--color-yellow-500)';
    }
  } else if (optimumValue > highThreshold) {
    if (val > highThreshold) {
      return 'var(--color-green-500)';
    } else if (val >= lowThreshold) {
      return 'var(--color-yellow-500)';
    } else {
      return 'var(--color-pink-600)';
    }
  } else {
    if (val < lowThreshold) {
      return 'var(--color-green-500)';
    } else if (val <= highThreshold) {
      return 'var(--color-yellow-500)';
    } else {
      return 'var(--color-pink-600)';
    }
  }

  return 'var(--color-blue-500)';
}

export { getMeterColor };
