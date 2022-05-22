import { expect } from 'chai';
import { InvalidValueError } from '../../src/type-definitions';
import { intType } from '../../src/types/int-type';


describe('#intType', () => {

  describe('#validate', function () {

    [['123'], [] as string[]].forEach((testValue) => {
      it(`returns an error for array values "${JSON.stringify(testValue)}"`, function () {
        const validationResult = intType.validate(testValue);

        expect(validationResult).to.equal('expected single value');
      });
    });

    ['', undefined].forEach((testValue) => {
      it(`returns error for missing values like"${JSON.stringify(testValue)}"`, function () {
        const validationResult = intType.validate(testValue);

        expect(validationResult).to.equal('value missing');
      });
    });

    ['123.45', 'not an int'].forEach((testValue) => {
      it(`returns error for invalid values like"${JSON.stringify(testValue)}"`, function () {
        const validationResult = intType.validate(testValue);

        expect(validationResult).to.equal('Not valid int value');
      });
    });


    it('should not return error for a valid value', function () {
      const validationResult = intType.validate('123');

      expect(validationResult).to.equal(undefined);
    });

  });

  describe('#parse', () => {

    [['123.45'], '', [] as string[], undefined].forEach((testValue) => {
      it(`throws error if value is not valid like ${JSON.stringify(testValue)}`, function () {

        expect(() => intType.parse(testValue)).to.throw(InvalidValueError, 'cannot parse invalid value');

      });
    });


    it('should return the parsed value if the raw value is valid', function () {
      const expectedValue = '123';

      const parsedValue = intType.parse(expectedValue);

      expect(parsedValue).to.equal(123);
    });

  });
});
