import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import ExampleComponent from "../ExampleComponent.vue";

describe("ExampleComponent", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("shows the handläggning-ID passed by the portal", () => {
    const wrapper = mount(ExampleComponent, {
      props: { handlaggningId: "abc-123" },
    });

    expect(wrapper.find("h2").text()).toBe("Handläggnings-ID: abc-123");
  });
});
