<script setup lang="ts">
    import ExampleComponent from './components/ExampleComponent.vue';

    const props = defineProps<{
        exampleProp: string;
    }>();

    const exampleProp = props.exampleProp || "This is an example prop";
</script>

<template>
    <div>
        <ExampleComponent :exampleProp="exampleProp" />
    </div>
</template>

<style scoped></style>
