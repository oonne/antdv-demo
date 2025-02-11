<template>
  <div class="container">
    <div class="time">
      <div class="clock">
        {{ time }}
      </div>
      <div class="calendar">
        {{ date }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useInterval from '@/hooks/use-interval';

const time = ref('');
const date = ref('');

const updateDateTime = () => {
  const now = new Date();

  // 更新时间
  time.value = now.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  // 更新日期
  date.value = now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
  });
};

/* 定期刷新token */
useInterval(() => {
  updateDateTime();
}, 1000);
</script>

<style scoped>
.container {
  width: 100%;
  height: calc(100vh
  - var(--header-height)
  - var(--app-view-margin) * 2
  - var(--app-view-padding) * 2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.time {
  width: 300px;
  margin: 0 auto;
}

.clock {
  color: #ccc;
  text-align: center;
  font-family: 'Dengl';
  font-size: 84px;
  line-height: 88px;
}

.calendar {
  color: #ccc;
  text-align: center;
  font-family: 'Deng';
  font-size: 28px;
  line-height: 30px;
}
</style>
