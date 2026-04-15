<script setup lang="ts">
    import ExampleComponent from './components/ExampleComponent.vue';

    const props = defineProps<{
        handlaggningId: string;
    }>();

    const handlaggningId = props.handlaggningId || import.meta.env.VITE_DEV_HANDLAGGNING_ID || 'Ingen handläggnings-ID angiven';
</script>

<template>
    <div>
        <ExampleComponent :handlaggningId="handlaggningId" />
    </div>
</template>

<style scoped></style>
