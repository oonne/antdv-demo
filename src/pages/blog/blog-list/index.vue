<template>
  <div class="app-view-header">
    <a-space>
      <a-button
        type="primary"
        @click="router.push({ name: 'edit-blog' })"
      >
        新增
      </a-button>
    </a-space>

    <div class="app-view-header-sum">
      总计: {{ pagination.total }}
    </div>
  </div>

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
    <template
      #customFilterDropdown="{
        setSelectedKeys,
        selectedKeys,
        confirm,
        column
      }"
    >
      <div class="table-filter-dropdown">
        <template
          v-if="column.key === 'title'
            || column.key === 'content'
            || column.key === 'linkUrl'"
        >
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
      <template v-if="column.key === 'title' && filters.title">
        标题({{ filters.title[0] }})
      </template>
      <template v-if="column.key === 'content' && filters.content">
        内容({{ filters.content[0] }})
      </template>
      <template v-if="column.key === 'linkUrl' && filters.linkUrl">
        链接({{ filters.linkUrl[0] }})
      </template>
    </template>

    <template #bodyCell="{ column, record, index }">
      <!-- 序号 -->
      <template v-if="column.key === 'index'">
        {{ index + 1 }}
      </template>

      <!-- 标题 -->
      <template v-if="column.key === 'title'">
        {{ record.title }}
      </template>

      <!-- 内容 -->
      <template v-if="column.key === 'content'">
        {{ record.content }}
      </template>

      <!-- 链接 -->
      <template v-if="column.key === 'linkUrl'">
        {{ record.linkUrl }}
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
          @click="router.push({ name: 'blog-detail', query: { blogId: record.blogId } })"
        >
          详情
        </a-button>
        <a-button
          size="small"
          type="link"
          @click="router.push({ name: 'edit-blog', query: { blogId: record.blogId } })"
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
import { blogApi } from '@/api/index';
import { to, buildErrorMsg, Feedback } from '@/utils/index';
import type { IBlog } from '@/types/blog';

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
    title: '标题',
    key: 'title',
    sorter: true,
    customFilterDropdown: true,
    resizable: true,
    width: 200,
  },
  {
    title: '内容',
    key: 'content',
    sorter: true,
    customFilterDropdown: true,
    resizable: true,
    width: 300,
  },
  {
    title: '链接',
    key: 'linkUrl',
    resizable: true,
    customFilterDropdown: true,
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

/*
 * 列表
 */
const dataList = ref<IBlog[]>([]);
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

/*
 * 获取数据
 */
const getList = async () => {
  loading.value = true;
  const params: any = {
    pageNo: pagination.value.current,
    pageSize: pagination.value.pageSize,
  };
  if (filters.value.title) {
    [params.title] = filters.value.title;
  }
  if (filters.value.description) {
    [params.description] = filters.value.description;
  }
  if (filters.value.tags) {
    [params.tags] = filters.value.tags;
  }
  if (sorter.value.columnKey) {
    params.sortField = sorter.value.columnKey;
    params.sortOrder = sorter.value.order === 'ascend' ? 'asc' : 'desc';
  }

  const [err, res] = await to(blogApi.getList(params));
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
 * 删除
 */
const onDelete = async (record: IBlog) => {
  const confirm = await confirmModal({
    title: '删除',
    content: `确定删除 ${record.title} 吗？`,
  });

  if (!confirm) {
    return;
  }

  const [err] = await to(blogApi.deleteBlog({ blogId: record.blogId }));
  if (err) {
    message.error(buildErrorMsg({ err, defaultMsg: '删除失败' }));
    return;
  }

  message.success('删除成功');
  getList();
};
</script>

<style scoped></style>
