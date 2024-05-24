<script lang="ts">
import { defineComponent, h, ref, Component, computed } from 'vue'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { useOsTheme, darkTheme } from 'naive-ui'
// import type { GlobalTheme } from 'naive-ui'
import {
  HomeOutline,
  AlbumsOutline,
  BookOutline,
  PersonOutline,
  PeopleCircleOutline,
  HandRightOutline,
  ChatbubbleEllipsesOutline,
} from '@vicons/ionicons5'
import {
  Vote20Regular,
} from '@vicons/fluent'
import {
  InteractionOutlined,
} from '@vicons/antd'
import {
  AdminPanelSettingsOutlined,
  ReportProblemOutlined,
  IntegrationInstructionsOutlined,
} from '@vicons/material'
function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        'a',
        {
          href: '/',
          rel: 'noopenner noreferrer'
        },
        '首页'
      ),
    key: 'HomePage',
    icon: renderIcon(HomeOutline)
  },
  {
    label: () =>
      h(
        'a',
        {
          href: '/Gallery',
          rel: 'noopenner noreferrer'
        },
        '摄影画廊'
      ),
    key: 'Gallery',
    icon: renderIcon(AlbumsOutline),
  },
  {
    label: () =>
      h(
        'a',
        {
          href: '/Documents',
          rel: 'noopenner noreferrer'
        },
        '帮助文档'
      ),
    key: 'Documents',
    icon: renderIcon(BookOutline),
  },
  {
    label: '用户中心',
    key: 'UserCenter',
    icon: renderIcon(PeopleCircleOutline),
    children: [
      {
        label: () =>
          h(
            'a',
            {
              href: '/Players',
              rel: 'noopenner noreferrer'
            },
            '玩家系统'
          ),
        key: 'Players',
        icon: renderIcon(PersonOutline)
      },
      {
        label: () =>
          h(
            'a',
            {
              href: '/Vote',
              rel: 'noopenner noreferrer'
            },
            '表决大厅'
          ),
        key: 'Vote',
        icon: renderIcon(Vote20Regular)
      },
      {
        label: () =>
          h(
            'a',
            {
              href: '/Material',
              rel: 'noopenner noreferrer'
            },
            '材料申请'
          ),
        key: 'Material',
        icon: renderIcon(HandRightOutline)
      },
    ]
  },
  {
    label: '互动中心',
    key: 'InteraCenter',
    icon: renderIcon(InteractionOutlined),
    children: [
      {
        label: () =>
          h(
            'a',
            {
              href: '/Chat',
              rel: 'noopenner noreferrer'
            },
            '聊天记录'
          ),
        key: 'Chat',
        icon: renderIcon(ChatbubbleEllipsesOutline)
      },
      {
        label: () =>
          h(
            'a',
            {
              href: '/Permission',
              rel: 'noopenner noreferrer'
            },
            '权限公开'
          ),
        key: 'Permission',
        icon: renderIcon(AdminPanelSettingsOutlined)
      },
      {
        label: () =>
          h(
            'a',
            {
              href: '/Issue',
              rel: 'noopenner noreferrer'
            },
            '漏洞提交'
          ),
        key: 'Issue',
        icon: renderIcon(ReportProblemOutlined)
      },
    ]
  },
  {
    label: () =>
      h(
        'a',
        {
          href: '/Integrate',
          rel: 'noopenner noreferrer'
        },
        '灵动整合'
      ),
    key: 'Integrate',
    icon: renderIcon(IntegrationInstructionsOutlined)
  },
]

export default defineComponent({
  setup () {
    const osThemeRef = useOsTheme()
    return {
      activeKey: ref<string | null>(null),
      menuOptions,
      theme: computed(() => (osThemeRef.value === 'dark' ? darkTheme : null)),
      osTheme: osThemeRef
    }
  }
})


</script>

<template>
  <n-config-provider :theme="theme" inline-theme-disabled>
    <n-global-style />
    <n-back-top/>
    <n-card :bordered="false" content-style="padding: 0;">
    <n-menu
      v-model:value="activeKey"
      mode="horizontal"
      :options="menuOptions"
      responsive
    />
    </n-card>
  </n-config-provider>

</template>


<style scoped>

</style>