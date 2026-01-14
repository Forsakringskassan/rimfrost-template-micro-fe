<script setup lang="ts">
  import { computed } from 'vue';
  import { useProductStore } from '../stores/ExempelStore';
  import { FButton } from '@fkui/vue';
  const productStore = useProductStore();

  const count = computed(() => productStore.count);
</script>

<template>
  <div class="button-container">
    <p>{{ count }}</p>
    <FButton @click="productStore.increaseCount">Klicka på mig</FButton>
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
