<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { darkTheme, useOsTheme } from 'naive-ui';
import DOMPurify from 'dompurify';

const osThemeRef = useOsTheme();
const theme = computed(() => (osThemeRef.value === 'dark' ? darkTheme : undefined));

const route = useRoute();
const link = route.params.link;
const table_name = route.params.table_name;

const articleContent = ref<string>('');
const articleTitle = ref<string>('');

onMounted(async () => {
  try {
    const response = await axios.get(`/data/${table_name}/${link}`);
    if (response.data && response.data.length > 0) {
      articleTitle.value = response.data[0].title;
      articleContent.value = response.data[0].content;
      insertImages(articleContent.value);
    } else {
      console.error('文章内容为空');
    }
  } catch (error) {
    console.error('获取文章内容时出错：', error);
  }
});

const insertImages = (content: string) => {
  const articlesContainer = document.getElementById('articles');
  if (!articlesContainer) return;

  // 匹配 [img_xxx] 标记并提取 xxx.png
  const imgRegex = /\[img_(.*?)\]/g;
  let match;

  // 初始的部分是文章内容的开头
  let startIndex = 0;

  // 循环处理匹配的图片标记
  while ((match = imgRegex.exec(content)) !== null) {
    // 获取图片标记的开始位置和图片文件名
    const tag = match[0]; // 完整的标记，如 [img_xxx]
    const filename = match[1]; // 文件名，如 xxx.png

    // 创建文章内容元素，前面的文本部分
    const textPart = content.substring(startIndex, match.index);
    const cleanTextPart = DOMPurify.sanitize(textPart);
    const textElement = document.createElement('div');
    textElement.innerHTML = `<n-text style="font-size: 1.3rem">${cleanTextPart}</n-text>`;
    articlesContainer.appendChild(textElement);

    // 创建图片元素
    const imageContainer = document.createElement('div');
    imageContainer.style.display = 'flex';
    imageContainer.style.flexDirection = 'column';
    imageContainer.style.alignItems = 'center';
    imageContainer.style.width = '100%';
    articlesContainer.appendChild(imageContainer);

    const imageElement = document.createElement('img');
    imageElement.src = `http://192.168.50.163:5000/image/${table_name}/${link}/${filename}.png`;
    imageElement.alt = "内联图片";
    imageElement.style.width = '70vw';
    imageElement.style.borderRadius = '1%';
    imageElement.style.marginTop = '2rem';
    imageElement.style.marginBottom = '2rem';
    imageContainer.appendChild(imageElement);

    // 更新开始位置，准备处理下一个部分
    startIndex = imgRegex.lastIndex;
  }

  // 处理文章内容的最后部分
  const remainingText = content.substring(startIndex);
  const cleanRemainingText = DOMPurify.sanitize(remainingText);
  const remainingTextElement = document.createElement('div');
  remainingTextElement.innerHTML = `<n-text style="font-size: 1.3rem">${cleanRemainingText}</n-text>`;
  articlesContainer.appendChild(remainingTextElement);
};
</script>


<template>
  <n-config-provider :theme="theme" inline-theme-disabled style="display: flex;flex-direction: column;align-items: center">
    <n-h1 class="h1">{{articleTitle}}</n-h1>
    <div id="articles"></div>
  </n-config-provider>

</template>



<style scoped>
#articles {
  width: calc(80vw);
  display: flex;
  flex-direction: column;
  align-items: flex-start;

}
.h1{
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  width: calc(80vw);
}

</style>