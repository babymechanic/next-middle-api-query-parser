import { expect } from 'chai';
import { dateType } from '../../src/types/date-type';
import { InvalidValueError } from '../../src/type-definitions';


describe('#dateType', () => {

  describe('#validate', function () {

    ['not a date', '12123' ].forEach((testValue) => {
      it(`returns an error for invalid values like "${JSON.stringify(testValue)}"`, function () {
        const validationResult = dateType.validate(testValue);

        expect(validationResult).to.equal('Not valid date value');
      });
    });

    [['not a date'], ['12123'], [] as string[]].forEach((testValue) => {
      it(`returns an error for array values "${JSON.stringify(testValue)}"`, function () {
        const validationResult = dateType.validate(testValue);

        expect(validationResult).to.equal('expected single value');
      });
    });

    ['',  undefined].forEach((testValue) => {
      it(`returns error for missing values like"${JSON.stringify(testValue)}"`, function () {
        const validationResult = dateType.validate(testValue);

        expect(validationResult).to.equal('value missing');
      });
    });


    it('should not return error for a valid date', function () {
      const validationResult = dateType.validate(new Date().toISOString());

      expect(validationResult).to.equal(undefined);
    });

  });

  describe('#parse', () => {

    ['not a date', ['not a date'], '12123', ['12123'], '', [] as string[], undefined].forEach((testValue) => {
      it(`throws error if value is not valid like ${JSON.stringify(testValue)}`, function () {

        expect(() => dateType.parse(testValue)).to.throw(InvalidValueError, 'cannot parse invalid value');

      });
    });


    it('should return the parsed value if the raw value is valid', function () {
      const expectedDate = new Date();

      const actualDate = dateType.parse(expectedDate.toISOString()) as Date;

      expect(actualDate.getTime()).to.equal(expectedDate.getTime());
    });

  });
});
