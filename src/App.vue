<script setup lang="ts">
import ExampleComponent from './components/ExampleComponent.vue';
import { FLayoutApplicationTemplate, FLayoutLeftPanel, FPageHeader } from '@fkui/vue';

const props = defineProps<{
    handlaggningId: string;
}>();

const isDev = import.meta.env.DEV;
const handlaggningId = props.handlaggningId || import.meta.env.VITE_DEV_HANDLAGGNING_ID || 'Ingen handläggnings-ID angiven';
</script>

<template>
    <f-layout-application-template v-if="isDev">
        <template #header>
            <f-page-header />
        </template>
        <f-layout-left-panel>
            <ExampleComponent :handlaggningId="handlaggningId" />
        </f-layout-left-panel>
    </f-layout-application-template>
    <ExampleComponent v-else :handlaggningId="handlaggningId" />
</template>

<style scoped></style>
