<script setup lang="ts">

import {onMounted, ref} from "vue";
import axios from "axios";

interface TableData {
  [key: string]: any[];
}
interface link {
  [key: string]: any[];
}

const data = ref<TableData>({});
const data1 = ref<link>({});

const get_data = async (tableName: string, link: string) => {
  try {
    const response = await axios.get(`/${tableName}/${link}`);
    data.value[tableName] = response.data;
    data1.value[link] = response.data;
    console.log(data.value[tableName]);
    console.log(data.value[link]);
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  // 在这里指定要查询的表名
  const tableNames = ['slogan', 'introduce']; // 或者从其他地方获取表名列表
  const link = ['slogan', 'introduce']; // 或者从其他地方获取表名列表
  await Promise.all(tableNames.map(tableName => get_data(tableName)));
});
</script>

<template>
<h1>11111111111111</h1>
</template>

<style scoped>

</style>