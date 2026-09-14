import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { useProductStore } from "../ExampleStore";

describe("ExampleStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("starts with default state", () => {
    const store = useProductStore();
    expect(store.count).toBe(0);
    expect(store.task).toBeNull();
    expect(store.loading).toBe(false);
    expect(store.uppgiftsbeskrivning).toBe("");
  });

  it("increaseCount increments count by 1 each call", () => {
    const store = useProductStore();
    store.increaseCount();
    store.increaseCount();
    expect(store.count).toBe(2);
  });

  it("setTask stores the task object", () => {
    const store = useProductStore();
    const task = { id: "abc", status: "open" };
    store.setTask(task);
    expect(store.task).toEqual(task);
  });

  it("setTask can be called with null", () => {
    const store = useProductStore();
    store.setTask({ id: "abc" });
    store.setTask(null);
    expect(store.task).toBeNull();
  });

  it("setDescriptionLoading toggles loading flag", () => {
    const store = useProductStore();
    store.setDescriptionLoading(true);
    expect(store.loading).toBe(true);
    store.setDescriptionLoading(false);
    expect(store.loading).toBe(false);
  });

  it("setUppgiftsbeskrivning stores the description", () => {
    const store = useProductStore();
    store.setUppgiftsbeskrivning("Granska ansökan");
    expect(store.uppgiftsbeskrivning).toBe("Granska ansökan");
  });
});
