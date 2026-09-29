function isPrime(num) {
  if (!Number.isInteger(num) || num < 2) {
    return false;
  }

  for (let divisor = 2; divisor * divisor <= num; divisor++) {
    if (num % divisor === 0) {
      return false;
    }
  }

  return true;
}

module.exports = { isPrime };
