import { expect } from 'chai';
import { dateType } from '../../src/types/date-type';


describe('#dateType', () => {

  describe('#validate', function () {

    ['not a date', ['not a date'], '12123', ['12123']].forEach((testValue) => {
      it(`should return an error if the value is "${testValue}"`, function () {
        const validationResult = dateType.validate(testValue);

        expect(validationResult).to.equal('Not valid date value');
      });
    });

    ['', [] as string[], undefined].forEach((testValue) => {
      it(`should return an error if the value is "${testValue}"`, function () {
        const validationResult = dateType.validate(testValue);

        expect(validationResult).to.equal('value missing');
      });
    });


    it('should not return error for a valid date', function () {
      const validationResult = dateType.validate(new Date().toISOString());

      expect(validationResult).to.equal(undefined);
    });

  });


});
