<template>
  <div class="view-wrapper">22222222222 </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRef, toRefs, onMounted } from 'vue';

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
    // 
    function init() { };

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

<style lang="scss">
//
</style>
