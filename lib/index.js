async function myFunc() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return true;
}

module.exports = { myFunc };
