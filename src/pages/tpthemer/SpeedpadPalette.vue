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
            speedpadBrush: null,
        };
    },

    computed: {
        defaultBrush() {
            return this.brushes.find(({name}) => name.toLowerCase() === 'default');
        },

        selectedId() {
            if (this.speedpadBrush) return this.speedpadBrush.id;

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
            this.$refs.speedpadCanvas.paintImport(this.brushes, cellRecord);
        },

        paintAll(brush) {
            this.$refs.speedpadCanvas.paint(brush, 0, 0, this.SPEEDPAD_X, this.SPEEDPAD_Y);
        },

        chooseBrush(brush) {
            this.$refs.speedpadCanvas.setBrush(brush);
            this.speedpadBrush = brush;
        },

        onChange(e) {
            this.$emit('change', e);
        },
    },
};
</script>
<template>
    <div>
        <div class="palette speedpads-palette">
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
                </div>
            </div>
        </div>

        <div>
            <Canvas
                ref="speedpadCanvas"
                :width="SPEEDPAD_X"
                :height="SPEEDPAD_Y"
                :cell-width="CELL_X"
                :cell-height="CELL_Y"
                @change="onChange"
            />
        </div>
    </div>
</template>

