<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useOsTheme, darkTheme } from 'naive-ui'

export default defineComponent({
  setup () {
    const osThemeRef = useOsTheme()
    return {
      theme: computed(() => (osThemeRef.value === 'dark' ? darkTheme : null)),
      osTheme: osThemeRef
    }
  }
})
</script>

<template>
  <n-config-provider :theme="theme">
    <div class="section0">
      <div class="absolute">
        <div class="text">
          <h1 class="intro-text margin">Introducing Sora: Creating video from text</h1>
          <n-button class="margin">Default</n-button>
        </div>
      </div>
    </div>
    <div class="section1">
      <n-grid cols="1 s:2 m:3" responsive="screen">
      <n-grid-item class="margin1">
        <h3 class="light-green">
          Pioneering research on the path to AGI
        </h3>
      </n-grid-item>
      <n-grid-item class="margin1">
        <h3 class="green">
          2
        </h3>
      </n-grid-item>
      <n-grid-item class="margin1">
        <h3 class="light-green">
          3
        </h3>
      </n-grid-item>
      </n-grid>
    </div>
  </n-config-provider>
</template>

<style lang="scss" scoped>
.section0, .absolute {
  height: calc(100vh - 42px);
  width: 100vw;
}
.section1 {
    //height: 100vh;
  width: 100vw;
}
.section0 {
  background-image: url("../assets/HomePage/background.webp");
  position: relative;
  background-position: center;
  background-size: cover;
}

.absolute {
  position: absolute;
  background: #0000008f;
  z-index: 20;
}

.text {
  position: absolute;
  bottom: .8125rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.intro-text {
  font-size: 2.625rem;
  line-height: 110%;
  letter-spacing: -.01em;
  text-align: left;
  color: white;
}
.margin {
  margin-left: 16px;
  margin-right: 16px;
}
.margin1 {
  margin-left: 16px;
  margin-top: 48px;
  text-align: left;
  font-size: 1.3rem;
  line-height: 130%;
  letter-spacing: 0;
}
@media (min-width: 1280px) {
  .margin {
    margin-left: 15rem;
    margin-right: 15rem;
  }
  .margin1 {
  margin-left: 24px;
  margin-top: 60px;
  font-size: 1.75rem;
  }
  .intro-text {
    font-size: 4.5625rem;
    line-height: 100%;
  }
}
@media (min-width: 744px) {
  .intro-text {
    font-size: 3.4375rem;
    line-height: 110%;
    letter-spacing: -.02em;
  }
  .margin1 {
   font-size: 1.5rem;
   line-height: 120%;
   letter-spacing: -.01em;
  }
}
</style>