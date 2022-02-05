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
            tileBrush: null,
        };
    },

    computed: {
        imageData() {
            return this.rawEntities.reduce((acc, entity) => {
                const {
                    name,
                    author,
                    type,
                    image,
                } = entity.data;

                if (acc[type]) {
                    acc[type].push({name, author, url: image.url});
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

    mounted() {
        this.loadImages();
    },

    methods: {
        async loadImages() {
            this.loading = true;

            await new Promise((resolve) => {
                // simulate page load
                setTimeout(() => {
                    this.rawEntities = response.entities;
                    resolve();
                }, 500);
            });

            this.loading = false;
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
                :key="JSON.stringify(image)"
                class="brush"
            >
                <p class="name">{{ image.name }}</p>
                <p class="author">{{ image.author }}</p>
                <img
                    :src="image.url"
                />
                <a class="reset" href="#">reset</a>
            </div>
        </div>
        <Canvas
            :x="TILES_X"
            :y="TILES_Y"
            :initial-image="imageByNameType({name: 'default', type: 'tiles'})"
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
        @apply flex overflow-auto;
    }

    .brush {
        max-width: 128px;
        max-height: 88px;

        .name {
        }

        .author {
        }

        img {
            max-width: 128px;
            max-height: 88px;
        }

        .reset {
        }
    }
</style>
