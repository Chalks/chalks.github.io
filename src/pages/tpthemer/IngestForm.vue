<script>
import constants from './constants.js';

export default {
    data() {
        return {
            ...constants,
            email: '',
            textureName: '',
            textureAuthor: '',
        };
    },

    head: {
        script: [
            {
                src: 'https://www.google.com/recaptcha/api.js',
            },
        ],
    },

    mounted() {
        window.recaptchaJank = this.onSubmit;
    },

    methods: {
        onSubmit() {
            this.$refs.ingestForm.submit();
        },
    },
};
</script>

<template>
    <form
        ref="ingestForm"
        action="https://api.formcake.com/api/form/b90ed463-2728-469b-aebf-42cdcf6a9002/submission"
        method="post"
        enctype="multipart/form-data"
    >
        <p>Do you have some texture packs you'd like to see published on this page? Submit them here and I'll get them included. If you share your email address too, I'll let you know when it's done.</p>

        <input type="hidden" name="honey" />

        <input
            v-model="email"
            type="text"
            name="email"
            placeholder="Your Email Address"
        />

        <input
            v-model="textureName"
            type="text"
            name="textureName"
            placeholder="Texture Name"
        />

        <input
            v-model="textureAuthor"
            type="text"
            name="textureAuthor"
            placeholder="Texture Author"
        />

        <div class="grid grid-cols-3 gap-4">
            <div>
                <label for="file-tiles" class="cursor-pointer">Tiles (640x440, png)</label>
                <input id="file-tiles" type="file" :name="TILES" accept="image/png" />
            </div>

            <div>
                <label for="file-splats" class="cursor-pointer">Splats (840x240, png)</label>
                <input id="file-splats" type="file" :name="SPLATS" accept="image/png" />
            </div>

            <div>
                <label for="file-gravity-well" class="cursor-pointer">Gravity Well (40x40, png)</label>
                <input id="file-gravity-well" type="file" :name="GRAVITY_WELL" accept="image/png" />
            </div>

            <div>
                <label for="file-speedpad" class="cursor-pointer">Speedpad (200x40, png)</label>
                <input id="file-speedpad" type="file" :name="SPEEDPAD" accept="image/png" />
            </div>

            <div>
                <label for="file-speedpad-red" class="cursor-pointer">Speedpad Red (200x40, png)</label>
                <input id="file-speedpad-red" type="file" :name="SPEEDPAD_RED" accept="image/png" />
            </div>

            <div>
                <label for="file-speedpad-blue" class="cursor-pointer">Speedpad Blue (200x40, png)</label>
                <input id="file-speedpad-blue" type="file" :name="SPEEDPAD_BLUE" accept="image/png" />
            </div>

            <div>
                <label for="file-portal" class="cursor-pointer">Portal (200x40, png)</label>
                <input id="file-portal" type="file" :name="PORTAL" accept="image/png" />
            </div>

            <div>
                <label for="file-portal-red" class="cursor-pointer">Portal Red (200x40, png)</label>
                <input id="file-portal-red" type="file" :name="PORTAL_RED" accept="image/png" />
            </div>

            <div>
                <label for="file-portal-blue" class="cursor-pointer">Portal Blue (200x40, png)</label>
                <input id="file-portal-blue" type="file" :name="PORTAL_BLUE" accept="image/png" />
            </div>
        </div>

        <button
            class="g-recaptcha submit"
            data-sitekey="6Lf6IyUaAAAAAPTTe__sC4052VzvGcwFlBHeajA0"
            data-callback="recaptchaJank"
            data-action="submit"
        >
            SUBMIT NEW TEXTURE PACK
        </button>
    </form>
</template>

