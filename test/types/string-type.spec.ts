import { expect } from 'chai';
import { InvalidValueError } from '../../src/type-definitions';
import { stringType } from '../../src/types/string-type';


describe('#stringType', () => {

  describe('#validate', function () {

    [['not single item'], [] as string[]].forEach((testValue) => {
      it(`returns an error for array values "${JSON.stringify(testValue)}"`, function () {
        const validationResult = stringType.validate(testValue);

        expect(validationResult).to.equal('expected single value');
      });
    });

    ['', undefined].forEach((testValue) => {
      it(`returns error for missing values like"${JSON.stringify(testValue)}"`, function () {
        const validationResult = stringType.validate(testValue);

        expect(validationResult).to.equal('value missing');
      });
    });


    it('should not return error for a valid string', function () {
      const validationResult = stringType.validate('valid str');

      expect(validationResult).to.equal(undefined);
    });

  });

  describe('#parse', () => {

    [['an array'], '', [] as string[], undefined].forEach((testValue) => {
      it('should throw an error if the value is not a valid value', function () {

        expect(() => stringType.parse(testValue)).to.throw(InvalidValueError, 'cannot parse invalid value');

      });
    });


    it('should return the parsed value if the raw value is valid', function () {
      const expectedValue = 'str value';

      const parsedValue = stringType.parse(expectedValue);

      expect(parsedValue).to.equal(expectedValue);
    });

  });
});
