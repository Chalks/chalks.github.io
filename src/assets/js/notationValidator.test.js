import {
    removeDrawOffer,
    removeEnPassant,
    removeChecks,
    removeCastles,
    removePromotion,
    removeTo,
    removeCapture,
    removeFrom,
    removePiece,
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
        testParse = {...parseObj, notation: 'f5xe6'};
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

    it('removeChecks() ignores notations without checks', () => {
        let testParse = {...parseObj, notation: 'Nxd3'};
        let output = removeChecks(testParse);
        expect(output).toEqual(testParse);

        // malformed check
        testParse = {...parseObj, notation: 'Nxd3 + '};
        output = removeChecks(testParse);
        expect(output).toEqual(testParse);
    });

    it('removeChecks() removes the check notation', () => {
        let testParse = {...parseObj, notation: 'fxe6+'};
        let output = removeChecks(testParse);

        expect(output).toEqual({
            ...parseObj,
            notation: 'fxe6',
            check: true,
            checkmate: null,
        });

        testParse = {...parseObj, notation: 'fxe6++'};
        output = removeChecks(testParse);

        expect(output).toEqual({
            ...parseObj,
            notation: 'fxe6',
            check: null,
            checkmate: true,
        });

        testParse = {...parseObj, notation: 'fxe6#'};
        output = removeChecks(testParse);

        expect(output).toEqual({
            ...parseObj,
            notation: 'fxe6',
            check: null,
            checkmate: true,
        });
    });

    it('removeCastles() ignores notations without castles', () => {
        let testParse = {...parseObj, notation: 'Nxd3'};
        let output = removeCastles(testParse);
        expect(output).toEqual(testParse);

        // malformed check
        testParse = {...parseObj, notation: 'O-0'};
        output = removeCastles(testParse);
        expect(output).toEqual(testParse);
    });

    it('removeCastles() removes the castle notation', () => {
        let testParse = {...parseObj, notation: '0-0'};
        let output = removeCastles(testParse);

        expect(output).toEqual({
            ...parseObj,
            notation: '',
            kingsideCastle: true,
        });

        testParse = {...parseObj, notation: '0-0-0'};
        output = removeCastles(testParse);

        expect(output).toEqual({
            ...parseObj,
            notation: '',
            queensideCastle: true,
        });

        testParse = {...parseObj, notation: 'O-O'};
        output = removeCastles(testParse);

        expect(output).toEqual({
            ...parseObj,
            notation: '',
            kingsideCastle: true,
        });

        testParse = {...parseObj, notation: 'O-O-O'};
        output = removeCastles(testParse);

        expect(output).toEqual({
            ...parseObj,
            notation: '',
            queensideCastle: true,
        });
    });

    it('removePromotion() ignores notations without promotions', () => {
        let testParse = {...parseObj, notation: 'd8'};
        let output = removePromotion(testParse);
        expect(output).toEqual(testParse);

        // malformed check
        testParse = {...parseObj, notation: 'd8Q '};
        output = removePromotion(testParse);
        expect(output).toEqual(testParse);
    });

    it('removePromotion() removes the promotion notation', () => {
        const testParse = {...parseObj, notation: 'd8Q'};
        const output = removePromotion(testParse);

        expect(output).toEqual({
            ...parseObj,
            notation: 'd8',
            promotion: 'Queen',
        });
    });

    it('removeTo() ignores notations without tos', () => {
        let testParse = {...parseObj, notation: 'N'};
        let output = removeTo(testParse);
        expect(output).toEqual(testParse);

        // malformed check
        testParse = {...parseObj, notation: 'Nd5 '};
        output = removeTo(testParse);
        expect(output).toEqual(testParse);

        testParse = {...parseObj, notation: 'i9'};
        output = removeTo(testParse);
        expect(output).toEqual(testParse);
    });

    it('removeTo() removes the to notation', () => {
        let testParse = {...parseObj, notation: 'd8'};
        let output = removeTo(testParse);

        expect(output).toEqual({
            ...parseObj,
            notation: '',
            to: 'd8',
        });

        testParse = {...parseObj, notation: 'Kb1xa1'};
        output = removeTo(testParse);

        expect(output).toEqual({
            ...parseObj,
            notation: 'Kb1x',
            to: 'a1',
        });
    });

    it('removeCapture() ignores notations without captures', () => {
        let testParse = {...parseObj, notation: 'Nd5'};
        let output = removeCapture(testParse);
        expect(output).toEqual(testParse);

        // malformed check
        testParse = {...parseObj, notation: 'Ndx '};
        output = removeCapture(testParse);
        expect(output).toEqual(testParse);
    });

    it('removeCapture() removes the capture notation', () => {
        let testParse = {...parseObj, notation: 'Kc7x'};
        let output = removeCapture(testParse);

        expect(output).toEqual({
            ...parseObj,
            notation: 'Kc7',
            capture: true,
        });

        testParse = {...parseObj, notation: 'x'};
        output = removeCapture(testParse);

        expect(output).toEqual({
            ...parseObj,
            notation: '',
            capture: true,
        });
    });

    it('removeFrom() ignores notations without froms', () => {
        let testParse = {...parseObj, notation: 'N'};
        let output = removeFrom(testParse);
        expect(output).toEqual(testParse);

        // malformed check
        testParse = {...parseObj, notation: 'Kd4 '};
        output = removeFrom(testParse);
        expect(output).toEqual(testParse);
    });

    it('removeFrom() removes the from notation', () => {
        let testParse = {...parseObj, notation: 'Nc7'};
        let output = removeFrom(testParse);

        expect(output).toEqual({
            ...parseObj,
            notation: 'N',
            from: 'c7',
        });

        testParse = {...parseObj, notation: 'Nc'};
        output = removeFrom(testParse);

        expect(output).toEqual({
            ...parseObj,
            notation: 'N',
            from: 'c',
        });

        testParse = {...parseObj, notation: 'N7'};
        output = removeFrom(testParse);

        expect(output).toEqual({
            ...parseObj,
            notation: 'N',
            from: '7',
        });
    });

    it('removePiece() removes the piece notation', () => {
        let testParse = {...parseObj, notation: ''};
        let output = removePiece(testParse);

        expect(output).toEqual({
            ...parseObj,
            notation: '',
            piece: 'Pawn',
        });

        testParse = {...parseObj, notation: 'N'};
        output = removePiece(testParse);

        expect(output).toEqual({
            ...parseObj,
            notation: '',
            piece: 'Knight',
        });
    });
});


