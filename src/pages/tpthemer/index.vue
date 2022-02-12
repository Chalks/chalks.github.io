<script>
import LZUTF8 from 'lzutf8';
import {response} from './images-response.js';
import constants from './constants.js';

import TilePalette from './TilePalette.vue';
import SpeedpadPalette from './SpeedpadPalette.vue';

export default {
    components: {
        SpeedpadPalette,
        TilePalette,
    },

    data() {
        return {
            ...constants,
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

        brushesLoading() {
            // TODO this isn't quite right, probably can do in one pass
            const loadingBrushes = {};
            this.brushKeys.forEach((key) => {
                const {name} = this.brushes[key];
                loadingBrushes[name] = this.brushes[key].loaded;
            });

            return Object.entries(loadingBrushes)
                .filter(([, loaded]) => loaded === false)
                .map(([name]) => name)
                .sort((a, b) => a.localeCompare(b));
        },

        tileBrushes() {
            return this.brushKeys
                .filter((key) => this.brushes[key].type === 'tiles')
                .map((key) => this.brushes[key])
                .sort(({name: a}, {name: b}) => a.localeCompare(b));
        },

        speedBrushes() {
            return this.brushKeys
                .filter((key) => this.brushes[key].type === 'speedpad'
                    || this.brushes[key].type === 'speedpadred'
                    || this.brushes[key].type === 'speedpadblue')
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
                    filename,
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
                    const randTime = Math.floor(Math.random() * 1000);
                    // TODO remove random timeout
                    setTimeout(() => {
                        this.$set(this.brushes, id, {
                            ...this.brushes[id],
                            loaded: true,
                        });
                    }, randTime);
                });

                img.src = `/tagpro/${filename}`;
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
                this.$refs.speedpadPalette.paintImport(this.SPEEDPAD, decoded[1]);
                this.$refs.speedpadPalette.paintImport(this.SPEEDPAD_RED, decoded[2]);
                this.$refs.speedpadPalette.paintImport(this.SPEEDPAD_BLUE, decoded[3]);
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

        onSpeedpadChange(type, value) {
            if (type === this.SPEEDPAD) {
                this.$set(this.exportArr, 1, value);
            } else if (type === this.SPEEDPAD_RED) {
                this.$set(this.exportArr, 2, value);
            } else if (type === this.SPEEDPAD_BLUE) {
                this.$set(this.exportArr, 3, value);
            }
        },
    },
};
</script>

<template>
    <div class="flex flex-col container mx-auto">
        <div v-if="loading">
            <p v-for="name in brushesLoading" :key="name">{{ name }}</p>
        </div>

        <div v-show="!loading">
            <div>
                <a :href="`/tpthemer#${exportString}`">Link to this theme mix</a>
            </div>

            <TilePalette
                ref="tilePalette"
                :brushes="tileBrushes"
                @change="onTileChange"
            />

            <SpeedpadPalette
                ref="speedpadPalette"
                :brushes="speedBrushes"
                @change="onSpeedpadChange"
            />
        </div>
    </div>
</template>

<style>
    .palette-container {
        @apply flex flex-col;
    }

    .palette {
        @apply flex overflow-auto my-4;

        .brush {
            @apply opacity-50 cursor-pointer relative mx-2 transition-opacity;

            &.selected, &:hover {
                @apply opacity-100;
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
    }

    .canvas {
        @apply flex justify-center;
    }
</style>
