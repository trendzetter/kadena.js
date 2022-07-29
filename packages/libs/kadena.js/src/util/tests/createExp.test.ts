import { createExp } from '../createExp';
import { PactNumber } from '../PactNumber';

test('Takes in Pact function and arguments and outputs Pact code', () => {
  const actual = createExp('+', 2, 3);
  const expected = '(+ 2 3)';

  expect(expected).toEqual(actual);
});

test('Takes in Pact function and arguments using PactNumber and outputs Pact code', () => {
  const actual = createExp(
    '+',
    new PactNumber('2').toInteger(),
    new PactNumber('3').toDecimal(),
  );
  console.log(actual);
  const expected = '(+ 2 3.0)';

  expect(expected).toEqual(actual);
});

test('Takes in Pact function and stringified number arguments using PactNumber and outputs Pact code', () => {
  const actual = createExp(
    '+',
    new PactNumber('2').toStringifiedInteger(),
    new PactNumber('3').toStringifiedDecimal(),
  );
  console.log(actual);
  const expected = '(+ "2" "3.0")';

  expect(expected).toEqual(actual);
});
