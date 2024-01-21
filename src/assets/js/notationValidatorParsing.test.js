import {
    beforeEach,
    describe,
    expect,
    it,
} from 'vitest';

import {
    pieces,
    parseNotation,
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

describe('assets/js/notationValidator.js test parse function', () => {
    let parseObj;

    beforeEach(() => {
        parseObj = {
            notation: null,

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

            notationAfterParsing: null,
        };
    });

    it.skip('parseNotation() calls helpers in order', () => {
        // TODO
    });

    it('parseNotation() handles common happy paths', () => {
        let output = parseNotation({notation: 'd4'});
        expect(output).toEqual({
            ...parseObj,
            piece: pieces.english.P,
            to: 'd4',
            notation: 'd4',
            notationAfterParsing: '',
        });

        output = parseNotation({notation: 'Qd4'});
        expect(output).toEqual({
            ...parseObj,
            piece: pieces.english.Q,
            to: 'd4',
            notation: 'Qd4',
            notationAfterParsing: '',
        });

        output = parseNotation({notation: 'Qd3d4'});
        expect(output).toEqual({
            ...parseObj,
            piece: pieces.english.Q,
            from: 'd3',
            to: 'd4',
            notation: 'Qd3d4',
            notationAfterParsing: '',
        });

        output = parseNotation({notation: 'Qd3xd4'});
        expect(output).toEqual({
            ...parseObj,
            piece: pieces.english.Q,
            from: 'd3',
            to: 'd4',
            capture: true,
            notation: 'Qd3xd4',
            notationAfterParsing: '',
        });

        output = parseNotation({notation: 'Qd3xd4+'});
        expect(output).toEqual({
            ...parseObj,
            piece: pieces.english.Q,
            from: 'd3',
            to: 'd4',
            capture: true,
            check: true,
            notation: 'Qd3xd4+',
            notationAfterParsing: '',
        });

        output = parseNotation({notation: 'Qd3xd4++'});
        expect(output).toEqual({
            ...parseObj,
            piece: pieces.english.Q,
            from: 'd3',
            to: 'd4',
            capture: true,
            checkmate: true,
            notation: 'Qd3xd4++',
            notationAfterParsing: '',
        });

        output = parseNotation({notation: 'Qd3xd4+ (=)'});
        expect(output).toEqual({
            ...parseObj,
            piece: pieces.english.Q,
            from: 'd3',
            to: 'd4',
            capture: true,
            check: true,
            offeredDraw: true,
            notation: 'Qd3xd4+ (=)',
            notationAfterParsing: '',
        });

        output = parseNotation({notation: 'd7xe8Q'});
        expect(output).toEqual({
            ...parseObj,
            piece: pieces.english.P,
            from: 'd7',
            to: 'e8',
            capture: true,
            promotion: pieces.english.Q,
            notation: 'd7xe8Q',
            notationAfterParsing: '',
        });

        output = parseNotation({notation: 'e5xf6 e.p.'});
        expect(output).toEqual({
            ...parseObj,
            piece: pieces.english.P,
            from: 'e5',
            to: 'f6',
            capture: true,
            enPassant: true,
            notation: 'e5xf6 e.p.',
            notationAfterParsing: '',
        });

        output = parseNotation({notation: '0-0 (=)'});
        expect(output).toEqual({
            ...parseObj,
            piece: pieces.english.P, // a quirk of the parsing
            kingsideCastle: true,
            offeredDraw: true,
            notation: '0-0 (=)',
            notationAfterParsing: '',
        });

        output = parseNotation({notation: '0-0-0'});
        expect(output).toEqual({
            ...parseObj,
            piece: pieces.english.P, // a quirk of the parsing
            queensideCastle: true,
            notation: '0-0-0',
            notationAfterParsing: '',
        });
    });
});

describe('assets/js/notationValidator.js test parse helpers', () => {
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

            notationAfterParsing: null,
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

        testParse = {...parseObj, notation: 'O-OQ'};
        output = removeCastles(testParse);
        expect(output).toEqual(testParse);

        testParse = {...parseObj, notation: 'NO-O'};
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
        let testParse = {...parseObj, notation: 'd8Q'};
        let output = removePromotion(testParse);

        expect(output).toEqual({
            ...parseObj,
            notation: 'd8',
            promotion: pieces.english.Q,
        });

        testParse = {...parseObj, notation: 'd8=Q'};
        output = removePromotion(testParse);

        expect(output).toEqual({
            ...parseObj,
            notation: 'd8',
            promotion: pieces.english.Q,
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
            piece: pieces.english.P,
        });

        testParse = {...parseObj, notation: 'N'};
        output = removePiece(testParse);

        expect(output).toEqual({
            ...parseObj,
            notation: '',
            piece: pieces.english.N,
        });
    });
});


