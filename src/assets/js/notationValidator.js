const KING = 'King';
const QUEEN = 'Queen';
const ROOK = 'Rook';
const BISHOP = 'Bishop';
const KNIGHT = 'Knight';
const PAWN = 'Pawn';

export const pieces = {
    english: {
        K: KING, Q: QUEEN, R: ROOK, B: BISHOP, N: KNIGHT, P: PAWN,
    },
};

export const removeDrawOffer = (parseObj) => {
    if (parseObj.notation.endsWith(' (=)')) {
        return {
            ...parseObj,
            offeredDraw: true,
            notation: parseObj.notation.slice(0, -4),
        };
    }

    return parseObj;
};

export const removeEnPassant = (parseObj) => {
    if (parseObj.notation.endsWith(' e.p.')) {
        return {
            ...parseObj,
            enPassant: true,
            notation: parseObj.notation.slice(0, -5),
        };
    }

    return parseObj;
};

export const removeChecks = (parseObj) => {
    if (parseObj.notation.endsWith('++')) {
        return {
            ...parseObj,
            checkmate: true,
            notation: parseObj.notation.slice(0, -2),
        };
    }

    if (parseObj.notation.endsWith('#')) {
        return {
            ...parseObj,
            checkmate: true,
            notation: parseObj.notation.slice(0, -1),
        };
    }

    if (parseObj.notation.endsWith('+')) {
        return {
            ...parseObj,
            check: true,
            notation: parseObj.notation.slice(0, -1),
        };
    }

    return parseObj;
};

export const removeCastles = (parseObj) => {
    if (parseObj.notation === '0-0-0' || parseObj.notation === 'O-O-O') {
        return {
            ...parseObj,
            queensideCastle: true,
            notation: '',
        };
    }

    if (parseObj.notation === '0-0' || parseObj.notation === 'O-O') {
        return {
            ...parseObj,
            kingsideCastle: true,
            notation: '',
        };
    }

    return parseObj;
};

export const removePromotion = (parseObj) => {
    const possiblePiece = parseObj.notation.slice(-1);
    const hasEqual = parseObj.notation.slice(-2, -1) === '=';

    if (pieces[parseObj.language][possiblePiece]) {
        const notation = hasEqual
            ? parseObj.notation.slice(0, -2)
            : parseObj.notation.slice(0, -1);

        return {
            ...parseObj,
            promotion: pieces[parseObj.language][possiblePiece],
            notation,
        };
    }

    return parseObj;
};

export const removeTo = (parseObj) => {
    // must always have full destination
    if (/[a-h][1-8]$/.exec(parseObj.notation)) {
        return {
            ...parseObj,
            to: parseObj.notation.slice(-2),
            notation: parseObj.notation.slice(0, -2),
        };
    }

    return parseObj;
};

export const removeCapture = (parseObj) => {
    if (parseObj.notation.endsWith('x')) {
        return {
            ...parseObj,
            capture: true,
            notation: parseObj.notation.slice(0, -1),
        };
    }

    return parseObj;
};

export const removeFrom = (parseObj) => {
    if (/[a-h][1-8]$/.exec(parseObj.notation)) {
        return {
            ...parseObj,
            from: parseObj.notation.slice(-2),
            notation: parseObj.notation.slice(0, -2),
        };
    }

    if (/([a-h]$)|([1-8]$)/.exec(parseObj.notation)) {
        // if we don't have full 'from' info
        return {
            ...parseObj,
            from: parseObj.notation.slice(-1),
            notation: parseObj.notation.slice(0, -1),
        };
    }

    return parseObj;
};

export const removePiece = (parseObj) => {
    if (pieces[parseObj.language][parseObj.notation]) {
        return {
            ...parseObj,
            piece: pieces[parseObj.language][parseObj.notation],
            notation: parseObj.notation.slice(0, -1),
        };
    }

    return {
        ...parseObj,
        piece: PAWN,
    };
};

