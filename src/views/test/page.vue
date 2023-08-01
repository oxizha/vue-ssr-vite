<template>
  <div class="view-wrapper" :class="renderCls(1)"> </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRef, toRefs, onMounted } from 'vue';
import { useStore as useAppStore } from '@/store/app';
import { useStore as usePageStore } from './store';

import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  components: {},

  setup() {
    const appStore = useAppStore();
    const pageStore = usePageStore();

    const router = useRouter();
    const route = useRoute();

    const userInfo = toRef(appStore, 'userInfo');

    //-----------------DATA-----------------------

    interface StateData {
      visible: boolean;
    }

    const state = reactive<StateData>({
      visible: false,
    });
    //-----------------RENDER---------------------
    const renderCls = (index: number) => {
      const ret: string[] = [`${index}`];

      return ret;
    };
    //-----------------EVENT----------------------
    //
    function gotoHome() {
      router.push({
        name: 'Home',
      });
    }
    //-----------------FLOW-----------------------
    function initPage() {
      pageStore.querySalesProfile({
        projectType: 0,
        refIdType: 0,
        queryTime: '',
      });
    };

    // 设置页面参数
    function setParams() {
      const { params, query } = route
      const pageParams = {}

      pageStore.setState({
        pageParams
      })
    }

    // 设置页面参数
    function setTitle() { }


    onMounted(() => {
      initPage();
    });
    //-----------------RETURN---------------------
    return {
      ...toRefs(state),
      userInfo,
      //
      renderCls,
      //
      gotoHome,
    };
  },
});
</script>

<style lang="scss">
//
</style>
