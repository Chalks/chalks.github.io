<script>
import {response} from './images-response.js';
import TilePalette from './TilePalette';

export default {
    components: {
        TilePalette,
    },

    data() {
        return {
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
                });

                img.src = image.url;
            });
        },

        afterImagesLoaded() {
            this.$refs.tilePalette.init();
        },
    },
};
</script>

<template>
    <div class="flex flex-col container mx-auto">
        <div v-if="loading">
            Loading ...
        </div>

        <div v-show="!loading">
            <TilePalette
                ref="tilePalette"
                :brushes="tileBrushes"
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