export const isValidDraw = ({offeredDraw, checkmate}) => {
    if (offeredDraw && checkmate) {
        // can't offer a draw after a checkmate
        return false;
    }

    return true;
};

export const isValidEnPassant = ({
    enPassant,
    queensideCastle,
    kingsideCastle,
    to,
    piece,
    capture,
}) => {
    if (!enPassant) return true;

    // castles aren't en passant
    if (queensideCastle || kingsideCastle) return false;

    // only pawns can en passant
    if (piece !== PAWN) return false;

    if (!to) return false;

    // must be 6th or 3rd rank
    if (!to.endsWith(6) && !to.endsWith(3)) return false;

    // must be a capture
    if (!capture) return false;

    return true;
};

export const isValidCheck = ({
    check,
    checkmate,
    from,
    to,
    queensideCastle,
    kingsideCastle,
    piece,
}) => {
    // there's no move that MUST result in a check
    if (!check && !checkmate) return true;

    // if we don't know where the move is from, there's no move that couldn't
    // at least be a discovered check. At least, not that we can tell.
    if (!from) return true;

    // If we don't know where the move is to, the only way for it to be valid is
    // if it's a castle
    if (!to && (!queensideCastle || !kingsideCastle)) return false;

    if (piece === KING) {
        // king moves can't cause a discovered check if we're moving along
        // the edge of the board.
        if ((from.startsWith('a') && to.startsWith('a'))
            || (from.startsWith('h') && to.startsWith('h'))
            || (from.endsWith('1') && to.endsWith('1'))
            || (from.endsWith('8') && to.endsWith('8'))) {
            return false;
        }

        // if the king is in a corner, it can't cause a discovered check
        // no matter where it moves
        if (from === 'a8'
            || from === 'h8'
            || from === 'a1'
            || from === 'h1') {
            return false;
        }
    }

    // all other moves could cause a check
    return true;
};

export const isValidPromotion = ({
    to,
    piece,
    promotion,
}) => {
    if (!promotion) return true;

    // you can't promote to a pawn
    if (promotion === PAWN) return false;

    // must have to
    if (!to) return false;

    // can only promote on the 8th or 1st rank
    if (!to.endsWith(8) && !to.endsWith(1)) return false;

    // only pawns can promote
    if (piece !== PAWN) return false;

    // every other case is valid
    return true;
};

export const isValidCapture = ({
    from,
    to,
    capture,
    piece,
}) => {
    // all valid moves could be a valid capture with the exception of some pawn moves
    // so we can rely on `isValidMove` for everything except those pawn moves this
    // function therefore only checks for pawn moves that couldn't be a capture.
    if (from && to && capture && piece === PAWN) {
        if (from.startsWith(to.charAt(0))) {
            return false;
        }
    }

    return true;
};

