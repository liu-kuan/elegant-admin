<template>
  <PageView>
    <template #header>
      <FilterForm @filter="onFilter" @reset="reset">
        <el-form-item label="操作系统">
          <el-select v-model="filterFormData.appOsType" style="width: 120px">
            <el-option
              :label="AppOsType.getString(AppOsType.All)"
              :value="AppOsType.All"
            />
            <el-option
              :label="AppOsType.getString(AppOsType.iOS)"
              :value="AppOsType.iOS"
            />
            <el-option
              :label="AppOsType.getString(AppOsType.Android)"
              :value="AppOsType.Android"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="下载渠道"
          v-if="filterFormData.appOsType !== AppOsType.All"
        >
          <el-select
            v-if="filterFormData.appOsType === AppOsType.iOS"
            v-model="filterFormData.appChannel"
            clearable
            class="w-40!"
          >
            <el-option label="app_store" value="app_store" />
          </el-select>

          <el-input
            v-else
            v-model.number="filterFormData.appChannel"
            placeholder="请输入下载渠道"
            class="w-40!"
          />
        </el-form-item>
      </FilterForm>
    </template>

    <template #body>
      <SVTable
        title="App 版本配置"
        :data="appConfigList"
        :columns="tableColumns"
        :loading="isLoading"
        :refresh="getAppConfigList"
      >
        <template #_operation>
          <el-button
            type="primary"
            :icon="PlusCircleOutlined"
            @click="onUpsert()"
          >
            添加版本
          </el-button>
        </template>

        <template #downloadUrl="{ row: { downloadUrl } }">
          <DownloadUrl :url="downloadUrl" />
        </template>

        <template #enable="{ row: { enable } }">
          <el-text v-if="enable" type="primary">启用</el-text>
          <el-text v-else type="danger">不启用</el-text>
        </template>

        <template #custom:operation="{ row }">
          <EleRow justify-content="center">
            <el-button
              size="small"
              type="primary"
              :icon="FormOutlined"
              @click="onUpsert(row)"
              >编辑</el-button
            >

            <el-button
              size="small"
              type="danger"
              :icon="DeleteOutlined"
              @click="onDelete(row.id!)"
              >删除</el-button
            >
          </EleRow>
        </template>
      </SVTable>
    </template>

    <template #pagination>
      <SVPagination
        :total="totalCount"
        v-model="getAppConfigListReq"
        @change="getAppConfigList"
      />
    </template>

    <UpsertDialog
      :config="currentAppConfig"
      v-model:show="isShowUpsertDialog"
      @success="
        () => {
          getAppConfigListReq.page = 0
          getAppConfigList()
        }
      "
    />
  </PageView>
</template>

<script setup lang="ts">
import {
  apiDeleteAppConfig,
  apiGetAppConfigList,
} from '@/api/software/app-config'
import EleDialog from '@/components/EleDialog'
import { pageSizes } from '@/config/pagination'
import useFilterForm from '@/hooks/use-filter-form'
import RouteNames from '@/router/route-names'
import {
  AppOsType,
  type AppConfig,
  type GetAppConfigListReq,
} from '@/types/software/app-config'
import {
  DeleteOutlined,
  FormOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons-vue'
import UpsertDialog from './components/UpsertDialog.vue'
import tableColumns from './table-columns'

defineOptions({
  name: RouteNames.Software_AppConfig,
})

const getAppConfigListReq: GetAppConfigListReq = reactive({
  appOsType: AppOsType.All,
  appChannel: '',
  page: 0,
  pageSize: pageSizes[0],
})

const { filterFormData, reset, filter } = useFilterForm(getAppConfigListReq, [
  'appOsType',
  'appChannel',
])

watch(
  () => filterFormData.appOsType,
  (value) => {
    if (value === AppOsType.iOS) {
      filterFormData.appChannel = 'app_store'
    } else {
      filterFormData.appChannel = ''
    }
  },
)

const appConfigList = ref<AppConfig[]>([])
const totalCount = ref(0)
const isLoading = ref(false)

const getAppConfigList = async () => {
  try {
    isLoading.value = true

    const data = await apiGetAppConfigList(getAppConfigListReq)
    appConfigList.value = data.items
    totalCount.value = data.totalCount
  } catch (error) {
    ElMessage.error(`获取 App 配置列表失败，原因：${error}`)
  } finally {
    isLoading.value = false
  }
}
getAppConfigList()

const onFilter = () => {
  filter()
  getAppConfigListReq.page = 0
  getAppConfigList()
}

// #region 更新 App 配置
const isShowUpsertDialog = ref(false)

const currentAppConfig = ref<AppConfig>()

const onUpsert = (appConfig?: AppConfig) => {
  isShowUpsertDialog.value = true

  currentAppConfig.value = appConfig
}
// #endregion

// #region 删除 App 配置
const onDelete = (id: number) => {
  EleDialog('删除 App 版本配置', '确定删除该条配置吗？', {
    confirmButtonType: 'danger',
    beforeClose: async (action, { isLoadingConfirm }, done) => {
      if (action === 'confirm') {
        try {
          isLoadingConfirm.value = true

          await apiDeleteAppConfig(id)

          done()
          getAppConfigList()
        } catch (error) {
          ElMessage.error(`删除 App 配置失败，原因：${error}`)
        } finally {
          isLoadingConfirm.value = false
        }
      } else {
        done()
      }
    },
    attrs: {
      width: 360,
    },
  })
}
// #endregion
</script>
./table-columns
