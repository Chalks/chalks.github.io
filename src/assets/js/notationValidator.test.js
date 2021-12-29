import {
    removeDrawOffer,
    removeEnPassant,
} from './notationValidator.js';

describe('assets/js/notationValidator.js parsing tests', () => {
    let parseObj;

    beforeEach(() => {
        parseObj = {
            notation: null, // each test changes this value

            language: 'english',

            offeredDraw: null,
            enPassant: null,
            check: null,
            checkmate: null,

            queensideCastle: null,
            kingsideCastle: null,

            promotion: null,

            to: null,
            capture: null,
            from: null,

            piece: null,

            notationAfterParse: null,
        };
    });

    it('removeDrawOffer() ignores notations without a draw offer', () => {
        let testParse = {...parseObj, notation: 'Nxd3'};
        let output = removeDrawOffer(testParse);
        expect(output).toEqual(testParse);

        // malformed draw offer
        testParse = {...parseObj, notation: 'Nxd3(=)'};
        output = removeDrawOffer(testParse);
        expect(output).toEqual(testParse);
    });

    it('removeDrawOffer() removes the draw offer notation', () => {
        const testParse = {...parseObj, notation: 'Nxd3 (=)'};
        const output = removeDrawOffer(testParse);

        expect(output).toEqual({
            ...parseObj,
            notation: 'Nxd3',
            offeredDraw: true,
        });
    });

    it('removeEnPassant() ignores notations without an en passant', () => {
        let testParse = {...parseObj, notation: 'Nxd3'};
        let output = removeEnPassant(testParse);
        expect(output).toEqual(testParse);

        // malformed draw offer
        testParse = {...parseObj, notation: 'Nxd3e.p.'};
        output = removeEnPassant(testParse);
        expect(output).toEqual(testParse);

        // en passant, but not marked as such
        testParse = {...parseObj, notation: 'fxe6'};
        output = removeEnPassant(testParse);
        expect(output).toEqual(testParse);
    });

    it('removeEnPassant() removes the en passant notation', () => {
        const testParse = {...parseObj, notation: 'fxe6 e.p.'};
        const output = removeEnPassant(testParse);

        expect(output).toEqual({
            ...parseObj,
            notation: 'fxe6',
            enPassant: true,
        });
    });
});


