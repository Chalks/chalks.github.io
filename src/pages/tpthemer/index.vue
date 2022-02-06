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
            loading: true,
            rawEntities: [],
            defaultBrush: null,
            tileBrush: null,
        };
    },

    computed: {
        imageData() {
            return this.rawEntities.reduce((acc, entity) => {
                const {id} = entity;
                const {
                    name,
                    author,
                    type,
                    image,
                } = entity.data;

                if (acc[type]) {
                    acc[type].push({
                        id,
                        name,
                        author,
                        url: image.url,
                    });
                }

                return acc;
            }, {
                tiles: [],
                splats: [],
                gravitywell: [],
                speedpad: [],
                speedpadred: [],
                speedpadblue: [],
                portal: [],
                portalred: [],
                portalblue: [],
            });
        },
    },

    async mounted() {
        this.loading = true;

        await this.loadImages();
        this.setDefaults();

        this.loading = false;
    },

    methods: {
        async loadImages() {
            await new Promise((resolve) => {
                // simulate page load
                setTimeout(() => {
                    this.rawEntities = response.entities;
                    resolve();
                }, 1000);
            });
        },

        setDefaults() {
            this.defaultBrush = this.imageByNameType({name: 'default', type: 'tiles'});
            this.tileBrush = this.defaultBrush;
        },

        imageByNameType({name, type}) {
            if (!this.imageData[type]) {
                // eslint-disable-next-line no-console
                console.error('Typo!');
                return {};
            }

            return this.imageData[type]
                .find(({name: imageName}) => name.toLowerCase() === imageName.toLowerCase());
        },

        paintAll(image) {
            this.$refs.tileCanvas.paint(image, 0, 0, 640, 440);
        },

        paintWalls(image) {
            this.$refs.tileCanvas.paint(image, 0, 0, 480, 440);
        },

        paintEnv(image) {
            this.$refs.tileCanvas.paint(image, 480, 0, 80, 40);
            this.$refs.tileCanvas.paint(image, 480, 40, 40, 80);
        },

        paintBalls(image) {
            this.$refs.tileCanvas.paint(image, 560, 0, 80, 40);
        },

        paintFlags(image) {
            this.$refs.tileCanvas.paint(image, 520, 40, 120, 80);
        },

        paintGates(image) {
            this.$refs.tileCanvas.paint(image, 480, 120, 160, 40);
            this.$refs.tileCanvas.paint(image, 520, 240, 40, 40);
        },

        paintPups(image) {
            this.$refs.tileCanvas.paint(image, 480, 160, 40, 200);
        },

        paintTiles(image) {
            this.$refs.tileCanvas.paint(image, 520, 160, 120, 80);
        },

        paintOther(image) {
            this.$refs.tileCanvas.paint(image, 520, 280, 120, 160);
            this.$refs.tileCanvas.paint(image, 480, 360, 40, 80);
            this.$refs.tileCanvas.paint(image, 560, 240, 80, 40);
        },
    },
};
</script>

<template>
    <div v-if="loading">
        Loading ...
    </div>
    <div v-else class="flex flex-col container mx-auto">
        <div class="palette tiles-palette">
            <div
                v-for="image in imageData.tiles"
                :key="image.id"
                :class="image.id === tileBrush.id ? 'brush selected' : 'brush'"
                @click="tileBrush = image"
            >
                <p class="name">{{ image.name }}</p>
                <div class="relative">
                    <img
                        :src="image.url"
                    />
                    <p class="author">{{ image.author }}</p>
                </div>

                <div class="tp-controls">
                    <a class="pillar-word" @click.prevent="() => paintAll(image)">all</a>
                    <a class="pillar-word" @click.prevent="() => paintWalls(image)">walls</a>
                    <a class="pillar-word" @click.prevent="() => paintEnv(image)">env</a>
                    <a class="pillar-word" @click.prevent="() => paintBalls(image)">balls</a>
                    <a class="pillar-word" @click.prevent="() => paintFlags(image)">flags</a>
                    <a class="pillar-word" @click.prevent="() => paintGates(image)">gates</a>
                    <a class="pillar-word" @click.prevent="() => paintPups(image)">pups</a>
                    <a class="pillar-word" @click.prevent="() => paintTiles(image)">tiles</a>
                    <a class="pillar-word" @click.prevent="() => paintOther(image)">other</a>
                </div>
            </div>
        </div>
        <Canvas
            ref="tileCanvas"
            :width="TILES_X"
            :height="TILES_Y"
            :initial-image="defaultBrush"
            :brush="tileBrush"
        />

        <div class="pillar mb-4">
            <h1 class="pillar-word">Hi</h1>
            <p class="pillar-word">I love ya Tagpro bbs</p>
            <h2 class="pillar-word">I'm working on the Tagpro Themer</h2>
            <p class="pillar-word">Let me know you want it!</p>
        </div>

        <InterestForm interest="the Tagpro Themer" />
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
