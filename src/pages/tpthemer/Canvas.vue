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
    },

    data() {
        return {
            x: 0,
            y: 0,
            over: false,
            down: false,
            brush: null,
        };
    },

    computed: {
        el() {
            return this.$refs.el;
        },

        ctx() {
            return this.el.getContext('2d');
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
    },

    methods: {
        setup() {
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
        },

        getMousePosition(e) {
            const {left, top} = this.el.getBoundingClientRect();

            return {
                x: e.clientX - left,
                y: e.clientY - top,
            };
        },

        clear(x, y, width, height) {
            this.ctx.globalCompositeOperation = 'destination-out';
            this.ctx.fillStyle = 'rgba(255, 255, 255, 1)';

            this.ctx.fillRect(x, y, width, height);

            this.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
            this.ctx.globalCompositeOperation = 'source-over';
        },

        paint(image, x, y, width, height) {
            const finalImage = image || this.brush;
            const finalX = x !== undefined ? x : this.x;
            const finalY = y !== undefined ? y : this.y;
            const finalWidth = width || this.cellWidth;
            const finalHeight = height || this.cellHeight;

            this.clear(finalX, finalY, finalWidth, finalHeight);

            this.ctx.drawImage(finalImage.img, finalX, finalY, finalWidth, finalHeight, finalX, finalY, finalWidth, finalHeight);
        },

        setBrush(brush) {
            this.brush = brush;
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
            width: `${width}px`,
            height: `${height}px`,
        }"
        @click="onClick"
        @mousemove="onMove"
        @mouseleave="onLeave"
        @mousedown="onDown"
        @mouseup="onUp"
    />
</template>
