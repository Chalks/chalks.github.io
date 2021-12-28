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
    <div class="container mx-auto my-8">
        <p>This checks for valid algebraic notation</p>
        <input
            ref="notationField"
            v-model="notation"
            type="text"
            placeholder="Notation (e.g. Nxd3)"
        />
        <p>currentIsValid: {{ currentIsValid }}</p>
        <pre>{{ currentParse }}</pre>
    </div>
</template>
