<template>
  <div class="app-view-header">
    <a-space>
      <a-button
        type="primary"
        @click="router.push({ name: 'edit-staff' })"
      >
        新增
      </a-button>
    </a-space>

    <div class="app-view-header-sum">
      总计: 2
    </div>
  </div>

  <!-- 表格 -->
  <a-table
    :data-source="dataList"
    :columns="columns"
    :loading="loading"
    row-key="id"
    :row-class-name="rowClassName"
    @resize-column="onResizeColumn"
    @change="changeTable"
  >
    <template #bodyCell="{ column, record }">
      <!-- 账号名 -->
      <template v-if="column.key === 'name'">
        {{ record.name || '-' }}
      </template>

      <!-- 操作 -->
      <template v-if="column.key === 'operation'">
        <a-space>
          操作
        </a-space>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { message, TableColumnsType } from 'ant-design-vue';
import useTable from '@/hooks/use-table';
import { staffApi } from '@/api/index';
import { to, buildErrorMsg } from '@/utils/index';
import type { IStaff } from '@/types/staff';

const router = useRouter();

/*
 * 列表项
 */
const columns = ref<TableColumnsType>([
  {
    title: '账号名',
    key: 'name',
    resizable: true,
    width: 150,
    fixed: 'left',
  },
  {
    title: '操作',
    key: 'operation',
    resizable: true,
    width: 150,
    fixed: 'right',
  },
]);

/* 列表 */
const dataList = ref<IStaff[]>([]);
const {
  loading, setGetDataFunction, pagination, changeTable, onResizeColumn, rowClassName,
} = useTable();

/* 查询列表 */
const getList = async () => {
  loading.value = true;
  const params = {
    pageNo: pagination.value.current,
    pageSize: pagination.value.pageSize,
  };
  const [err, res] = await to(staffApi.getList(params));
  loading.value = false;

  if (err) {
    message.error(buildErrorMsg({ err, defaultMsg: '查询失败' }));
    return;
  }

  dataList.value = res.data.list;
  pagination.value.total = res.data.total;
  pagination.value.current = res.data.pageNo;
};
setGetDataFunction(getList);

/*
 * 进入页面
 */
onMounted(() => {
  getList();
});

</script>

<style scoped></style>
