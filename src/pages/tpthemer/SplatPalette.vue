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
            splatBrush: null,
        };
    },

    computed: {
        defaultBrush() {
            return this.brushes.find(({name}) => name.toLowerCase() === 'default');
        },

        selectedId() {
            if (this.splatBrush) return this.splatBrush.id;

            if (this.defaultBrush) return this.defaultBrush.id;

            return null;
        },
    },

    methods: {
        init() {
            this.chooseBrush(this.defaultBrush);

            if (this.defaultBrush) {
                this.paintAll(this.defaultBrush);
            }

            this.brushes.forEach((brush) => {
                const el = document.getElementById(`preview-${brush.id}`);

                if (el) {
                    el.appendChild(brush.img);
                }
            });
        },

        paintImport(cellRecord) {
            this.$refs.splatCanvas.paintImport(this.brushes, cellRecord);
        },

        paintAll(brush) {
            this.$refs.splatCanvas.paint(brush, 0, 0, 840, 240);
        },

        paintRed(brush) {
            this.$refs.splatCanvas.paint(brush, 0, 0, 840, 120);
        },

        paintBlue(brush) {
            this.$refs.splatCanvas.paint(brush, 0, 120, 840, 120);
        },

        chooseBrush(brush) {
            this.$refs.splatCanvas.setBrush(brush);
            this.splatBrush = brush;
        },

        onChange(e) {
            this.$emit('change', e);
        },
    },
};
</script>
<template>
    <div class="palette-container">
        <div class="palette">
            <div
                v-for="brush in brushes"
                :key="brush.id"
                :class="brush.id === selectedId ? 'brush selected' : 'brush'"
                @click="() => chooseBrush(brush)"
            >
                <p class="name">{{ brush.name }}</p>
                <div :id="`preview-${brush.id}`" class="relative">
                    <p class="author">{{ brush.author }}</p>
                </div>

                <div class="tp-controls">
                    <a class="pillar-word" @click.prevent="() => paintAll(brush)">all</a>
                    <a class="pillar-word" @click.prevent="() => paintRed(brush)">red</a>
                    <a class="pillar-word" @click.prevent="() => paintBlue(brush)">blue</a>
                </div>
            </div>
        </div>

        <div class="canvas">
            <Canvas
                ref="splatCanvas"
                :width="SPLATS_X"
                :height="SPLATS_Y"
                :cell-width="CELL_X * 3"
                :cell-height="CELL_Y * 3"
                @change="onChange"
            />
        </div>
    </div>
</template>
