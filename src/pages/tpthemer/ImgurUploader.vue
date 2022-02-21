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
    },

    data() {
        const urls = {};
        urls[constants.TILES] = false;

        return {
            ...constants,
            uploading: false,
            creatingAlbum: true,
            headers: null,
            errorMessage: '',

            albumId: null,
            albumDeleteHash: null,
            urls,
        };
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
            console.log('created: ', created);
            if (created) {
                console.log('here');
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

            return fetch(this.IMGUR_ALBUM_CREATE, requestOptions)
                .then((response) => response.json())
                .catch(() => null);
        },

        uploadImages() {
            this.uploadImage(this.TILES, this.tilePaletteRef, 'Tiles');
        },

        uploadImage(key, ref, title) {
            const body = new FormData();
            const dataTrim = /^data.*?,/; // remove 'data:image/png;base64,'
            const tileData = this.$parent.$refs[ref].toData().replace(dataTrim, '');

            body.append('image', tileData);
            body.append('type', 'base64');
            body.append('title', title);
            body.append('name', `${key}.png`);
            body.append('album', this.albumDeleteHash);

            fetch(this.IMGUR_IMAGE_CREATE, {
                method: 'POST',
                headers: this.headers,
                body,
                redirect: 'follow',
            }).then(async (response) => {
                const result = await response.json();
                this.$set(this.urls, key, result.data.link);
            }).catch(() => {
                this.$set(this.urls, key, null);
            });
        },
    },
};
</script>
<template>
    <div v-show="open" class="fixed inset-0 z-50 bg-gray-50 overflow-auto">
        <div class="prose mx-auto">
            <p v-if="uploading" class="animate-pulse">Uploading</p>

            <ol>
                <li v-if="creatingAlbum" class="animate-pulse">Creating Album</li>
            </ol>
        </div>
    </div>
</template>
