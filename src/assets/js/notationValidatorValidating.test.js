import {
    pieces,
    isValidParsedNotation,
    isValidNotation,
    parseNotation,
    isValidDraw,
    isValidCheck,
} from './notationValidator.js';

describe('assets/js/notationValidator.js test validation function', () => {
    it.skip('isValidParsedNotation() calls helpers in order', () => {
        // TODO
    });

    it.skip('isValidNotation() uses parseNotation() and isValidParsedNotation() accurately', () => {
        // TODO
    });
});

describe('assets/js/notationValidator.js test validation helpers', () => {
    it('isValidDraw() validates draw offers', () => {
        const parseObj = parseNotation({notation: 'h8xa1Q (=)'}); // lol
        expect(isValidDraw(parseObj)).toBe(true);
    });

    it('isValidDraw() rejects draw offers that include a checkmate', () => {
        let parseObj = parseNotation({notation: 'd5++ (=)'});
        expect(isValidDraw(parseObj)).toBe(false);

        parseObj = parseNotation({notation: 'd5# (=)'});
        expect(isValidDraw(parseObj)).toBe(false);
    });

    it.skip('isValidEnPassant() validates en passant', () => {
        // TODO
    });

    it.skip('isValidEnPassant() rejects invalid en passants', () => {
        // TODO
    });

    it('isValidCheck() validates checks', () => {
        let parseObj = parseNotation({notation: 'd5+'});
        expect(isValidCheck(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'd5++'});
        expect(isValidCheck(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'd5#'});
        expect(isValidCheck(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'Ne7xd5+'});
        expect(isValidCheck(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'Ne7xd5++'});
        expect(isValidCheck(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'Ne7xd5#'});
        expect(isValidCheck(parseObj)).toBe(true);

        // this only checks that a check was made, it does not check for the `to` to exist
        parseObj = parseNotation({notation: '+ (=)'});
        expect(isValidCheck(parseObj)).toBe(true);
    });

    it('isValidCheck() rejects invalid king move discovered checks', () => {
        // the only checks that we can absolutely invalidate are king moves that
        // could never actually result in a check. Note that a bishop moving into
        // a corner could result in a discovered check.

        // moving along an outside edge can't result in a check
        let parseObj = parseNotation({notation: 'Ka2a3+'});
        expect(isValidCheck(parseObj)).toBe(false);

        parseObj = parseNotation({notation: 'Kh5h6+'});
        expect(isValidCheck(parseObj)).toBe(false);

        parseObj = parseNotation({notation: 'Kd1e1+'});
        expect(isValidCheck(parseObj)).toBe(false);

        parseObj = parseNotation({notation: 'Kd8e8+'});
        expect(isValidCheck(parseObj)).toBe(false);

        // moving from a corner can't result in a check
        parseObj = parseNotation({notation: 'Ka1b2+'});
        expect(isValidCheck(parseObj)).toBe(false);

        parseObj = parseNotation({notation: 'Kh1g2+'});
        expect(isValidCheck(parseObj)).toBe(false);

        parseObj = parseNotation({notation: 'Ka8b7+'});
        expect(isValidCheck(parseObj)).toBe(false);

        parseObj = parseNotation({notation: 'Kh8g7+'});
        expect(isValidCheck(parseObj)).toBe(false);

        // all other king moves can result in a check
        parseObj = parseNotation({notation: 'Kc1b2+'});
        expect(isValidCheck(parseObj)).toBe(true);
    });

    it('isValid() validates ', () => {
        // TODO
    });

    it('isValid() rejects invalid ', () => {
        // TODO
    });
});

