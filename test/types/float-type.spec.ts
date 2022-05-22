import { expect } from 'chai';
import { InvalidValueError } from '../../src/type-definitions';
import { floatType } from '../../src/types/float-type';


describe('#floatType', () => {

  describe('#validate', function () {

    [['123.5'], [] as string[]].forEach((testValue) => {
      it(`returns an error for array values "${JSON.stringify(testValue)}"`, function () {
        const validationResult = floatType.validate(testValue);

        expect(validationResult).to.equal('expected single value');
      });
    });

    ['', undefined].forEach((testValue) => {
      it(`returns error for missing values like"${JSON.stringify(testValue)}"`, function () {
        const validationResult = floatType.validate(testValue);

        expect(validationResult).to.equal('value missing');
      });
    });

    ['not a float'].forEach((testValue) => {
      it(`returns error for invalid values like"${JSON.stringify(testValue)}"`, function () {
        const validationResult = floatType.validate(testValue);

        expect(validationResult).to.equal('Not valid float value');
      });
    });


    it('should not return error for a valid value', function () {
      const validationResult = floatType.validate('123.05');

      expect(validationResult).to.equal(undefined);
    });

  });

  describe('#parse', () => {

    [['123.45'], '', [] as string[], undefined].forEach((testValue) => {
      it(`throws error if value is not valid like ${JSON.stringify(testValue)}`, function () {

        expect(() => floatType.parse(testValue)).to.throw(InvalidValueError, 'cannot parse invalid value');

      });
    });


    it('should return the parsed value if the raw value is valid', function () {
      const expectedValue = '123.45';

      const parsedValue = floatType.parse(expectedValue);

      expect(parsedValue).to.equal(123.45);
    });

  });
});
