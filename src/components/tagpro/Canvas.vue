<script>
export default {
    props: {
        x: {
            type: Number,
            default: 40,
        },

        y: {
            type: Number,
            default: 40,
        },

        initialImage: {
            type: Object,
            default: null,
        },
    },

    computed: {
        el() {
            return this.$refs.el;
        },

        ctx() {
            return this.el.getContext('2d');
        },

        name() {
            return this.initialImage
                ? this.initialImage.name
                : 'Untitled';
        },

        author() {
            return this.initialImage
                ? this.initialImage.author
                : '';
        },

        initialSourceUrl() {
            return this.initialImage
                ? this.initialImage.url
                : null;
        },
    },

    mounted() {
        console.log('initialImage: ', this.initialImage);
        console.log('this.$refs.el: ', this.$refs.el, this.el);
        this.drawInitialImage();
    },

    methods: {
        drawInitialImage() {
            if (!this.initialSourceUrl) return;

            const img = new Image();
            img.addEventListener('load', () => {
                this.ctx.drawImage(img, 0, 0);
            });
            img.src = this.initialSourceUrl;
        },
    },
};
</script>

<template>
    <canvas
        ref="el"
        :width="x"
        :height="y"
        :style="{
            maxWidth: `${x}px`,
            maxHeight: `${y}px`,
        }"
    />
</template>
