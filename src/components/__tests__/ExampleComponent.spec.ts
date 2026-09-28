import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import ExampleComponent from "../ExampleComponent.vue";

function mountExample() {
  return mount(ExampleComponent, {
    props: { handlaggningId: "abc-123" },
    global: { stubs: { FIcon: true } },
  });
}

function findToggle(wrapper: ReturnType<typeof mountExample>) {
  const knapp = wrapper
    .findAll("button")
    .find((b) => b.text().includes("testkomponent för stegindikator"));
  if (!knapp) {
    throw new Error("Toggle button not found");
  }
  return knapp;
}

describe("ExampleComponent", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("hides the step indicator test area until the button is pressed", async () => {
    const wrapper = mountExample();
    const knapp = findToggle(wrapper);

    expect(knapp.text()).toBe("Visa testkomponent för stegindikator");
    expect(knapp.attributes("aria-expanded")).toBe("false");
    expect(wrapper.find("#steg-indikator-testyta").exists()).toBe(false);

    await knapp.trigger("click");

    expect(knapp.text()).toBe("Dölj testkomponent för stegindikator");
    expect(knapp.attributes("aria-expanded")).toBe("true");
    const yta = wrapper.find("#steg-indikator-testyta");
    expect(yta.find(".steg-test").exists()).toBe(true);
    expect(yta.find("h1").exists()).toBe(false);
  });

  it("hides the test area again on a second press", async () => {
    const wrapper = mountExample();
    const knapp = findToggle(wrapper);

    await knapp.trigger("click");
    await knapp.trigger("click");

    expect(wrapper.find("#steg-indikator-testyta").exists()).toBe(false);
  });
});
