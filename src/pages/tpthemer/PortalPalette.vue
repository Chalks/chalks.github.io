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
                        portal: null,
                        portalred: null,
                        portalblue: null,
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
            if (type === this.PORTAL) {
                this.$refs.portalCanvas.paintImport(this.brushes, cellRecord);
            } else if (type === this.PORTAL_RED) {
                this.$refs.portalredCanvas.paintImport(this.brushes, cellRecord);
            } else if (type === this.PORTAL_BLUE) {
                this.$refs.portalblueCanvas.paintImport(this.brushes, cellRecord);
            }
        },

        paintAll(combo) {
            this.paintNeutral(combo);
            this.paintRed(combo);
            this.paintBlue(combo);
        },

        paintNeutral(combo) {
            this.$refs.portalCanvas
                .paint(combo.portal, 0, 0, this.PORTAL_X, this.PORTAL_Y);
        },

        paintRed(combo) {
            this.$refs.portalredCanvas
                .paint(combo.portalred, 0, 0, this.PORTAL_X, this.PORTAL_Y);
        },

        paintBlue(combo) {
            this.$refs.portalblueCanvas
                .paint(combo.portalblue, 0, 0, this.PORTAL_X, this.PORTAL_Y);
        },

        chooseCombo(combo) {
            this.$refs.portalCanvas.setBrush(combo.portal);
            this.$refs.portalredCanvas.setBrush(combo.portalred);
            this.$refs.portalblueCanvas.setBrush(combo.portalblue);
            this.comboBrush = combo;
        },

        onChangeNeutral(e) {
            this.$emit('change', this.PORTAL, e);
        },

        onChangeRed(e) {
            this.$emit('change', this.PORTAL_RED, e);
        },

        onChangeBlue(e) {
            this.$emit('change', this.PORTAL_BLUE, e);
        },
    },
};
</script>
<template>
    <div class="palette-container">
        <h1 class="pillar-word">PORTALS</h1>
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
                        v-if="cb.portal"
                        :id="`preview-${cb.portal.id}`"
                        class="mb-px"
                    />

                    <div
                        v-if="cb.portalred"
                        :id="`preview-${cb.portalred.id}`"
                        class="mb-px"
                    />

                    <div
                        v-if="cb.portalblue"
                        :id="`preview-${cb.portalblue.id}`"
                        class="mb-px"
                    />
                    <p class="author">{{ cb.author }}</p>
                </div>

                <div class="tp-controls">
                    <a v-if="cb.portal" class="pillar-word" @click.prevent="() => paintNeutral(cb)">neut</a>
                    <a v-if="cb.portalred" class="pillar-word" @click.prevent="() => paintRed(cb)">red</a>
                    <a v-if="cb.portalblue" class="pillar-word" @click.prevent="() => paintBlue(cb)">blue</a>
                </div>
            </div>
        </div>

        <div class="canvas flex flex-col items-center">
            <Canvas
                ref="portalCanvas"
                :width="PORTAL_X"
                :height="PORTAL_Y"
                :cell-width="CELL_X"
                :cell-height="CELL_Y"
                @change="onChangeNeutral"
            />
            <Canvas
                ref="portalredCanvas"
                :width="PORTAL_X"
                :height="PORTAL_Y"
                :cell-width="CELL_X"
                :cell-height="CELL_Y"
                @change="onChangeRed"
            />
            <Canvas
                ref="portalblueCanvas"
                :width="PORTAL_X"
                :height="PORTAL_Y"
                :cell-width="CELL_X"
                :cell-height="CELL_Y"
                @change="onChangeBlue"
            />
        </div>
    </div>
</template>

