<script setup>
import Phaser from 'phaser';

const container = ref(null);

function preload() {
    this.load.image('sky', '/phaser/sky.png');
    this.load.image('ground', '/phaser/platform.png');
    this.load.image('star', '/phaser/star.png');
    this.load.image('bomb', '/phaser/bomb.png');
    this.load.spritesheet(
        'dude',
        '/phaser/dude.png',
        {frameWidth: 32, frameHeight: 48},
    );
}

let bombs;
let stars;
let player;
let cursors;
let score = 0;
let scoreText;

const collectStar = (plyr, star) => {
    star.disableBody(true, true);

    score += 10;
    scoreText.setText(`Score: ${score}`);

    if (stars.countActive(true) === 0) {
        stars.children.iterate((child) => {
            child.enableBody(true, child.x, 0, true, true);
        });

        const x = (plyr.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        const bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
};

function hitBomb(plyr) {
    this.physics.pause();
    plyr.setTint(0xff0000);
    plyr.anims.play('turn');
}

function create() {
    cursors = this.input.keyboard.createCursorKeys();

    this.add.image(400, 300, 'sky');

    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    // create player
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1,
    });

    this.anims.create({
        key: 'turn',
        frames: [{key: 'dude', frame: 4}],
        frameRate: 20,
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1,
    });

    // stars
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: {x: 12, y: 0, stepX: 70},
    });

    stars.children.iterate((child) => {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    // bombs
    bombs = this.physics.add.group();

    scoreText = this.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#000'});

    // physics
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);

        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-310);
    }
}

onMounted(() => {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 300},
                debug: false,
            },
        },
        scene: {
            preload,
            create,
            update,
        },
        parent: container.value,
        callbacks: {
            postBoot(game) {
                // https://stackoverflow.com/a/58381474
                game.canvas.style.width = '100%'; // eslint-disable-line no-param-reassign
                game.canvas.style.height = '100%'; // eslint-disable-line no-param-reassign
            },
        },
    };

    const game = new Phaser.Game(config); // eslint-disable-line
});
</script>

<template>
    <div ref="container" class="prose mx-auto my-12 prose-red" />
</template>