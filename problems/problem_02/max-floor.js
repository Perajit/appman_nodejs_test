const getRequiredBricks = (n) => {
  // 1 -> 1
  // 2 -> 1 + 2
  // 3 -> 1 + 2 + 3
  // n -> 1 + ... + n = n * (n + 1) / 2
  return n * (n + 1) / 2;
}

const maxFloor = input => {
  let max = 0;

  for (let n = 0; n < input; ++n) {
    if (input < getRequiredBricks(n)) {
      break;
    }

    max = n;
  }

  return max;
};

module.exports = { maxFloor };
