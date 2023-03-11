<script>
import TpCanvas from './TpCanvas.vue';
import constants from './constants.js';

export default {
    components: {
        TpCanvas,
    },

    props: {
        brushes: {
            type: Array,
            default: () => [],
        },
    },

    emits: ['change'],

    data() {
        return {
            ...constants,
            gravityBrush: null,
        };
    },

    computed: {
        defaultBrush() {
            return this.brushes.find(({name}) => name.toLowerCase() === 'default');
        },

        selectedId() {
            if (this.gravityBrush) return this.gravityBrush.id;

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
            this.$refs.gravityCanvas.paintImport(this.brushes, cellRecord);
        },

        paintAll(brush) {
            this.$refs.gravityCanvas.paint(brush, 0, 0, 40, 40);
        },

        chooseBrush(brush) {
            this.$refs.gravityCanvas.setBrush(brush);
            this.gravityBrush = brush;
        },

        onChange(e) {
            this.$emit('change', e);
        },

        toData() {
            return this.$refs.gravityCanvas.toData();
        },
    },
};
</script>
<template>
    <div class="palette-container">
        <h1 class="pillar-word">GRAVITY WELL</h1>
        <div class="palette">
            <div
                v-for="brush in brushes"
                :key="brush.id"
                :class="brush.id === selectedId ? 'brush selected' : 'brush'"
                @click="() => { chooseBrush(brush); paintAll(brush); }"
            >
                <p class="name">{{ brush.name }}</p>
                <div :id="`preview-${brush.id}`" class="relative">
                    <p class="author">{{ brush.author }}</p>
                </div>
            </div>
        </div>

        <div class="canvas">
            <TpCanvas
                ref="gravityCanvas"
                :width="GRAVITY_X"
                :height="GRAVITY_Y"
                :cell-width="CELL_X"
                :cell-height="CELL_Y"
                @change="onChange"
            />
        </div>
    </div>
</template>
