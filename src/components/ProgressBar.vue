<script setup lang="ts">
interface SingleStep {
  label: string;
  tooltip: string;
}

interface StepsInformation {
  currentStep: number;
  steps: SingleStep[];
}

const { stepsInformation } = defineProps<{
  stepsInformation: StepsInformation;
}>();

const totalSteps = stepsInformation.steps.length;
const currentStep = stepsInformation.currentStep;
const labels = stepsInformation.steps.map(step => step.label);
const tooltips = stepsInformation.steps.map(step => step.tooltip);

function getStepClass(step: number) {
  if (step < currentStep) return 'completed';
  if (step === currentStep) return 'current';
  return 'future';
};
</script>

<template>
  <div class="progress-bar">
    <div v-for="step in totalSteps" :key="step" class="step-container">
      <div class="step-content">
        <div class="step" :class="getStepClass(step)">
          <span class="step-number">{{ step }}</span>
        </div>

        <p class="step-label" :title="tooltips[step - 1]">
          {{ labels[step - 1] }}
        </p>
      </div>
      <div v-if="step < totalSteps" class="step-connector" :class="{ completed: step < currentStep }"></div>
    </div>
  </div>
</template>

<style scoped>
.progress-bar {
  display: flex;
  align-items: center;
  gap: 0;
  width: 100%;
}

.step-container {
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;
  padding-bottom: 50px;
}

.step-container:last-child {
  flex: 0;
}

.step-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  position: relative;
  width: 40px;
}

.step {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  z-index: 2;
  flex-shrink: 0;
}

.step.completed {
  background-color: #88b49f;
}

.step.completed .step-number {
  color: #8d8e91;
}

.step.current {
  background-color: #f4f4f4;
  border: 2px solid #88b49f;
}

.step.current .step-number {
  color: #1b1e23;
}

.step.future {
  background-color: #f4f4f4;
}

.step.future .step-number {
  color: #1b1e23;
}

.step-number {
  color: inherit;
}

.step-connector {
  height: 8px;
  background-color: #ddddde;
  z-index: 1;
  position: absolute;
  top: 18px;
  left: 20px;
  right: -20px;
}

.step-connector.completed {
  background-color: #88b49f;
}

.step-label {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8px;
  font-size: 12px;
  color: #5f6165;
  text-align: center;
  white-space: nowrap;
}
</style>
