import { createOptionalType } from '../../src/types/optional-type';
import { intType } from '../../src/types/int-type';
import { expect } from 'chai';

describe('#createOptionalType', () => {

  const optionalInt = createOptionalType(intType);

  describe('#validate', () => {
    ['', undefined, []].forEach((testValue) => {
      it(`returns no error for empty types like ${JSON.stringify(testValue)}`, function () {

        const error = optionalInt.validate(testValue);

        expect(error).to.be.undefined;
      });
    });


    ['1234.5', 'not an int'].forEach((testValue) => {
      it(`returns error for underlying type for ${JSON.stringify(testValue)}`, function () {
        const error = optionalInt.validate(testValue);

        expect(error).to.equal('Not valid int value');
      });
    });

  });

  describe('#parse', () => {
    ['', undefined, []].forEach((testValue) => {
      it(`returns null for values like ${JSON.stringify(testValue)}`, function () {

        const parsed = optionalInt.parse(testValue);

        expect(parsed).to.be.null;
      });
    });

    it(`returns parsed value by underlying type`, function () {
      const parsed = optionalInt.parse('1234');

      expect(parsed).to.equal(1234);
    });

  });

});
