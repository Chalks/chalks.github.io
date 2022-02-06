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
            this.$refs.tileCanvas.paintImage({
                image,
                x: 0,
                y: 0,
                width: 640,
                height: 440,
            });
        },

        paintWalls(image) {
            this.$refs.tileCanvas.paintImage({
                image,
                x: 0,
                y: 0,
                width: 480,
                height: 440,
            });
        },

        paintPups(image) {
            this.$refs.tileCanvas.paintImage({
                image,
                x: 480,
                y: 160,
                width: 40,
                height: 200,
            });
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

                <div class="flex space-x-2 text-xs">
                    <a href="#" @click.prevent="() => paintAll(image)">all</a>
                    <a href="#" @click.prevent="() => paintWalls(image)">walls</a>
                    <a href="#" @click.prevent="() => paintPups(image)">pups</a>
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

        max-width: 128px;

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
            max-width: 128px;
            max-height: 88px;
        }

        .reset {
        }
    }
</style>
