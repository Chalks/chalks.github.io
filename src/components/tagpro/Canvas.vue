<script>
export default {
    props: {
        width: {
            type: Number,
            default: 40,
        },

        height: {
            type: Number,
            default: 40,
        },

        cellWidth: {
            type: Number,
            default: 40,
        },

        cellHeight: {
            type: Number,
            default: 40,
        },

        initialImage: {
            type: Object,
            default: null,
        },

        brush: {
            type: Object,
            default: null,
        },
    },

    data() {
        return {
            x: 0,
            y: 0,
            over: false,
            down: false,
        };
    },

    computed: {
        el() {
            return this.$refs.el;
        },

        ctx() {
            return this.el.getContext('2d');
        },

        boundingClientRect() {
            return this.el.getBoundingClientRect();
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

        brushImage() {
            if (!this.brush) return null;

            const img = new Image();
            img.src = this.brush.url;

            return img;
        },
    },

    watch: {
        x() {
            if (this.down) {
                this.paint();
            }
        },

        y() {
            if (this.down) {
                this.paint();
            }
        },
    },

    mounted() {
        this.setup();
        this.drawInitialImage();
    },

    methods: {
        setup() {
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
        },

        drawInitialImage() {
            if (!this.initialSourceUrl) return;

            const img = new Image();
            img.addEventListener('load', () => {
                this.ctx.drawImage(img, 0, 0);
            });
            img.src = this.initialSourceUrl;
        },

        getMousePosition(e) {
            const {left, top} = this.boundingClientRect;

            return {
                x: e.clientX - left,
                y: e.clientY - top,
            };
        },

        clear(x, y, width, height) {
            const finalX = x !== undefined ? x : this.x;
            const finalY = y !== undefined ? y : this.y;
            const finalWidth = width || this.cellWidth;
            const finalHeight = height || this.cellHeight;

            this.ctx.globalCompositeOperation = 'destination-out';
            this.ctx.fillStyle = 'rgba(255, 255, 255, 1)';

            this.ctx.fillRect(finalX, finalY, finalWidth, finalHeight);

            this.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
            this.ctx.globalCompositeOperation = 'source-over';
        },

        paint() {
            if (!this.brushImage) return false;

            this.clear();
            this.ctx.drawImage(this.brushImage, this.x, this.y, this.cellWidth, this.cellHeight, this.x, this.y, this.cellWidth, this.cellHeight);

            return true;
        },

        paintImage({
            image,
            x,
            y,
            width,
            height,
        }) {
            const img = new Image();

            img.addEventListener('load', () => {
                this.clear(x, y, width, height);
                this.ctx.drawImage(img, x, y, width, height, x, y, width, height);
            });

            img.src = image.url;
        },

        onMove(e) {
            this.over = true;

            const {x, y} = this.getMousePosition(e);
            if (x < this.x || x > this.x + this.cellWidth) {
                this.x = Math.floor(x / this.cellWidth) * this.cellWidth;
            }

            if (y < this.y || y > this.y + this.cellHeight) {
                this.y = Math.floor(y / this.cellHeight) * this.cellHeight;
            }
        },

        onClick(e) {
            this.onMove(e); // set our coordinates
            this.paint();
        },

        onLeave() {
            this.over = false;
            this.down = false;
        },

        onDown(e) {
            this.onMove(e); // set our coordinates
            this.paint();
            this.down = true;
        },

        onUp() {
            this.down = false;
        },
    },
};
</script>

<template>
    <canvas
        ref="el"
        :width="width"
        :height="height"
        :style="{
            maxWidth: `${width}px`,
            maxHeight: `${height}px`,
        }"
        @click="onClick"
        @mousemove="onMove"
        @mouseleave="onLeave"
        @mousedown="onDown"
        @mouseup="onUp"
    />
</template>
