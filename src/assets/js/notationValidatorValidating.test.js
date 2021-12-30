import {
    pieces,
    isValidParsedNotation,
    isValidNotation,
    parseNotation,
    isValidDraw,
    isValidEnPassant,
    isValidCheck,
    isValidPromotion,
    isValidCapture,
    isValidMove,
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

    it('isValidEnPassant() validates en passant', () => {
        let parseObj = parseNotation({notation: 'xe6 e.p.'});
        expect(isValidEnPassant(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'd5xe6 e.p.'});
        expect(isValidEnPassant(parseObj)).toBe(true);
    });

    it('isValidEnPassant() rejects invalid en passants', () => {
        // note, does NOT check to make sure the move itself is valid

        // castles aren't en passant
        let parseObj = parseNotation({notation: '0-0-0 e.p.'});
        expect(isValidEnPassant(parseObj)).toBe(false);

        // only pawns can en passant
        parseObj = parseNotation({notation: 'Nxe6 e.p.'});
        expect(isValidEnPassant(parseObj)).toBe(false);

        // pawns can only en passant on the 6th and 3rd rank
        parseObj = parseNotation({notation: 'xe7 e.p.'});
        expect(isValidEnPassant(parseObj)).toBe(false);

        // en passant must be a capture
        parseObj = parseNotation({notation: 'e6 e.p.'});
        expect(isValidEnPassant(parseObj)).toBe(false);
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

    it('isValidPromotion() validates promotion', () => {
        let parseObj = parseNotation({notation: 'e8Q'});
        expect(isValidPromotion(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'xe8Q'});
        expect(isValidPromotion(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'xe8K++'});
        expect(isValidPromotion(parseObj)).toBe(true);
    });

    it('isValidPromotion() rejects invalid promotion', () => {
        // can only promote on the 8th or 1st rank
        let parseObj = parseNotation({notation: 'e7Q'});
        expect(isValidPromotion(parseObj)).toBe(false);

        parseObj = parseNotation({notation: 'a2Q'});
        expect(isValidPromotion(parseObj)).toBe(false);

        // can't promote to a pawn
        parseObj = parseNotation({notation: 'e7P'});
        expect(isValidPromotion(parseObj)).toBe(false);

        // only pawns can promote
        parseObj = parseNotation({notation: 'Ne8Q'});
        expect(isValidPromotion(parseObj)).toBe(false);
    });

    it('isValidCapture() validates captures', () => {
        let parseObj = parseNotation({notation: 'Nxd4'});
        expect(isValidCapture(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'Kh7xh8'});
        expect(isValidCapture(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'Rd3xd4'});
        expect(isValidCapture(parseObj)).toBe(true);
    });

    it('isValidCapture() rejects invalid captures', () => {
        // pawns can't capture by moving straight ahead
        let parseObj = parseNotation({notation: 'd3xd4'});
        expect(isValidCapture(parseObj)).toBe(false);

        parseObj = parseNotation({notation: 'dxd4'});
        expect(isValidCapture(parseObj)).toBe(false);
    });

    it('isValidMove() handles universal cases', () => {
        // a piece can't move to its own square
        let parseObj = parseNotation({notation: 'a1a1'});
        expect(isValidMove(parseObj)).toBe(false);

        // if we don't know where the piece came from, it's always a valid move
        // ignoring en passant and promotions etc because validated above
        parseObj = parseNotation({notation: 'a1'});
        expect(isValidMove(parseObj)).toBe(true);

        // if we don't have a destination it's invalid
        parseObj = parseNotation({notation: 'Nd3x'});
        expect(isValidMove(parseObj)).toBe(false);
    });

    it('isValidMove() validates kings', () => {
        // valid moves
        let parseObj = parseNotation({notation: 'Kd4'});
        expect(isValidMove(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'Kd3d4'});
        expect(isValidMove(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'Kd3e2'});
        expect(isValidMove(parseObj)).toBe(true);

        // invalid moves
        parseObj = parseNotation({notation: 'Kd3e8'});
        expect(isValidMove(parseObj)).toBe(false);

        parseObj = parseNotation({notation: 'Kd3d8'});
        expect(isValidMove(parseObj)).toBe(false);

        parseObj = parseNotation({notation: 'Kd3h3'});
        expect(isValidMove(parseObj)).toBe(false);

        // partially known froms that are valid
        parseObj = parseNotation({notation: 'Kdd3'});
        expect(isValidMove(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'Kde3'});
        expect(isValidMove(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'Kdc3'});
        expect(isValidMove(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'K3b2'});
        expect(isValidMove(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'K3e3'});
        expect(isValidMove(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'K3a4'});
        expect(isValidMove(parseObj)).toBe(true);

        // partially known froms that are invalid
        parseObj = parseNotation({notation: 'Kdf3'});
        expect(isValidMove(parseObj)).toBe(false);

        parseObj = parseNotation({notation: 'K3f5'});
        expect(isValidMove(parseObj)).toBe(false);
    });

    it('isValidMove() validates queens', () => {
        // valid moves
        // diagonal
        let parseObj = parseNotation({notation: 'Qd4'});
        expect(isValidMove(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'Qb2d4'});
        expect(isValidMove(parseObj)).toBe(true);

        // horizontal
        parseObj = parseNotation({notation: 'Qb2d2'});
        expect(isValidMove(parseObj)).toBe(true);

        // invalid moves
        parseObj = parseNotation({notation: 'Qb2c4'});
        expect(isValidMove(parseObj)).toBe(false);

        parseObj = parseNotation({notation: 'Qb2c5'});
        expect(isValidMove(parseObj)).toBe(false);

        parseObj = parseNotation({notation: 'Qb2f5'});
        expect(isValidMove(parseObj)).toBe(false);
    });

    it('isValidMove() validates rooks', () => {
        // rooks can move along ranks/files
        let parseObj = parseNotation({notation: 'Rd4'});
        expect(isValidMove(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'Ra1a8'});
        expect(isValidMove(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'Ra1h1'});
        expect(isValidMove(parseObj)).toBe(true);

        // can't move diagonally
        parseObj = parseNotation({notation: 'Ra8h1'});
        expect(isValidMove(parseObj)).toBe(false);

        // is always valid if we don't have full information
        parseObj = parseNotation({notation: 'Rah1'});
        expect(isValidMove(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'R8h1'});
        expect(isValidMove(parseObj)).toBe(true);
    });

    it('isValidMove() validates bishops', () => {
        // valid moves
        let parseObj = parseNotation({notation: 'Bd4'});
        expect(isValidMove(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'Ba1h8'});
        expect(isValidMove(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'Bh1a8'});
        expect(isValidMove(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'Bd3f1'});
        expect(isValidMove(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'Bg7f8'});
        expect(isValidMove(parseObj)).toBe(true);

        // illegal moves
        parseObj = parseNotation({notation: 'Bb5d2'});
        expect(isValidMove(parseObj)).toBe(false);

        parseObj = parseNotation({notation: 'Bb2d2'});
        expect(isValidMove(parseObj)).toBe(false);

        // not fully known moves, always valid as long as not same rank/file
        parseObj = parseNotation({notation: 'Baf8'});
        expect(isValidMove(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'B7f8'});
        expect(isValidMove(parseObj)).toBe(true);

        // illegal not-fully-known moves
        parseObj = parseNotation({notation: 'Baa8'});
        expect(isValidMove(parseObj)).toBe(false);

        parseObj = parseNotation({notation: 'B7f7'});
        expect(isValidMove(parseObj)).toBe(false);
    });

    it('isValidMove() validates knights', () => {
        // valid moves
        let parseObj = parseNotation({notation: 'Nd4'});
        expect(isValidMove(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'Nd4f5'});
        expect(isValidMove(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'Ne4d2'});
        expect(isValidMove(parseObj)).toBe(true);

        parseObj = parseNotation({notation: 'Ne4c3'});
        expect(isValidMove(parseObj)).toBe(true);

        // illegal moves
        parseObj = parseNotation({notation: 'Ne4f3'});
        expect(isValidMove(parseObj)).toBe(false);

        parseObj = parseNotation({notation: 'Ne4e4'});
        expect(isValidMove(parseObj)).toBe(false);

        parseObj = parseNotation({notation: 'Ne4g6'});
        expect(isValidMove(parseObj)).toBe(false);
    });

    it('isValid() validates ', () => {
        // TODO
    });

    it('isValid() rejects invalid ', () => {
        // TODO
    });
});

