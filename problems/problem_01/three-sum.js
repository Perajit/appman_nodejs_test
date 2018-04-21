const threeSum = (nums, target) => {
  const length = nums.length;
  let result = [];

  for (let i = 0; i < length; ++i) {
    let valI = nums[i];
    for (let j = i + 1; j < length; ++j) {
      let valJ = nums[j];
      for (let k = j + 1; k < length; ++k) {
        let valK = nums[k];

        if (valI + valJ + valK === target) {
          result.push([i, j, k]);
        }
      }
    }
  }

  return result;
};

module.exports = { threeSum };
