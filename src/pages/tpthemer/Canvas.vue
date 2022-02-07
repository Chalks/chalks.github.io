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
            cellRecord: null,
        };
    },

    computed: {
        el() {
            return this.$refs.el;
        },

        ctx() {
            return this.el.getContext('2d');
        },

        cellCount() {
            const cellX = this.width / this.cellWidth;
            const cellY = this.height / this.cellHeight;
            return cellX * cellY;
        },

        cellsPerColumn() {
            return this.height / this.cellHeight;
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

        cellRecord() {
            this.$emit('change', this.getCompressedRecord());
        },
    },

    mounted() {
        this.setup();
    },

    methods: {
        setup() {
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
            this.cellRecord = new Array(this.cellCount);
            this.cellRecord.fill(-1);
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

            this.recordCells(finalImage, finalX, finalY, finalWidth, finalHeight);

            this.clear(finalX, finalY, finalWidth, finalHeight);

            this.ctx.drawImage(finalImage.img, finalX, finalY, finalWidth, finalHeight, finalX, finalY, finalWidth, finalHeight);
        },

        paintImport(images, compressedCellRecord) {
            // this is the lazy way. Good way would be to calculate squares, but
            // who has time for that
            this.expandRecord(compressedCellRecord).forEach((record, index) => {
                const x = Math.floor(index / this.cellsPerColumn) * this.cellWidth;
                const y = (index % this.cellsPerColumn) * this.cellHeight;
                const image = images.find(({id}) => id === record);

                if (image) {
                    this.paint(image, x, y, this.cellWidth, this.cellHeight);
                } else {
                    this.clear(x, y, this.cellWidth, this.cellHeight);
                }
            });
        },

        recordCells(image, x, y, width, height) {
            const startX = x / this.cellWidth;
            const endX = startX + (width / this.cellWidth);
            const startY = y / this.cellHeight;
            const endY = startY + (height / this.cellHeight);

            for (let i = startX; i < endX; i += 1) {
                for (let j = startY; j < endY; j += 1) {
                    const loc = (i * this.cellsPerColumn) + j;

                    if (this.cellRecord[loc] !== image.id) {
                        this.$set(this.cellRecord, loc, image.id);
                    }
                }
            }
        },

        getCompressedRecord() {
            // might be able to just do this:
            // return this.cellRecord;
            let compressed = [];
            let lastCount = -1;

            for (let i = 0; i < this.cellCount; i += 1) {
                const curr = this.cellRecord[i];
                if ((i + 1) === this.cellCount || this.cellRecord[i + 1] !== curr) {
                    compressed = compressed.concat([curr, i - lastCount]);
                    lastCount = i;
                }
            }

            return compressed;
        },

        expandRecord(compressedRecord) {
            const record = new Array(this.cellCount);
            let total = 0;

            for (let i = 0; i < compressedRecord.length; i += 2) {
                const id = compressedRecord[i];
                const count = compressedRecord[i + 1];
                record.fill(id, total, total + count);
                total += count;
            }

            return record;
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
