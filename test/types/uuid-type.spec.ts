import { expect } from 'chai';
import { InvalidValueError } from '../../src/type-definitions';
import { uuidType } from '../../src/types/uuid-type';


describe('#uuidType', () => {

  describe('#validate', function () {

    [['8637cdfc-325e-479d-b05c-ba79f617d251'], [] as string[]].forEach((testValue) => {
      it(`returns an error for array values "${JSON.stringify(testValue)}"`, function () {
        const validationResult = uuidType.validate(testValue);

        expect(validationResult).to.equal('expected single value');
      });
    });

    ['', undefined].forEach((testValue) => {
      it(`returns error for missing values like"${JSON.stringify(testValue)}"`, function () {
        const validationResult = uuidType.validate(testValue);

        expect(validationResult).to.equal('value missing');
      });
    });

    ['not a uuid'].forEach((testValue) => {
      it(`returns error for invalid values like"${JSON.stringify(testValue)}"`, function () {
        const validationResult = uuidType.validate(testValue);

        expect(validationResult).to.equal('Not a valid uuid');
      });
    });


    it('should not return error for a valid value', function () {
      const validationResult = uuidType.validate('8637cdfc-325e-479d-b05c-ba79f617d251');

      expect(validationResult).to.equal(undefined);
    });

  });

  describe('#parse', () => {

    [['8637cdfc-325e-479d-b05c-ba79f617d251'], 'not a uuid', '', [] as string[], undefined].forEach((testValue) => {
      it(`throws error if value is not valid like ${JSON.stringify(testValue)}`, function () {

        expect(() => uuidType.parse(testValue)).to.throw(InvalidValueError, 'cannot parse invalid value');

      });
    });


    it('should return the parsed value if the raw value is valid', function () {
      const expectedValue = '8637cdfc-325e-479d-b05c-ba79f617d251';

      const parsedValue = uuidType.parse(expectedValue);

      expect(parsedValue).to.equal(expectedValue);
    });

  });
});
