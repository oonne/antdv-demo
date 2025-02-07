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
      总计: {{ pagination.total }}
    </div>
  </div>

  <!-- 表格 -->
  <a-table
    :data-source="dataList"
    :columns="columns"
    :loading="loading"
    row-key="id"
    :row-class-name="rowClassName"
    :pagination="pagination"
    @resize-column="onResizeColumn"
    @change="changeTable"
  >
    <!-- 搜索 -->
    <!-- <template
      #customFilterDropdown="{
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        column }"
    >
      <div class="table-filter-dropdown">
        <a-input-search
          placeholder="搜索"
          @search="getList"
        />
      </div>
    </template> -->

    <template #bodyCell="{ column, record, index }">
      <!-- 序号 -->
      <template v-if="column.key === 'index'">
        {{ index + 1 }}
      </template>

      <!-- 账号名 -->
      <template v-if="column.key === 'name'">
        {{ record.name || '-' }}
      </template>

      <!-- 是否启用 -->
      <template v-if="column.key === 'isActive'">
        <a-switch
          v-model:checked="record.isActive"
          size="small"
          @change="onChangeActive(record)"
        />
      </template>

      <!-- 更新时间 -->
      <template v-if="column.key === 'updatedAt'">
        {{ dayjs(record.updatedAt).format('YYYY-MM-DD HH:mm:ss') || '-' }}
      </template>

      <!-- 操作 -->
      <template v-if="column.key === 'operation'">
        <a-button
          size="small"
          type="link"
          @click="router.push({ name: 'edit-staff', query: { staffId: record.staffId } })"
        >
          编辑
        </a-button>
        <a-button
          size="small"
          type="link"
          danger
          @click="onDelete(record)"
        >
          删除
        </a-button>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { message, TableColumnsType } from 'ant-design-vue';
import dayjs from 'dayjs';
import useTable from '@/hooks/use-table';
import { staffApi } from '@/api/index';
import { to, buildErrorMsg, Feedback } from '@/utils/index';
import type { IStaff } from '@/types/staff';

const router = useRouter();
const { confirmModal } = Feedback;

/*
 * 列表项
 */
const columns = ref<TableColumnsType>([
  {
    title: '#',
    key: 'index',
    width: 50,
    fixed: 'left',
  },
  {
    title: '账号名',
    key: 'name',
    sorter: true,
    customFilterDropdown: true,
    resizable: true,
    width: 150,
  },
  {
    title: '是否启用',
    key: 'isActive',
    sorter: true,
    filters: [
      {
        text: '启用',
        value: true,
      },
      {
        text: '禁用',
        value: false,
      },
    ],
    filterMultiple: false,
    resizable: true,
    width: 150,
  },
  {
    title: '更新时间',
    key: 'updatedAt',
    sorter: true,
    resizable: true,
    width: 150,
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
  loading,
  setGetDataFunction,
  pagination,
  filters,
  sorter,
  changeTable,
  onResizeColumn,
  rowClassName,
} = useTable();

/* 查询列表 */
const getList = async () => {
  loading.value = true;
  const params: any = {
    pageNo: pagination.value.current,
    pageSize: pagination.value.pageSize,
  };
  if (filters.value.name) {
    params.name = filters.value.name;
  }
  if (filters.value.isActive?.length === 1) {
    [params.isActive] = filters.value.isActive;
  }
  if (sorter.value.columnKey) {
    params.sortField = sorter.value.columnKey;
    params.sortOrder = sorter.value.order === 'ascend' ? 'asc' : 'desc';
  }

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

/*
 * 启用/禁用
 */
const onChangeActive = async (record: IStaff) => {
  const [err] = await to(staffApi.updateStaff(record));
  if (err) {
    message.error(buildErrorMsg({ err, defaultMsg: '操作失败' }));
    dataList.value = dataList.value.map((item) => {
      if (item.staffId === record.staffId) {
        return {
          ...item,
          isActive: !record.isActive,
        };
      }
      return item;
    });
  }
};

/*
 * 删除
 */
const onDelete = async (record: IStaff) => {
  const confirm = await confirmModal({
    title: '删除',
    content: `确定删除 ${record.name} 吗？`,
  });

  if (!confirm) {
    return;
  }

  const [err] = await to(staffApi.deleteStaff({ staffId: record.staffId }));
  if (err) {
    message.error(buildErrorMsg({ err, defaultMsg: '删除失败' }));
    return;
  }

  message.success('删除成功');
  getList();
};
</script>

<style scoped></style>
