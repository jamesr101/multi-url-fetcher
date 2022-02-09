const {
  test, expect,
} = require('@jest/globals');

test('confirm tests are running', () => {
  expect(1 + 2).toBe(3);
});
