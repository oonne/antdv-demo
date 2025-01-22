import {
  ref, nextTick, onMounted, onUnmounted,
} from 'vue';
import { TableColumnType } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
import { useBasicStore } from '@/store/index';
import { Utils } from '@/utils/index';

const { debounce } = Utils;

// eslint-disable-next-line no-unused-vars
type Callback = ()=>Promise<void>;

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
   * 分页
   */
  const pagination = ref({
    current: Number(route.query.page) || 1,
    pageSize: basicStore.pageSize,
    total: 0,
  });

  /* 翻页 */
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

  /* 修改页数 */
  const changePageSize = (size: number) => {
    pagination.value.pageSize = size;
    pagination.value.current = 1;
    getTableData();
    basicStore.setPageSize(size);
  };

  /*
   * 表格尺寸计算
   */
  const tableHeight = ref(500);

  // 设置表格高度
  const setTableHeight = async () => {
    await nextTick();
    const table = document.getElementById('table');
    if (!table) {
      return;
    }

    const top = table.getBoundingClientRect()?.top || 0;
    const innerHeight = window.innerHeight || 0;

    // 表格的滚动高度：页面高度 - 表格距离顶部的高度 - 顶栏高度和底部内边距。表格的最小高度为200。
    const height = innerHeight - top - 64;
    tableHeight.value = height < 200 ? 200 : height;
  };

  // 监听页面大小变化，重新计算表格高度
  const onResize = debounce(setTableHeight, 1000);
  onMounted(() => {
    setTableHeight();
    window.addEventListener('resize', onResize);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', onResize);
  });

  /* 表格宽度拖拽 */
  const onResizeColumn = (width: number, column: TableColumnType) => {
    // eslint-disable-next-line no-param-reassign
    column.width = width;
  };

  /*
   * 返回的属性和方法
   */
  return {
    setGetDataFunction,

    pagination,
    changePage,
    changePageSize,

    tableHeight,
    onResizeColumn,

    setTableHeight,
  };
};

export default useTable;