export const isValidMove = ({
    from,
    to,
    promotion,
    capture,
    queensideCastle,
    kingsideCastle,
    piece,
}) => {
    if (queensideCastle || kingsideCastle) return true;

    // we must know where it went to
    if (!to) return false;

    // a piece can never move to the same space it came from
    if (from === to) return false;

    const fileTo = to.charCodeAt(0); // character codes are easier to work with
    const rankTo = Number.parseInt(to.charAt(1), 10);

    let fileFrom = null;
    let rankFrom = null;
    if (from && from.length === 2) {
        fileFrom = from.charCodeAt(0);
        rankFrom = Number.parseInt(from.charAt(1), 10);
    } else if (from && from.length === 1) {
        if (Number.isNaN(Number.parseInt(from, 10))) {
            fileFrom = from.charCodeAt(0);
        } else {
            rankFrom = Number.parseInt(from, 10);
        }
    }

    const fileDist = fileFrom ? Math.abs(fileFrom - fileTo) : -10;
    const rankDist = rankFrom ? Math.abs(rankFrom - rankTo) : -10;

    switch (piece) {
        case KING:
            return fileDist <= 1 && rankDist <= 1;

        case QUEEN:
            return rankDist < 1 || fileDist < 1 || fileDist === rankDist;

        case ROOK:
            return rankDist < 1 || fileDist < 1;

        case BISHOP:
            if (fileFrom && rankFrom) {
                return fileDist === rankDist;
            }
            if (fileFrom) {
                return fileDist > 0;
            }
            if (rankFrom) {
                return rankDist > 0;
            }
            return true; // we don't know where it's from, so is valid

        case KNIGHT:
            if (fileFrom && rankFrom) {
                return (fileDist === 1 && rankDist === 2)
                    || (fileDist === 2 && rankDist === 1);
            }
            if (fileFrom) {
                return fileDist === 1 || fileDist === 2;
            }
            if (rankFrom) {
                return rankDist === 1 || rankDist === 2;
            }
            return true; // we don't know where it's from, so is valid

        case PAWN:
            // pawns can't move from the first or 8th rank
            if (rankFrom === 1 || rankFrom === 8) {
                return false;
            }

            // pawns can't move more than one space left or right
            if (fileDist > 1) {
                return false;
            }

            // fileDist of 1 if only possible if they also have exactly a rankDist of 1
            if (fileDist === 1 && (rankDist !== 1 && rankDist !== -10)) {
                return false;
            }

            // if we tried to capture it must actually be a capture
            if (fileDist === 1 && !capture) {
                return false;
            }

            // they can sometimes move up to 2 spaces...
            if (rankDist > 2) {
                return false;
            }

            // ...but only if from the starting rank
            if (rankDist === 2 && (rankFrom !== 2 && rankFrom !== 7 && rankFrom !== -10)) {
                return false;
            }

            // if we get to the end we must have a promotion
            if ((rankTo === 8 || rankTo === 1) && promotion === null) {
                return false;
            }

        // no default
    }

    return true;
};

export const parseNotation = ({
    notation,
    language = 'english',
}) => {
    let parseObj = {
        notation,
        language,

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

    // the order matters here. Moving from the end back, we remove all possible
    // parts of the notation until there's nothing left

    parseObj = removeDrawOffer(parseObj);
    // console.log('parseObj after removeDraw: ', parseObj);

    parseObj = removeEnPassant(parseObj);
    // console.log('parseObj after removeEnPassant: ', parseObj);

    parseObj = removeChecks(parseObj);
    // console.log('parseObj after removeChecks: ', parseObj);

    parseObj = removeCastles(parseObj);
    // console.log('parseObj after removeCastles: ', parseObj);

    parseObj = removePromotion(parseObj);
    // console.log('parseObj after removePromotion: ', parseObj);

    parseObj = removeTo(parseObj);
    // console.log('parseObj after removeTo: ', parseObj);

    parseObj = removeCapture(parseObj);
    // console.log('parseObj after removeCapture: ', parseObj);

    parseObj = removeFrom(parseObj);
    // console.log('parseObj after removeFrom: ', parseObj);

    parseObj = removePiece(parseObj);
    // console.log('parseObj after removePiece: ', parseObj);

    return {
        ...parseObj,
        notation,
        notationAfterParsing: parseObj.notation,
    };
};

export const isValidParsedNotation = (parseObj) => isValidDraw(parseObj)
    && isValidEnPassant(parseObj)
    && isValidCheck(parseObj)
    && isValidPromotion(parseObj)
    && isValidCapture(parseObj)
    && isValidMove(parseObj)
    && parseObj.notationAfterParsing === '';

export const isValidNotation = ({
    notation,
    language = 'english',
}) => isValidParsedNotation(parseNotation({notation, language}));

export default {
    isValidNotation, // e.g. `isValidNotation({notation: 'Nxd3+'})`

    parseNotation, // notation parser
    isValidParsedNotation, // checks the output of the parser

    pieces,

    removeDrawOffer,
    removeEnPassant,
    removeChecks,
    removeCastles,
    removePromotion,
    removeTo,
    removeCapture,
    removeFrom,
    removePiece,

    isValidDraw,
    isValidEnPassant,
    isValidCheck,
    isValidPromotion,
    isValidCapture,
    isValidMove,
};
