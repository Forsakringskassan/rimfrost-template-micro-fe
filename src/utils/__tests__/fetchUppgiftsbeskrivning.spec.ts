import { createPinia, setActivePinia } from "pinia";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchUppgiftsbeskrivning } from "../fetchUppgiftsbeskrivning";
import { useProductStore } from "../../stores/ExampleStore";

function mockFetch(body: unknown, options: { ok?: boolean; contentType?: string } = {}) {
  const { ok = true, contentType = "application/json" } = options;
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok,
      status: ok ? 200 : 500,
      headers: { get: (key: string) => (key.toLowerCase() === "content-type" ? contentType : null) },
      json: () => Promise.resolve(body),
      text: () => Promise.resolve(String(body)),
    }),
  );
}

describe("fetchUppgiftsbeskrivning", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sets and clears loading flag around the request", async () => {
    const store = useProductStore();
    const loadingStates: boolean[] = [];

    mockFetch({ beskrivning: "Granska ansökan" });

    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(() => {
        loadingStates.push(store.loading);
        return Promise.resolve({
          ok: true,
          headers: { get: () => "application/json" },
          json: () => Promise.resolve({ beskrivning: "Granska ansökan" }),
        });
      }),
    );

    await fetchUppgiftsbeskrivning();
    expect(loadingStates[0]).toBe(true);
    expect(store.loading).toBe(false);
  });

  it("stores the beskrivning on success", async () => {
    mockFetch({ beskrivning: "Granska ansökan" });
    await fetchUppgiftsbeskrivning();
    expect(useProductStore().uppgiftsbeskrivning).toBe("Granska ansökan");
  });

  it("falls back to empty string and clears loading on HTTP error", async () => {
    mockFetch({}, { ok: false });
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    await fetchUppgiftsbeskrivning();
    const store = useProductStore();
    expect(store.uppgiftsbeskrivning).toBe("");
    expect(store.loading).toBe(false);
    expect(consoleSpy).toHaveBeenCalledOnce();
    consoleSpy.mockRestore();
  });

  it("falls back to empty string when content-type is not JSON", async () => {
    mockFetch("not json", { contentType: "text/html" });
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    await fetchUppgiftsbeskrivning();
    expect(useProductStore().uppgiftsbeskrivning).toBe("");
    expect(consoleSpy).toHaveBeenCalledOnce();
    consoleSpy.mockRestore();
  });

  it("falls back to empty string when response is missing beskrivning", async () => {
    mockFetch({ something: "else" });
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    await fetchUppgiftsbeskrivning();
    expect(useProductStore().uppgiftsbeskrivning).toBe("");
    expect(consoleSpy).toHaveBeenCalledOnce();
    consoleSpy.mockRestore();
  });
});
