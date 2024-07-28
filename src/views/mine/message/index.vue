<template>
  <el-tabs v-model="activeTab" type="border-card">
    <el-tab-pane
      v-for="tab in tabList"
      :key="tab.label"
      :label="tab.label"
      :name="tab.label"
    >
      <el-table :data="tab.tableData" border empty-text="暂无消息">
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column prop="content" label="内容" />
        <el-table-column prop="time" label="时间" width="160" />
        <el-table-column prop="isRead" label="状态" width="80">
          <template #default="scope">
            <div v-if="scope.row.state">已读</div>
            <div v-else style="color: red">未读</div>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import RouteNames from '@/router/route-names'

defineOptions({
  name: RouteNames.My_Messages,
})

enum TabLabel {
  All = '所有',
  Read = '已读',
  Unread = '未读',
}

const activeTab = ref(TabLabel.All)

interface TableData {
  content: string
  time: string
  // 是否已读
  state: boolean
}

interface Tab {
  label: TabLabel
  tableData: TableData[]
}

const tableData: TableData[] = [
  {
    content: '您有一个 app 配置更新待处理，请尽快处理',
    time: '2023-06-26 16:50',
    state: true,
  },
  {
    content: '您有 20 个社区动态待审核，请尽快处理',
    time: '2023-06-26 16:50',
    state: false,
  },
  {
    content: '您有 20 个社区动态待审核，请尽快处理',
    time: '2023-06-26 16:50',
    state: true,
  },
  {
    content: '您有一个 app 配置更新待处理，请尽快处理',
    time: '2023-06-26 16:50',
    state: false,
  },
  {
    content: '您有一个 app 配置更新待处理，请尽快处理',
    time: '2023-06-26 16:50',
    state: false,
  },
]

const tabList: Tab[] = [
  {
    label: TabLabel.All,
    tableData,
  },
  {
    label: TabLabel.Read,
    tableData: tableData.filter((item) => {
      return item.state
    }),
  },
  {
    label: TabLabel.Unread,
    tableData: tableData.filter((item) => {
      return !item.state
    }),
  },
]
</script>
