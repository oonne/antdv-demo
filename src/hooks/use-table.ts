import { ref } from 'vue';
import { TableColumnType, PaginationProps } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
import { useBasicStore } from '@/store/index';

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
   * 分页、排序、筛选变化时触发
   */
  const changeTable = (paginationProps: PaginationProps, filters: any, sorter: any) => {
    // 分页
    pagination.value.current = paginationProps.current || 1;
    pagination.value.pageSize = paginationProps.pageSize || basicStore.pageSize;

    // 筛选
    console.log(filters);

    // 排序
    console.log(sorter);

    // 获取数据
    getTableData();
  };

  /* 分页 */
  const changePage = (current: number) => {
    if (current) {
      pagination.value.current = current;
    }
    getTableData();

    router.replace({
      query: {
        ...route.query,
        page: current,
      },
    });
  };

  // /* 修改页数 */
  const changePageSize = (size: number) => {
    pagination.value.pageSize = size;
    pagination.value.current = 1;
    getTableData();
    basicStore.setPageSize(size);
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
    changeTable,
    changePage,
    changePageSize,

    onResizeColumn,
    rowClassName,
  };
};

export default useTable;
