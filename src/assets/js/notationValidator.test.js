import {
    removeDrawOffer,
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
        const testParse = {...parseObj, notation: 'Nxd3'};
        const output = removeDrawOffer(testParse);
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
});


