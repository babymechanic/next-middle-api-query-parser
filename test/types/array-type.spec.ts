import { intType } from '../../src/types/int-type';
import { expect } from 'chai';
import { createArrayType } from '../../src/types/array-type';

describe('#createArrayType', () => {

  const arrayOfInt = createArrayType(intType);

  describe('#validate', () => {
    ['', undefined, []].forEach((testValue) => {
      it(`returns error for empty types like ${JSON.stringify(testValue)}`, function () {

        const error = arrayOfInt.validate(testValue);

        expect(error).to.equal('value missing');
      });
    });


    ['1234.5', 'not an int', ['1234.5'], ['not an int']].forEach((testValue) => {
      it(`returns error for underlying type for ${JSON.stringify(testValue)}`, function () {
        const error = arrayOfInt.validate(testValue);

        expect(error).to.eq('Not valid int value');
      });
    });

  });

  describe('#parse', () => {

    it(`returns parsed value by underlying type`, function () {
      const parsed = arrayOfInt.parse('1234');

      expect(parsed).to.eql([1234]);
    });

  });

});
