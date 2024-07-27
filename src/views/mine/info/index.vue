<template>
  <div class="card">
    <EleRow class="mb-2.5">
      您的资料
      <el-tooltip
        :content="`暂不支持由用户编辑自己的资料，如需更改请联系${defaultAdminUsername}`"
        placement="top"
      >
        <MdiInformation class="info" />
      </el-tooltip>
    </EleRow>

    <div class="user-info">
      <div class="name">{{ username }}</div>
      <div class="email">Email: {{ email }}</div>

      <EleSpacer />

      <div class="role">角色: xxx</div>

      <el-avatar :size="66">{{ username[0] }}</el-avatar>
    </div>

    <div class="permission">
      <EleRow class="mt-5 mb-2.5">
        您的权限
        <el-tooltip
          :content="`您当前拥有以下的权限，如需更多权限请联系${defaultAdminUsername}`"
          placement="top"
        >
          <MdiInformation class="info" />
        </el-tooltip>
      </EleRow>
    </div>

    <BackTop />
  </div>
</template>

<script setup lang="ts">
import { defaultAdminUsername } from '@/config/role'
import useUserStore from '@/stores/user'
import MdiInformation from '~icons/mdi/information'

const {
  info: { username, email },
} = useUserStore()
</script>

<style lang="scss" scoped>
.card {
  @include card;
}

.info {
  margin-left: 4px;
  color: $text-color-4;
  cursor: pointer;
  outline: none;

  &:hover {
    color: $color-primary;
  }
}

.user-info {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 360px;
  height: 120px;
  padding: 20px;
  background-color: $fill-color-light;
  border-radius: $border-radius-2;

  .name {
    font-size: 20px;
  }

  .role {
    display: flex;
    align-items: center;
    color: $text-color-2;
  }

  .email {
    margin-top: 5px;
    font-size: 16px;
    color: $text-color-3;
  }

  .el-avatar {
    position: absolute;
    right: 20px;
    font-size: 28px;
  }
}

.permission {
  .box {
    width: 500px;
    padding: 6px 10px;
    border: 1px solid $border-color;
    border-radius: $border-radius-2;

    .title {
      position: relative;
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      font-weight: bold;

      &::after {
        position: absolute;
        bottom: -10px;
        left: -10px;
        width: calc(100% + 20px);
        height: 0.5px;
        content: '';
        background-color: $border-color;
      }
    }

    .text {
      display: flex;
      justify-content: center;
    }

    .el-tree {
      font-size: 16px;
      background-color: transparent;

      :deep(.el-tree-node__content) {
        margin-top: 4px;
      }
    }
  }
}
</style>
