<script>
import ErrorForm from '~/components/ErrorForm.vue';

import {
    parseNotation,
    isValidNotation,
} from '~/assets/js/notationValidator.js';

export default {
    components: {
        ErrorForm,
    },

    data() {
        return {
            notation: '',
        };
    },

    computed: {
        currentIsValid() {
            return isValidNotation({notation: this.notation});
        },

        currentParse() {
            return parseNotation({notation: this.notation});
        },
    },
};
</script>

<template>
    <div class="prose prose-red container mx-auto my-12 text-justify">
        <h3>Validate a chess move</h3>

        <p>
            This checks for valid algebraic notation. I mostly adhered to
            <a href="https://handbook.fide.com/chapter/E012018">FIDE's rules</a>,
            but to handle a few more common notations I expanded it a bit. Both
            <strong>0-0-0</strong> and <strong>0-0</strong> are validated with
            zeros or capital Os. Promotions are acceptable written as both
            <strong>d8Q</strong> and <strong>d8=Q</strong>. I also allow
            <strong>P</strong> to indicate a pawn, even though that's not
            technically correct (e.g. <strong>e4</strong> is preferred over
            <strong>Pe4</strong>). Note that this is case sensitive and space
            sensitive.
        </p>

        <p>
            If you need help finding a notation to validate, you can check out all
            the possible legal ones
            <NuxtLink to="/fun/all-notations">here</NuxtLink>.
        </p>

        <p>Some fun questions to answer:</p>
        <ul>
            <li>Which moves can a king make that will never result in a check?</li>
            <li>When is a draw offer (e.g. <strong>d4 (=)</strong>) not valid?</li>
            <li>Where can a pawn never move from?</li>
        </ul>

        <hr />

        <p><strong>Validate Notation:</strong></p>
        <input
            ref="notationField"
            v-model="notation"
            type="text"
            placeholder="Notation (e.g. Nxd3)"
        />
        <p>Is valid: <strong>{{ currentIsValid }}</strong></p>
        <pre>"parsed": {{ currentParse }}</pre>

        <hr />

        <p>Did you find an error? Let me know below please!</p>
        <ErrorForm
            subject="notation"
            message-placeholder="Notation with an error"
        />
    </div>
</template>
