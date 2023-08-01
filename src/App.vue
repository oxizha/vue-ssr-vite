<template>
  <div id="app-container">
    <RouterView />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRef, toRefs, onMounted } from 'vue';

import { setApp, getApp } from './global';


export default defineComponent({

  components: {},

  setup() {
    //-----------------DATA-----------------------
    interface StateData {
      visible: boolean;
    }

    const state = reactive<StateData>({
      visible: false,
    });
    //-----------------RENDER---------------------
    //
    //-----------------EVENT----------------------
    //
    //-----------------FLOW-----------------------
    setApp.call(this)

    const app = getApp()
    //
    function init() {

    };

    onMounted(() => {
      init();
    });
    //-----------------RETURN---------------------
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss"></style>
 