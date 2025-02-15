<template>
  <div class="app-view-header">
    <a-space>
      <a-button
        type="primary"
        @click="router.push({ name: 'edit-img' })"
      >
        新增图片
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
    <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, column }">
      <div class="table-filter-dropdown">
        <template v-if="column.key === 'name' || column.key === 'remark'">
          <a-input-search
            :value="selectedKeys[0]"
            size="small"
            allow-clear
            @change="(e: any) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @search="confirm"
          />
        </template>
      </div>
    </template>

    <!-- 显示当前的搜索条件 -->
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name' && filters.name">
        图片名称({{ filters.name[0] }})
      </template>
      <template v-if="column.key === 'remark' && filters.remark">
        备注({{ filters.remark[0] }})
      </template>
    </template>

    <template #bodyCell="{ column, record, index }">
      <!-- 序号 -->
      <template v-if="column.key === 'index'">
        {{ index + 1 }}
      </template>

      <!-- 图片预览 -->
      <template v-if="column.key === 'url'">
        <img
          :src="record.url"
          style="max-width: 100px; max-height: 60px;"
        >
      </template>

      <!-- 图片名称 -->
      <template v-if="column.key === 'name'">
        {{ record.name || '-' }}
      </template>

      <!-- 备注 -->
      <template v-if="column.key === 'remark'">
        {{ record.remark || '-' }}
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
          @click="router.push({ name: 'img-detail', query: { imgId: record.imgId } })"
        >
          详情
        </a-button>
        <a-button
          size="small"
          type="link"
          @click="router.push({ name: 'edit-img', query: { imgId: record.imgId } })"
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
import { fileApi } from '@/api/index';
import { to, buildErrorMsg, Feedback } from '@/utils/index';
import type { IFile } from '@/types/file';

const router = useRouter();
const { confirmModal } = Feedback;

const columns = ref<TableColumnsType>([
  {
    title: '#',
    key: 'index',
    width: 50,
    fixed: 'left',
  },
  {
    title: '预览',
    key: 'url',
    width: 120,
  },
  {
    title: '图片名称',
    key: 'name',
    sorter: true,
    customFilterDropdown: true,
    resizable: true,
    width: 200,
  },
  {
    title: '备注',
    key: 'remark',
    resizable: true,
    customFilterDropdown: true,
    width: 200,
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

const dataList = ref<IFile[]>([]);
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

const getList = async () => {
  loading.value = true;
  const params: any = {
    pageNo: pagination.value.current,
    pageSize: pagination.value.pageSize,
  };
  if (filters.value.name) {
    [params.name] = filters.value.name;
  }
  if (filters.value.remark) {
    [params.remark] = filters.value.remark;
  }
  if (sorter.value.columnKey) {
    params.sortField = sorter.value.columnKey;
    params.sortOrder = sorter.value.order === 'ascend' ? 'asc' : 'desc';
  }

  const [err, res] = await to(fileApi.getList(params));
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

onMounted(() => {
  getList();
});

const onDelete = async (record: IFile) => {
  const confirm = await confirmModal({
    title: '删除',
    content: `确定删除图片 ${record.name} 吗？`,
  });

  if (!confirm) {
    return;
  }

  const [err] = await to(fileApi.deleteFile({ fileId: record.fileId }));
  if (err) {
    message.error(buildErrorMsg({ err, defaultMsg: '删除失败' }));
    return;
  }

  message.success('删除成功');
  getList();
};
</script>

<style scoped></style>
