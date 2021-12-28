<script>
const pieces = {
    'english': {K: 'King', Q: 'Queen', R: 'Rook', B: 'Bishop', N: 'Knight', P: 'Pawn'},
};

export default {
    data() {
        return {
            language: 'english',
            notation: '',

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

            afterParsing: null,
        };
    },

    computed: {
        currentIsValid() {
            this.parse(this.notation);
            return this.isValid();
        },

        usedPawn() {
            return this.piece === 'Pawn'
                && !this.queensideCastle
                && !this.kingsideCastle;
        },
    },

    methods: {
        reset() {
            this.offeredDraw = null;
            this.enPassant = null;
            this.check = null;
            this.checkmate = null;
            this.queensideCastle = null;
            this.kingsideCastle = null;
            this.promotion = null;
            this.to = null;
            this.capture = null;
            this.from = null;
            this.piece = null;
            this.afterParsing = null;
        },

        isValid() {
            return this.isValidDraw()
                && this.isValidEnPassant()
                && this.isValidCheck();

            return true;
        },

        isValidDraw() {
            if (this.offeredDraw && this.checkmate) {
                // can't offer a draw after a checkmate
                return false;
            }

            return true;
        },

        isValidEnPassant() {
            // FIXME need to validate files/rank too
            return true; // this.usedPawn;
        },

        isValidCheck() {
            // there's no move that MUST result in a check
            if (!this.check && !this.checkmate) return true;

            // if we don't know where the move is from, there's no move that couldn't
            // at least be a discovered check. At least, not that we can tell.
            if (!this.from) return true;

            // If we don't know where the move is to, there's no way for the notation
            // to be valid.
            if (!this.to) return false;

            if (this.piece === 'King') {
                // king moves can't cause a discovered check if we're moving along
                // the edge of the board.
                if ((this.from.startsWith('a') && this.to.startsWith('a'))
                    || (this.from.startsWith('h') && this.to.startsWith('h'))
                    || (this.from.endsWith('1') && this.to.endsWith('1'))
                    || (this.from.endsWith('8') && this.to.endsWith('8'))) {
                    return false;
                }

                // if the king is in a corner, it can't cause a discovered check
                // no matter where it moves
                if (this.from === 'a8'
                    || this.from === 'h8'
                    || this.from === 'a1'
                    || this.from === 'a8') {
                    return false;
                }
            }

            // all other moves could cause a check
            return true;
        },

        parse(notation) {
            this.reset();

            let parsed = notation;

            parsed = this.removeDrawOffer(parsed);
            console.log('parsed after removeDraw: ', parsed);

            parsed = this.removeEnPassant(parsed);
            console.log('parsed after removeEnPassant: ', parsed);

            parsed = this.removeChecks(parsed);
            console.log('parsed after removeChecks: ', parsed);

            parsed = this.removeCastles(parsed);
            console.log('parsed after removeCastles: ', parsed);

            parsed = this.removePromotion(parsed);
            console.log('parsed after removePromotion: ', parsed);

            parsed = this.removeTo(parsed);
            console.log('parsed after removeTo: ', parsed);

            parsed = this.removeCapture(parsed);
            console.log('parsed after removeCapture: ', parsed);

            parsed = this.removeFrom(parsed);
            console.log('parsed after removeFrom: ', parsed);

            parsed = this.removePiece(parsed);
            console.log('parsed after removePiece: ', parsed);

            this.afterParsing = parsed;
        },

        removeDrawOffer(notation) {
            if (notation.endsWith(' (=)')) {
                this.offeredDraw = true;
                return notation.slice(0, -4);
            }

            return notation;
        },

        removeEnPassant(notation) {
            if (notation.endsWith(' e.p.')) {
                this.enPassant = true;
                return notation.slice(0, -5);
            }

            return notation;
        },

        removeChecks(notation) {
            if (notation.endsWith('++')) {
                this.checkmate = true;
                return notation.slice(0, -2);
            }

            if (notation.endsWith('#')) {
                this.checkmate = true;
                return notation.slice(0, -1);
            }

            if (notation.endsWith('+')) {
                this.check = true;
                return notation.slice(0, -1);
            }

            return notation;
        },

        removeCastles(notation) {
            if ('0-0-0' === notation || 'O-O-O' === notation) {
                this.queensideCastle = true;
                return '';
            }

            if ('0-0' === notation || 'O-O' == notation) {
                this.kingsideCastle = true;
                return '';
            }

            return notation;
        },

        removePromotion(notation) {
            const possiblePiece = notation.slice(-1);
            const hasEqual = notation.slice(-2, -1) === '=';

            if (pieces[this.language][possiblePiece]) {
                this.promotion = pieces[this.language][possiblePiece];
                if (hasEqual) {
                    return notation.slice(0, -2);
                }
                return notation.slice(0, -1);
            }
            return notation;
        },

        removeTo(notation) {
            // must always have full destination
            if (/[a-h][1-8]$/.exec(notation)) {
                this.to = notation.slice(-2);
                return notation.slice(0, -2);
            }

            return notation;
        },

        removeCapture(notation) {
            if (notation.endsWith('x')) {
                this.capture = true;
                return notation.slice(0, -1);
            }

            return notation;
        },

        removeFrom(notation) {
            if (/[a-h][1-8]$/.exec(notation)) {
                this.from = notation.slice(-2);
                return notation.slice(0, -2);
            }

            if (/([a-h]$)|([1-8]$)/.exec(notation)) {
                // if we don't have full 'from' info
                this.from = notation.slice(-1);
                return notation.slice(0, -1);
            }

            return notation;
        },

        removePiece(notation) {
            if (pieces[this.language][notation]) {
                this.piece = pieces[this.language][notation];
                return notation.slice(0, -1);
            }

            this.piece = 'Pawn'; // if no piece is indicated, it's a pawn
            return notation;
        },
    },
};
</script>

<template>
    <div class="container mx-auto my-8">
        <p>This checks for valid algebraic notation</p>
        <input
            ref="notationField"
            type="text"
            v-model="notation"
            placeholder="Notation (e.g. Nxd3)"
        />
        <p>currentIsValid: {{ currentIsValid }}</p>
        <p>offeredDraw: {{ offeredDraw }}</p>
        <p>enPassant: {{ enPassant }}</p>
        <p>check: {{ check }}</p>
        <p>checkmate: {{ checkmate }}</p>
        <p>queensideCastle: {{ queensideCastle }}</p>
        <p>kingsideCastle: {{ kingsideCastle }}</p>
        <p>promotion: {{ promotion }}</p>
        <p>to: {{ to }}</p>
        <p>capture: {{ capture }}</p>
        <p>from: {{ from }}</p>
        <p>piece: {{ piece }}</p>
        <p>afterParsing: {{ afterParsing }}</p>
    </div>
</template>