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
            tileBrush: null,
        };
    },

    computed: {
        defaultBrush() {
            return this.brushes.find(({name}) => name.toLowerCase() === 'default');
        },

        selectedId() {
            if (this.tileBrush) return this.tileBrush.id;

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
            this.$refs.tileCanvas.paintImport(this.brushes, cellRecord);
        },

        paintAll(brush) {
            this.$refs.tileCanvas.paint(brush, 0, 0, 640, 440);
        },

        paintWalls(brush) {
            this.$refs.tileCanvas.paint(brush, 0, 0, 480, 440);
        },

        paintEnv(brush) {
            this.$refs.tileCanvas.paint(brush, 480, 0, 80, 40);
            this.$refs.tileCanvas.paint(brush, 480, 40, 40, 80);
        },

        paintBalls(brush) {
            this.$refs.tileCanvas.paint(brush, 560, 0, 80, 40);
        },

        paintFlags(brush) {
            this.$refs.tileCanvas.paint(brush, 520, 40, 120, 80);
        },

        paintGates(brush) {
            this.$refs.tileCanvas.paint(brush, 480, 120, 160, 40);
            this.$refs.tileCanvas.paint(brush, 520, 240, 40, 40);
        },

        paintPups(brush) {
            this.$refs.tileCanvas.paint(brush, 480, 160, 40, 200);
        },

        paintTiles(brush) {
            this.$refs.tileCanvas.paint(brush, 520, 160, 120, 80);
        },

        paintOther(brush) {
            this.$refs.tileCanvas.paint(brush, 520, 280, 120, 160);
            this.$refs.tileCanvas.paint(brush, 480, 360, 40, 80);
            this.$refs.tileCanvas.paint(brush, 560, 240, 80, 40);
        },

        chooseBrush(brush) {
            this.$refs.tileCanvas.setBrush(brush);
            this.tileBrush = brush;
        },

        onChange(e) {
            this.$emit('change', e);
        },
    },
};
</script>
<template>
    <div class="palette-container">
        <h1 class="pillar-word">TILES</h1>
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
                    <a class="pillar-word" @click.prevent="() => paintWalls(brush)">walls</a>
                    <a class="pillar-word" @click.prevent="() => paintEnv(brush)">env</a>
                    <a class="pillar-word" @click.prevent="() => paintBalls(brush)">balls</a>
                    <a class="pillar-word" @click.prevent="() => paintFlags(brush)">flags</a>
                    <a class="pillar-word" @click.prevent="() => paintGates(brush)">gates</a>
                    <a class="pillar-word" @click.prevent="() => paintPups(brush)">pups</a>
                    <a class="pillar-word" @click.prevent="() => paintTiles(brush)">tiles</a>
                    <a class="pillar-word" @click.prevent="() => paintOther(brush)">other</a>
                </div>
            </div>
        </div>

        <div class="canvas">
            <Canvas
                ref="tileCanvas"
                :width="TILES_X"
                :height="TILES_Y"
                :cell-width="CELL_X"
                :cell-height="CELL_Y"
                @change="onChange"
            />
        </div>
    </div>
</template>
