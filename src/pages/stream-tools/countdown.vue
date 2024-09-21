<script setup>
seo();
definePageMeta({
    layout: 'tool',
});

const route = useRoute();

const {
    width = 400,
    height = 200,
    autoStart = true,
    fontSize,
    fontColor = '000000',
    backgroundColor = '00ff00',
    label,
    d = 0,
    h = 0,
    m = 0,
    s = 0,
    controls = false,
} = route.query;

const countdownSeconds = d * 86400 + h * 3600 + m * 60 + s;
const timer = countdownSeconds > 0 ? ref(countdownSeconds) : ref(3600);
const output = computed(() => {
    const days = `${timer.value > 86400 ? Math.floor(timer.value / 86400) : 0}`.padStart(2, '0');
    const hours = `${timer.value > 3600 ? Math.floor(timer.value / 3600) : 0}`.padStart(2, '0');
    const minutes = `${timer.value > 60 ? Math.floor(timer.value / 60) : 0}`.padStart(2, '0');
    const seconds = `${Math.floor(timer.value % 60)}`.padStart(2, '0');
    return `${days}:${hours}:${minutes}:${seconds}`;
});
let timeout = null;

const countdown = () => {
    timer.value -= 1;
    if (timer.value > 0) {
        timeout = setTimeout(countdown, 1000);
    }
};

const reset = () => {
    timer.value = countdownSeconds;
};

const start = () => {
    countdown();
};

const stop = () => {
    clearTimeout(timeout);
};

if (autoStart) {
    start();
}
</script>

<template>
    <div
        :style="{
            width: `${width}px`,
            height: `${height}px`,
            fontSize: fontSize ? `${fontSize}px` : '3rem',
            backgroundColor: `#${backgroundColor}`,
            color: `#${fontColor}`,
        }"
        class="flex flex-col items-center justify-center gap-4 font-mono"
    >
        <p v-if="timer > 0 && label">{{ label }} in</p>
        <p v-if="timer > 0">{{ output }}</p>
        <p v-else>{{ label ?? 'TIME\'S UP' }}</p>
    </div>
    <div v-if="controls" class="fixed top-0 right-0">
        <div @click="start">start</div>
        <div @click="stop">stop</div>
        <div @click="reset">reset</div>
    </div>
</template>
