<script>
import {
    parseNotation,
    isValidNotation,
} from '~/assets/js/notationValidator.js';

export default {
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
            but to handle a few more common notations I expanded it a bit. Both 0-0-0
            and 0-0 are validated with zeros or capital Os. Promotions are acceptable
            written as d8Q and d8=Q. If you need help finding a notation to validate,
            you can check out all the possible legal ones
            <NuxtLink to="/fun/all-notations">here</NuxtLink>.
        </p>

        <input
            ref="notationField"
            v-model="notation"
            type="text"
            placeholder="Notation (e.g. Nxd3)"
        />
        <p>Is valid: {{ currentIsValid }}</p>
        <pre>{{ currentParse }}</pre>
    </div>
</template>
