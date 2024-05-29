<script setup lang="ts">
import {darkTheme, useOsTheme} from 'naive-ui'
import {computed, onMounted, ref} from "vue";
import axios from 'axios';

const osThemeRef = useOsTheme()
const theme = computed(() => (osThemeRef.value === 'dark' ? darkTheme : null))
const texts = ['灵动Minecraft：', '一个', '有爱的', '公益', 'MC服务器', '社区']
const handleClick = (param:string) => {
  // 使用 JavaScript 进行页面导航
  window.location.href = `/${param}/`;
};


interface TableData {
  [key: string]: any[];
}

const data = ref<TableData>({});

const get_data = async (tableName: string) => {
  try {
    const response = await axios.get(`/data/${tableName}`);
    data.value[tableName] = response.data;

    // data.value[tableName] = data.value[tableName].slice(-4);
    const dataSlice = data.value[tableName].slice(-4);
    data.value[tableName] = dataSlice.reverse();
    console.log(data.value[tableName]);
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  // 在这里指定要查询的表名
  const tableNames = ['slogan', 'introduce']; // 或者从其他地方获取表名列表
  await Promise.all(tableNames.map(tableName => get_data(tableName)));
});

</script>

<template>
  <n-config-provider :theme="theme" inline-theme-disabled style="display: flex;flex-direction: column;align-items: center">
    <div class="section0">
      <video class="absolute" style="object-fit: cover;" preload="auto" loop disableremoteplayback disablepictureinpicture autoplay playsinline muted>
        <source src="../assets/HomePage/Museum.mp4" type="video/mp4"/>
      </video>
      <div class="absolute">
        <div class="text container">
          <n-space class="margin" style="gap: 0">
            <n-h1 class="intro-text" v-for="text in texts" :key="text">{{ text }}</n-h1>
          </n-space>
          <n-button class="margin margin1" style="color: white">点击此处加入我们</n-button>
        </div>
      </div>
    </div>
    <div class="section1">
      <n-space style="gap: 48px 32px;" class="gap container" justify="space-between">
        <n-space v-for="item in data['slogan']" :key="item.id" style="gap: 16px" vertical>
          <n-button @click="handleClick('Slogan/' + item.link)" class="margin2" text>
            {{ item.title }}
          </n-button>
          <n-button @click="handleClick('Slogan/' + item.link)" dashed>{{ item.button }}</n-button>
        </n-space>
      </n-space>
      <n-divider style="padding:0 32px "/>
    </div>

    <div class="section1">
      <n-flex class="container" style="width: 100%;" justify="space-between">
        <n-h1 class="gap title">最新消息</n-h1>
        <n-button text class="gap title">查看所有</n-button>
      </n-flex>
      <n-el class="gap flex container" justify="space-between" >
        <n-flex class="img" v-for="item in data['introduce']" :key="item.id" vertical>
          <img @click="handleClick('Introduce/' + item.link)" :src="'http://127.0.0.1:5000/image/' + item.link + '.png'" alt="111" class="modeCard"/>

          <n-h3 @click="handleClick('Introduce/' + item.link)" style="max-width: 17rem" class="modeCard">
            {{ item.title }}
          </n-h3>
        </n-flex>
      </n-el>
    </div>
  </n-config-provider>
</template>

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.container {
  max-width: 1500px;
  margin-right: auto;
  margin-left: auto;
}
.section0, .absolute {
  height: calc(100vh - 42px);
  max-height: 1000px;
  width: 100%;
}
.section1, .absolute {
  display: flex;
  flex-direction: column;
  align-items: center
}
.section1 {
  width: 100%;
}
.section0 {
  background-image: url('../assets/HomePage/Museum.png');
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
  bottom: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.title {
  margin-top: 0;
  margin-bottom: 0;
}
.intro-text {
  color: white;
  font-size: 2.5rem;
  line-height: 110%;
  letter-spacing: -.01em;
  text-align: left;
  margin-bottom: 0;
}
.margin {
  margin-left: 16px;
  margin-right: 16px;
}
.margin1 {
  margin-top: 36px;
  margin-bottom: 12px;
}
.margin2 {
  font-size: 1.3rem;
}
.gap {
  padding:1rem
}
.img {
  width: 100%;
}
img {
  width: 100%;
}
@media (min-width: 744px) and (max-width: 1280px) {
  .intro-text {
    font-size: 3.4rem;
    line-height: 110%;
    letter-spacing: -.02em;
  }
  .margin2 {
    font-size: 1.6rem;
    white-space: nowrap;
  }
  .gap {
    padding:1rem
  }
  .img {
    width: 48%;
  }
}
.modeCard{
  transition: all 0.2s;
}

.modeCard:hover{
  transition: 0.3s;
  transform: scale(1.04);
}
@media (min-width: 1280px) {
  .margin {
    margin-left: 15rem;
    margin-right: 15rem;
  }
  .margin1 {
    margin-top: 48px;
    margin-bottom: 24px;
  }
  .margin2 {
  font-size: 1.8rem;
  }
  .gap {
    padding:2rem
  }
  .intro-text {
    font-size: 4rem;
    line-height: 100%;
  }
  .img {
    width: 24%;
  }
}
</style>