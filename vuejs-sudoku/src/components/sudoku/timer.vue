<template>
  <section class="timer">
    <span>{{ ("0" + Math.floor((this.time / 60) % 60)).slice(-2) }}:</span>
    <span>{{ ("0" + Math.floor(this.time % 60)).slice(-2) }}</span>

    <i v-if="timerIsOn" class="fa-solid fa-pause" @click="onPause"></i>
    <i v-if="!timerIsOn" class="fa-solid fa-play" @click="onPlay"></i>
  </section>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      time: 0,
      timer: null,
      timerIsOn: true
    };
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.time++;
      }, 1000);
    },

    stopTimer() {
      clearInterval(this.timer);
    },

    onPause() {
      this.timerIsOn = false;
      this.stopTimer();
    },

    onPlay() {
      this.timerIsOn = true;
      this.startTimer();
    }
  },

  mounted() {
    if (this.timerIsOn) this.startTimer();
  }
};
</script>
