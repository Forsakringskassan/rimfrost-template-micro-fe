import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ProgressBar from "../ProgressBar.vue";

const steps = [
  { label: "Steg 1", tooltip: "Tooltip 1" },
  { label: "Steg 2", tooltip: "Tooltip 2" },
  { label: "Steg 3", tooltip: "Tooltip 3" },
];

function mountProgressBar(currentStep: number) {
  return mount(ProgressBar, {
    props: { stepsInformation: { currentStep, steps } },
  });
}

function stepClasses(wrapper: ReturnType<typeof mount>, stepIndex: number) {
  return wrapper.findAll(".step").at(stepIndex)!.classes();
}

describe("ProgressBar — getStepClass", () => {
  it("marks steps before currentStep as completed", () => {
    const wrapper = mountProgressBar(3);
    expect(stepClasses(wrapper, 0)).toContain("completed");
    expect(stepClasses(wrapper, 1)).toContain("completed");
  });

  it("marks the currentStep as current", () => {
    const wrapper = mountProgressBar(2);
    expect(stepClasses(wrapper, 1)).toContain("current");
  });

  it("marks steps after currentStep as future", () => {
    const wrapper = mountProgressBar(1);
    expect(stepClasses(wrapper, 1)).toContain("future");
    expect(stepClasses(wrapper, 2)).toContain("future");
  });

  it("marks all steps as future when currentStep is 0", () => {
    const wrapper = mountProgressBar(0);
    expect(stepClasses(wrapper, 0)).toContain("future");
    expect(stepClasses(wrapper, 1)).toContain("future");
    expect(stepClasses(wrapper, 2)).toContain("future");
  });

  it("renders the correct number of steps", () => {
    const wrapper = mountProgressBar(1);
    expect(wrapper.findAll(".step")).toHaveLength(3);
  });
});
