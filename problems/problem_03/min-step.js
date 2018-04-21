/**
  Assume f(n) = the function we want

  if n is even: f(n) = f(n / 2) + 1
  if n is odd: f(n) = maxOf{
    f(n - 1) + 1 -> for decreasing,
    f((n + 1) / 2) + 1 + 1 -> for increasing
  }
*/
const minStep = input => {
  let result;

  if (input <= 1) {
    result = 0;
  }
  else if (!(input % 2)) {
    result = minStep(input / 2) + 1;
  }
  else {
    let downVal = minStep(input - 1) + 1;
    let upVal = minStep((input + 1) / 2) + 2;
    result = Math.min(downVal, upVal);
  }

  return result;
};

module.exports = { minStep };
