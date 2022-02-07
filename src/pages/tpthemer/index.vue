<script>
import LZUTF8 from 'lzutf8';
import {response} from './images-response.js';

import TilePalette from './TilePalette.vue';
import SpeedpadPalette from './SpeedpadPalette.vue';

export default {
    components: {
        SpeedpadPalette,
        TilePalette,
    },

    data() {
        return {
            brushes: {},
            exportArr: [
                [], // 0 tiles
                [], // 1 speedpad
                [], // 2 speedpad red
                [], // 3 speedpad blue
                [], // 4 portal
                [], // 5 portal red
                [], // 6 portal blue
                [], // 7 splats
                [], // 8 gravity well
            ],
            importStr: this.$route.hash
                ? this.$route.hash.substr(1)
                : null,
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

        speedpadBrushes() {
            return this.brushKeys
                .filter((key) => this.brushes[key].type === 'speedpad')
                .map((key) => this.brushes[key])
                .sort(({name: a}, {name: b}) => a.localeCompare(b));
        },

        exportString() {
            return this.encode();
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
            this.$refs.speedpadPalette.init();
            this.importFromString();
        },

        importFromString() {
            if (!this.importStr) return;

            const decoded = this.decode(this.importStr);

            if (decoded && decoded.length === 9) {
                this.$refs.tilePalette.paintImport(decoded[0]);
                this.$refs.speedpadPalette.paintImport(decoded[1]);
            }
        },

        encode() {
            let str = '';
            str += `${this.exportArr[0].join(',')}`; // tiles
            str += `.${this.exportArr[1].join(',')}`; // speedpad
            str += `.${this.exportArr[2].join(',')}`; // speedpad red
            str += `.${this.exportArr[3].join(',')}`; // speedpad blue
            str += `.${this.exportArr[4].join(',')}`; // portal
            str += `.${this.exportArr[5].join(',')}`; // portal red
            str += `.${this.exportArr[6].join(',')}`; // portal blue
            str += `.${this.exportArr[7].join(',')}`; // splats
            str += `.${this.exportArr[8].join(',')}`; // gravity well

            return LZUTF8.compress(str, {outputEncoding: 'Base64'});
        },

        decode(str) {
            const decompressed = LZUTF8.decompress(str.trim(), {inputEncoding: 'Base64'});
            const split = decompressed.split('.');
            if (split.length !== 9) return false;

            return [
                split[0].split(',').map((x) => Number.parseInt(x, 10)),
                split[1].split(',').map((x) => Number.parseInt(x, 10)),
                split[2].split(',').map((x) => Number.parseInt(x, 10)),
                split[3].split(',').map((x) => Number.parseInt(x, 10)),
                split[4].split(',').map((x) => Number.parseInt(x, 10)),
                split[5].split(',').map((x) => Number.parseInt(x, 10)),
                split[6].split(',').map((x) => Number.parseInt(x, 10)),
                split[7].split(',').map((x) => Number.parseInt(x, 10)),
                split[8].split(',').map((x) => Number.parseInt(x, 10)),
            ];
        },

        onTileChange(e) {
            this.$set(this.exportArr, 0, e);
        },

        onSpeedpadChange(e) {
            this.$set(this.exportArr, 1, e);
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
            <a :href="`/tpthemer#${exportString}`">Link to this theme mix</a>
            <TilePalette
                ref="tilePalette"
                :brushes="tileBrushes"
                @change="onTileChange"
            />
            <SpeedpadPalette
                ref="speedpadPalette"
                :brushes="speedpadBrushes"
                @change="onSpeedpadChange"
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
