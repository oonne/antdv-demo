import { ref } from 'vue';
import { TableColumnType, PaginationProps } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
import { useBasicStore } from '@/store/index';
import { ISorter } from '@/types/index';

// eslint-disable-next-line no-unused-vars
type Callback = () => Promise<void>;

/*
 * 表格相关方法
 */
const useTable = () => {
  const route = useRoute();
  const router = useRouter();
  const basicStore = useBasicStore();
  let getTableData: Callback = async () => {};

  /*
   * 设置获取数据回调
   */
  const setGetDataFunction = (callback: Callback) => {
    getTableData = callback;
  };

  /*
   * 加载中
   */
  const loading = ref(false);

  /*
   * 分页
   */
  const pagination = ref({
    current: Number(route.query.page) || 1,
    pageSize: basicStore.pageSize,
    total: 0,
  });

  /*
   * 排序
   */
  const sorter = ref<ISorter>({});

  /*
   * 分页、排序、筛选变化时触发
   */
  const changeTable = (paginationProps: PaginationProps, filters: any, sorterPorps: ISorter) => {
    // 分页
    pagination.value.current = paginationProps.current || 1;
    pagination.value.pageSize = paginationProps.pageSize || basicStore.pageSize;

    // 筛选
    console.log(filters);

    // 排序
    sorter.value = sorterPorps;

    // 获取数据
    getTableData();

    // 存储分页数据
    router.replace({
      query: {
        ...route.query,
        page: paginationProps.current,
      },
    });
    basicStore.setPageSize(pagination.value.pageSize);
  };

  /* 表格宽度拖拽 */
  const onResizeColumn = (width: number, column: TableColumnType) => {
    // eslint-disable-next-line no-param-reassign
    column.width = width;
  };

  /* 斑马线 */
  const rowClassName = (_record: any, index: number) => (index % 2 === 1 ? 'table-striped' : null);

  /*
   * 返回的属性和方法
   */
  return {
    setGetDataFunction,

    loading,
    pagination,
    sorter,

    changeTable,
    onResizeColumn,
    rowClassName,
  };
};

export default useTable;
