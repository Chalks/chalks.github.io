<script>
import constants from './constants.js';

export default {
    props: {
        open: {
            type: Boolean,
            default: false,
        },

        exportString: {
            type: String,
            default: '',
        },

        tilePaletteRef: {
            type: String,
            default: '',
        },

        speedpadPaletteRef: {
            type: String,
            default: '',
        },

        portalPaletteRef: {
            type: String,
            default: '',
        },

        splatPaletteRef: {
            type: String,
            default: '',
        },

        gravityPaletteRef: {
            type: String,
            default: '',
        },

    },

    data() {
        return {
            ...constants,
            uploading: false,
            headers: null,
            errorMessage: '',

            albumId: null,
            albumDeleteHash: null,
            images: {},
        };
    },

    computed: {
        albumLink() {
            return `${this.IMGUR_ALBUM_URI}/${this.albumId}/edit`;
        },
    },

    watch: {
        open(isOpen) {
            if (isOpen) {
                this.startUpload();
                document.body.classList.add('overflow-hidden');
            } else {
                document.body.classList.remove('overflow-hidden');
            }
        },
    },

    methods: {
        close() {
            this.uploading = false;
            this.$emit('update:open', false);
        },

        error(message) {
            this.errorMessage = message;
        },

        async startUpload() {
            // WARNING when testing locally, must run with `HOST=0.0.0.0 npm run dev`
            // because Imgur hates localhost for some reason.
            if (this.uploading) return;
            this.uploading = true;

            // setup headers
            const headers = new Headers();
            headers.append('Authorization', `Client-ID ${constants.IMGUR_CLIENT_ID}`);
            this.headers = headers;

            const created = await this.createAlbum();
            if (created) {
                this.albumId = created.data.id;
                this.albumDeleteHash = created.data.deletehash;

                this.uploadImages();
            } else {
                this.error('Album failed to create');
            }
        },

        async createAlbum() {
            const body = new FormData();
            body.append('title', 'Remixed Tagpro Theme');
            body.append('description', `Created with https://jdw.me/tpthemer for https://tagpro.gg\nRemix this theme yourself at:\n\nhttps://jdw.me/tpthemer#${this.exportString}`);

            const requestOptions = {
                method: 'POST',
                headers: this.headers,
                body,
                redirect: 'follow',
            };

            return fetch(this.IMGUR_ALBUM_API, requestOptions)
                .then((response) => response.json())
                .catch(() => null);
        },

        uploadImages() {
            Promise.all([
                this.uploadImage(this.TILES, this.tilePaletteRef, 'Tiles'),
                this.uploadImage(this.SPLATS, this.splatPaletteRef, 'Splats'),
                this.uploadImage(this.GRAVITY_WELL, this.gravityPaletteRef, 'Gravity Well'),
                this.uploadImage(this.SPEEDPAD, this.speedpadPaletteRef, 'Speedpad'),
                this.uploadImage(this.SPEEDPAD_RED, this.speedpadPaletteRef, 'Speedpad Red'),
                this.uploadImage(this.SPEEDPAD_BLUE, this.speedpadPaletteRef, 'Speedpad Blue'),
                this.uploadImage(this.PORTAL, this.portalPaletteRef, 'Portal'),
                this.uploadImage(this.PORTAL_RED, this.portalPaletteRef, 'Portal Red'),
                this.uploadImage(this.PORTAL_BLUE, this.portalPaletteRef, 'Portal Blue'),
            ]).finally(async () => {
                await this.arrangeAlbumImages();
            });
        },

        arrangeAlbumImages() {
            const body = new FormData();

            if (this.images[this.TILES]) {
                body.append('deletehashes[]', this.images[this.TILES].deleteHash);
            }

            if (this.images[this.SPEEDPAD]) {
                body.append('deletehashes[]', this.images[this.SPEEDPAD].deleteHash);
            }

            if (this.images[this.SPEEDPAD_RED]) {
                body.append('deletehashes[]', this.images[this.SPEEDPAD_RED].deleteHash);
            }

            if (this.images[this.SPEEDPAD_BLUE]) {
                body.append('deletehashes[]', this.images[this.SPEEDPAD_BLUE].deleteHash);
            }

            if (this.images[this.PORTAL]) {
                body.append('deletehashes[]', this.images[this.PORTAL].deleteHash);
            }

            if (this.images[this.PORTAL_RED]) {
                body.append('deletehashes[]', this.images[this.PORTAL_RED].deleteHash);
            }

            if (this.images[this.PORTAL_BLUE]) {
                body.append('deletehashes[]', this.images[this.PORTAL_BLUE].deleteHash);
            }

            if (this.images[this.SPLATS]) {
                body.append('deletehashes[]', this.images[this.SPLATS].deleteHash);
            }

            if (this.images[this.GRAVITY_WELL]) {
                body.append('deletehashes[]', this.images[this.GRAVITY_WELL].deleteHash);
            }

            return fetch(`${this.IMGUR_ALBUM_API}/${this.albumDeleteHash}`, {
                method: 'POST',
                headers: this.headers,
                body,
                redirect: 'follow',
            }).catch(() => {
                this.errorMessage = 'Something went wrong.';
            }).finally(() => {
                this.uploading = false;
            });
        },

        uploadImage(key, ref, title) {
            const body = new FormData();
            const dataTrim = /^data.*?,/; // remove 'data:image/png;base64,'
            const tileData = this.$parent.$refs[ref].toData(key).replace(dataTrim, '');

            body.append('image', tileData);
            body.append('type', 'base64');
            body.append('title', title);
            body.append('name', `${key}.png`);
            body.append('album', this.albumDeleteHash);

            return fetch(this.IMGUR_IMAGE_API, {
                method: 'POST',
                headers: this.headers,
                body,
                redirect: 'follow',
            }).then(async (response) => {
                const result = await response.json();
                this.$set(this.images, key, {
                    link: result.data.link,
                    deleteHash: result.data.deletehash,
                });
            }).catch(() => {
                this.$set(this.images, key, null);
            });
        },
    },
};
</script>
<template>
    <div v-show="open" class="fixed inset-0 z-50 bg-gray-50 overflow-auto">
        <div class="prose mx-auto">
            <ol>
                <li v-if="uploading" class="animate-pulse">Album: Creating</li>
                <li v-else class="animate-pulse">Album: {{ albumLink }}</li>

                <li v-if="images[TILES]">
                    Tiles:
                    <a :href="images[TILES].link" target="_blank">
                        {{ images[TILES].link }}
                    </a>
                </li>
                <li v-else class="animate-pulse">Tiles: Uploading</li>

                <li v-if="images[SPLATS]">
                    Splats:
                    <a :href="images[SPLATS].link" target="_blank">
                        {{ images[SPLATS].link }}
                    </a>
                </li>
                <li v-else class="animate-pulse">Splats: Uploading</li>
            </ol>
        </div>
    </div>
</template>
