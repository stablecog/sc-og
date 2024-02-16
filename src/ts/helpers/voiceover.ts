export function getSpeakerImageUrl(speakerId: string) {
  return `https://ba.stablecog.com/voiceover/speakers/${speakerId}.jpeg`;
}

export function normalizeArray({
  array,
  min,
  max,
}: {
  array: number[];
  min: number;
  max: number;
}): number[] {
  if (array.length === 0) {
    throw new Error("Array cannot be empty");
  }
  const maxVal = Math.max(...array);
  const minVal = Math.min(...array);

  if (maxVal === minVal) {
    // Array elements are all the same
    return array.map(() => 1);
  }

  return array.map((val) =>
    Math.min(max, Math.max(min, (val - minVal) / (maxVal - minVal)))
  );
}

export function cleanText(text: string): string {
  let replaced = text.replace(/(\r\n|\n|\r)/gm, " ");
  replaced = replaced.replace(/  +/g, " ");
  return replaced;
}

export function interpolateArray(data: number[], fitCount: number): number[] {
  let linearInterpolate = function (
    before: number,
    after: number,
    atPoint: number
  ): number {
    return before + (after - before) * atPoint;
  };

  let newData = new Array();
  let springFactor = (data.length - 1) / (fitCount - 1);
  newData[0] = data[0]; // for new allocation
  for (let i = 1; i < fitCount - 1; i++) {
    let tmp = i * springFactor;
    let before = Math.floor(tmp);
    let after = Math.ceil(tmp);
    let atPoint = tmp - before;
    newData[i] = linearInterpolate(data[before], data[after], atPoint);
  }
  newData[fitCount - 1] = data[data.length - 1]; // for new allocation
  return newData;
}

type SplineTuple = [number, number, number, number];

function getSplineTupleArray(y: number[], n: number): SplineTuple[] {
  const a: number[] = y.slice();
  const b: number[] = Array(n).fill(0);
  const c: number[] = Array(n).fill(0);
  const d: number[] = Array(n).fill(0);

  let w: number[] = Array(n).fill(0);
  let v: number[] = Array(n).fill(0);

  for (let i = 1; i < n - 1; ++i) {
    w[i] = 3 * (a[i - 1] - 2 * a[i] + a[i + 1]);
  }

  v[0] = 0.5;
  w[0] /= 2;
  for (let i = 1; i < n - 1; ++i) {
    v[i] = 1 / (4 - v[i - 1]);
    w[i] = (w[i] - w[i - 1]) * v[i];
  }

  for (let i = n - 2; i > 0; --i) {
    w[i] -= v[i] * w[i + 1];
  }

  for (let i = 0; i < n - 1; ++i) {
    d[i] = w[i + 1] - w[i];
    b[i] = a[i + 1] - a[i] - w[i] - d[i];
    c[i] = w[i];
  }

  return a.map((val, i) => [val, b[i], c[i], d[i]]);
}

export function cubicSplineInterpolation(
  data: number[],
  fitCount: number
): number[] {
  const n = data.length;
  const newData = new Array(fitCount).fill(0);
  const delta = (n - 1) / (fitCount - 1);

  const tuples: SplineTuple[] = getSplineTupleArray(data, n);

  for (let i = 0; i < fitCount; ++i) {
    const x = i * delta;
    const j = Math.floor(x);
    const dx = x - j;

    if (j >= n - 1) {
      newData[i] = data[n - 1];
    } else {
      newData[i] =
        ((tuples[j][3] * dx + tuples[j][2]) * dx + tuples[j][1]) * dx +
        tuples[j][0];
    }
  }

  return newData;
}

function getTangents(y: number[], n: number): number[] {
  const m: number[] = Array(n).fill(0);

  for (let i = 0; i < n - 1; i++) {
    const d = y[i + 1] - y[i];
    if (d !== 0) {
      const t = (y[Math.min(i + 2, n - 1)] - y[i]) / d;
      m[i] = (3 * t - 1) / 2;
      m[i + 1] = m[i];
    }
  }

  return m;
}

export function monotoneCubicInterpolation({
  data,
  fitCount,
  min = 0,
  max = 1,
}: {
  data: number[];
  fitCount: number;
  min: number;
  max: number;
}): number[] {
  const n = data.length;
  const newData = new Array(fitCount).fill(0);
  const delta = (n - 1) / (fitCount - 1);

  const m = getTangents(data, n);

  for (let i = 0; i < fitCount; ++i) {
    const x = i * delta;
    const j = Math.floor(x);
    const dx = x - j;

    if (j >= n - 1) {
      newData[i] = data[n - 1];
    } else {
      const dy = data[j + 1] - data[j];
      const h00 = 2 * dx ** 3 - 3 * dx ** 2 + 1;
      const h10 = dx ** 3 - 2 * dx ** 2 + dx;
      const h01 = -2 * dx ** 3 + 3 * dx ** 2;
      const h11 = dx ** 3 - dx ** 2;
      newData[i] =
        h00 * data[j] +
        h10 * m[j] * dy +
        h01 * data[j + 1] +
        h11 * m[j + 1] * dy;
    }
  }

  return newData.map((val) => Math.min(max, Math.max(min, val)));
}
