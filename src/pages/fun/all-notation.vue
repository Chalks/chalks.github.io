<script>
import {
    isValidNotation,
} from '~/assets/js/notationValidator.js';

export default {
    data() {
        return {
            allNotations: [],
            allValidNotations: [],
        };
    },

    created() {
        const pieces = ['K', 'Q', 'R', 'B', 'N', 'P', ''];
        const filesSpaces = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', ''];
        const ranksSpaces = ['1', '2', '3', '4', '5', '6', '7', '8', ''];
        const capture = ['x', ''];

        const tmp1 = [];
        for (let i = 0; i < pieces.length; i++) {
            for (let j = 0; j < filesSpaces.length; j++) {
                for (let k = 0; k < ranksSpaces.length; k++) {
                    for (let l = 0; l < capture.length; l++) {
                        tmp1.push(`${pieces[i]}${filesSpaces[j]}${ranksSpaces[k]}${capture[l]}`);
                    }
                }
            }
        }

        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
        const promotions = ['K', 'Q', 'R', 'B', 'N', ''];

        const tmp2 = [];
        for (let i = 0; i < tmp1.length; i++) {
            for (let j = 0; j < files.length; j++) {
                for (let k = 0; k < ranks.length; k++) {
                    const piece = tmp1[i][0];
                    if (piece !== 'K' && piece !== 'Q' && piece !== 'R' && piece !== 'B' && piece !== 'N') {
                        for (let l = 0; l < promotions.length; l++) {
                            tmp2.push(`${tmp1[i]}${files[j]}${ranks[k]}${promotions[l]}`);
                        }
                    }
                }
            }
        }

        // castles;
        tmp2.push('0-0-0');
        tmp2.push('0-0');

        const checks = ['+', '++', ''];
        const holyHell = [' e.p.', ''];
        const draw = [' (=)', ''];

        const tmp3 = [];
        for (let i = 0; i < tmp2.length; i++) {
            for (let j = 0; j < checks.length; j++) {
                const piece = tmp2[i][0];
                if (piece !== 'K' && piece !== 'Q' && piece !== 'R' && piece !== 'B' && piece !== 'N') {
                    for (let k = 0; k < holyHell.length; k++) {
                        for (let l = 0; l < draw.length; l++) {
                            tmp3.push(`${tmp2[i]}${checks[j]}${holyHell[k]}${draw[l]}`);
                        }
                    }
                } else {
                    for (let l = 0; l < draw.length; l++) {
                        tmp3.push(`${tmp2[i]}${checks[j]}${draw[l]}`);
                    }
                }
            }
        }

        this.allNotations = tmp3;

        console.log('allNotations: ', this.allNotations);
    },

    methods: {
        calculate() {
            const start = performance.now();
            console.log('starting');
            this.allValidNotations = this.allNotations.filter((notation) => isValidNotation({notation}));
            console.log('finished: ', performance.now() - start);
            console.log(this.allValidNotations);
        },
    },
};
</script>

<template>
    <div class="container mx-auto my-8 pillar" @click="calculate">
        holy hell
        <p v-for="notation in allValidNotations" :key="notation" style="margin: 0 2px">{{ notation }}</p>
    </div>
</template>

