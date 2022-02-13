<script>
import Canvas from './Canvas.vue';
import constants from './constants.js';

export default {
    components: {
        Canvas,
    },

    props: {
        brushes: {
            type: Array,
            default: () => [],
        },
    },

    data() {
        return {
            ...constants,
            comboBrush: null,
        };
    },

    computed: {
        comboBrushes() {
            let lastName = '';
            return this.brushes.reduce((acc, brush) => {
                // WARN this only works because brushes is ordered by name
                if (brush.name !== lastName) {
                    acc.unshift({
                        id: brush.id, // inaccurate but good enough
                        author: brush.author,
                        name: brush.name,
                        speedpad: null,
                        speedpadred: null,
                        speedpadblue: null,
                    });
                    lastName = brush.name;
                }

                acc[0][brush.type] = brush;
                return acc;
            }, []).reverse();
        },

        defaultCombo() {
            return this.comboBrushes.find(({name}) => name.toLowerCase() === 'default');
        },

        selectedId() {
            if (this.comboBrush) return this.comboBrush.id;

            if (this.defaultCombo) return this.defaultCombo.id;

            return null;
        },
    },

    methods: {
        init() {
            this.chooseCombo(this.defaultCombo);

            if (this.defaultCombo) {
                this.paintAll(this.defaultCombo);
            }

            this.brushes.forEach((brush) => {
                const el = document.getElementById(`preview-${brush.id}`);

                if (el) {
                    el.appendChild(brush.img);
                }
            });
        },

        paintImport(type, cellRecord) {
            if (type === this.SPEEDPAD) {
                this.$refs.speedpadCanvas.paintImport(this.brushes, cellRecord);
            } else if (type === this.SPEEDPAD_RED) {
                this.$refs.speedpadredCanvas.paintImport(this.brushes, cellRecord);
            } else if (type === this.SPEEDPAD_BLUE) {
                this.$refs.speedpadblueCanvas.paintImport(this.brushes, cellRecord);
            }
        },

        paintAll(combo) {
            this.paintNeutral(combo);
            this.paintRed(combo);
            this.paintBlue(combo);
        },

        paintNeutral(combo) {
            this.$refs.speedpadCanvas
                .paint(combo.speedpad, 0, 0, this.SPEEDPAD_X, this.SPEEDPAD_Y);
        },

        paintRed(combo) {
            this.$refs.speedpadredCanvas
                .paint(combo.speedpadred, 0, 0, this.SPEEDPAD_X, this.SPEEDPAD_Y);
        },

        paintBlue(combo) {
            this.$refs.speedpadblueCanvas
                .paint(combo.speedpadblue, 0, 0, this.SPEEDPAD_X, this.SPEEDPAD_Y);
        },

        chooseCombo(combo) {
            this.$refs.speedpadCanvas.setBrush(combo.speedpad);
            this.$refs.speedpadredCanvas.setBrush(combo.speedpadred);
            this.$refs.speedpadblueCanvas.setBrush(combo.speedpadblue);
            this.comboBrush = combo;
        },

        onChangeNeutral(e) {
            this.$emit('change', this.SPEEDPAD, e);
        },

        onChangeRed(e) {
            this.$emit('change', this.SPEEDPAD_RED, e);
        },

        onChangeBlue(e) {
            this.$emit('change', this.SPEEDPAD_BLUE, e);
        },
    },
};
</script>
<template>
    <div class="palette-container">
        <h1 class="pillar-word">SPEEDPAD</h1>
        <div class="palette">
            <div
                v-for="cb in comboBrushes"
                :key="cb.id"
                :class="cb.id === selectedId ? 'brush selected' : 'brush'"
                @click="() => chooseCombo(cb)"
            >
                <p class="name">{{ cb.name }}</p>

                <div class="relative">
                    <div
                        v-if="cb.speedpad"
                        :id="`preview-${cb.speedpad.id}`"
                        class="mb-px"
                    />

                    <div
                        v-if="cb.speedpadred"
                        :id="`preview-${cb.speedpadred.id}`"
                        class="mb-px"
                    />

                    <div
                        v-if="cb.speedpadblue"
                        :id="`preview-${cb.speedpadblue.id}`"
                        class="mb-px"
                    />
                    <p class="author">{{ cb.author }}</p>
                </div>

                <div class="tp-controls">
                    <a v-if="cb.speedpad" class="pillar-word" @click.prevent="() => paintNeutral(cb)">neut</a>
                    <a v-if="cb.speedpadred" class="pillar-word" @click.prevent="() => paintRed(cb)">red</a>
                    <a v-if="cb.speedpadblue" class="pillar-word" @click.prevent="() => paintBlue(cb)">blue</a>
                </div>
            </div>
        </div>

        <div class="canvas flex flex-col items-center">
            <Canvas
                ref="speedpadCanvas"
                :width="SPEEDPAD_X"
                :height="SPEEDPAD_Y"
                :cell-width="CELL_X"
                :cell-height="CELL_Y"
                @change="onChangeNeutral"
            />
            <Canvas
                ref="speedpadredCanvas"
                :width="SPEEDPAD_X"
                :height="SPEEDPAD_Y"
                :cell-width="CELL_X"
                :cell-height="CELL_Y"
                @change="onChangeRed"
            />
            <Canvas
                ref="speedpadblueCanvas"
                :width="SPEEDPAD_X"
                :height="SPEEDPAD_Y"
                :cell-width="CELL_X"
                :cell-height="CELL_Y"
                @change="onChangeBlue"
            />
        </div>
    </div>
</template>

