<script>
import Canvas from '~/components/tagpro/Canvas.vue';
import InterestForm from '~/components/InterestForm.vue';

import {response} from './images-response.js';
import constants from './constants.js';

export default {
    components: {
        Canvas,
        InterestForm,
    },

    data() {
        return {
            ...constants,
            tileBrush: null,
            brushes: {},
        };
    },

    computed: {
        brushKeys() {
            return Object.keys(this.brushes);
        },

        loadingImages() {
            if (this.brushKeys.length === 0) return true;

            return this.brushKeys.some((key) => this.brushes[key].loaded === false);
        },

        loading() {
            if (this.loadingImages) return true;
            if (this.tileBrush === null) return true;

            return false;
        },

        tileBrushes() {
            return this.brushKeys
                .filter((key) => this.brushes[key].type === 'tiles')
                .map((key) => this.brushes[key])
                .sort(({name: a}, {name: b}) => a.localeCompare(b));
        },
    },

    watch: {
        loadingImages(loading) {
            if (loading === false) {
                this.afterImagesLoaded();
            }
        },
    },

    async mounted() {
        this.loadImages();
    },

    methods: {
        loadImages() {
            response.entities.forEach((entity) => {
                const {id} = entity;
                const {
                    name,
                    author,
                    type,
                    image,
                } = entity.data;

                const img = new Image();

                this.$set(this.brushes, id, {
                    id,
                    loaded: false,
                    name,
                    author,
                    type,
                    img,
                });

                img.addEventListener('load', () => {
                    this.$set(this.brushes, id, {
                        ...this.brushes[id],
                        loaded: true,
                    });

                    const el = document.getElementById(`preview-${id}`);

                    if (el) {
                        el.appendChild(img);
                    }
                });

                img.src = image.url;
            });
        },

        afterImagesLoaded() {
            this.tileBrush = this.tileBrushByName('default');
            this.paintAll(this.tileBrush);
        },

        tileBrushByName(name) {
            return this.tileBrushes
                .find(({name: imageName}) => name.toLowerCase() === imageName.toLowerCase());
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
    },
};
</script>

<template>
    <div class="flex flex-col container mx-auto">
        <div v-if="loading || tileBrush === null">
            Loading ...
        </div>

        <div v-show="!loading">
            <div class="palette tiles-palette">
                <div
                    v-for="brush in tileBrushes"
                    :key="brush.id"
                    :class="tileBrush && brush.id === tileBrush.id ? 'brush selected' : 'brush'"
                    @click="tileBrush = brush"
                >
                    <p class="name">{{ brush.name }}</p>
                    <div :id="`preview-${brush.id}`" class="relative">
                        <p class="author">{{ brush.author }}</p>
                    </div>

                    <div class="tp-controls">
                        <a class="pillar-word" @click.stop.prevent="() => paintAll(brush)">all</a>
                        <a class="pillar-word" @click.stop.prevent="() => paintWalls(brush)">walls</a>
                        <a class="pillar-word" @click.stop.prevent="() => paintEnv(brush)">env</a>
                        <a class="pillar-word" @click.stop.prevent="() => paintBalls(brush)">balls</a>
                        <a class="pillar-word" @click.stop.prevent="() => paintFlags(brush)">flags</a>
                        <a class="pillar-word" @click.stop.prevent="() => paintGates(brush)">gates</a>
                        <a class="pillar-word" @click.stop.prevent="() => paintPups(brush)">pups</a>
                        <a class="pillar-word" @click.stop.prevent="() => paintTiles(brush)">tiles</a>
                        <a class="pillar-word" @click.stop.prevent="() => paintOther(brush)">other</a>
                    </div>
                </div>
            </div>
            <Canvas
                ref="tileCanvas"
                :width="TILES_X"
                :height="TILES_Y"
                :brush="tileBrush"
            />
        </div>
    </div>
</template>

<style>
    .palette {
        @apply flex overflow-auto my-4;
    }

    .brush {
        @apply opacity-50 cursor-pointer relative mr-4 transition-opacity;

        &.selected, &:hover {
            @apply opacity-100;
        }

        &:last-child {
            @apply m-0;
        }

        max-width: 144px;

        .name, .author {
            @apply text-ellipsis whitespace-nowrap overflow-hidden text-xs;
        }

        .name {
            @apply font-bold;
        }

        .author {
            @apply absolute right-0 bottom-0 bg-white opacity-50 transition-opacity;

            &:hover {
                @apply opacity-100;
            }
        }

        img {
            max-width: 144px;
            max-height: 99px;
        }

        .reset {
        }
    }

    .tp-controls {
        @apply flex mt-px flex-wrap items-start space-x-2 text-xs;
        max-width: 144px;

        a {
            @apply border border-white text-center transition-colors;

            width: 48px;
            margin: 0 !important;
            padding: 2px 0 0 0;

            line-height: 18px;
            font-size: 11px;
            letter-spacing: 1px;
        }
    }
</style>
