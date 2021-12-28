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

export const isValidEnPassant = () => true;
// {
//         usedPawn() {
//             return this.piece === 'Pawn'
//                 && !this.queensideCastle
//                 && !this.kingsideCastle;
//         },
//     // FIXME need to validate files/rank too
//     return true; // usedPawn;
// };

export const isValidCheck = ({
    check,
    checkmate,
    from,
    to,
    piece,
}) => {
    // there's no move that MUST result in a check
    if (!check && !checkmate) return true;

    // if we don't know where the move is from, there's no move that couldn't
    // at least be a discovered check. At least, not that we can tell.
    if (!from) return true;

    // If we don't know where the move is to, there's no way for the notation
    // to be valid.
    if (!to) return false;

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
            || from === 'a8') {
            return false;
        }
    }

    // all other moves could cause a check
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

        notationAfterParse: null,
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
    && isValidCheck(parseObj);

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
};