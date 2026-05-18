import { createPinia, setActivePinia } from "pinia";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchExampleData } from "../fetchExampleData";
import { useProductStore } from "../../stores/ExampleStore";

function mockFetch(body: unknown, options: { ok?: boolean; contentType?: string } = {}) {
  const { ok = true, contentType = "application/json" } = options;
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok,
      status: ok ? 200 : 500,
      statusText: ok ? "OK" : "Internal Server Error",
      headers: { get: (key: string) => (key.toLowerCase() === "content-type" ? contentType : null) },
      json: () => Promise.resolve(body),
    }),
  );
}

describe("fetchExampleData", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("calls the correct endpoint with the handlaggningId", async () => {
    mockFetch({ id: "task-1" });
    await fetchExampleData("h-123");
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining("/api/task"),
      expect.objectContaining({ method: "POST", body: JSON.stringify({ handlaggningId: "h-123" }) }),
    );
  });

  it("stores the response data on success", async () => {
    const task = { id: "task-1", status: "open" };
    mockFetch(task);
    await fetchExampleData("h-123");
    expect(useProductStore().task).toEqual(task);
  });

  it("logs an error and does not update store on HTTP error", async () => {
    mockFetch({}, { ok: false });
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    await fetchExampleData("h-123");
    expect(useProductStore().task).toBeNull();
    expect(consoleSpy).toHaveBeenCalledOnce();
    consoleSpy.mockRestore();
  });

  it("logs an error when content-type is not JSON", async () => {
    mockFetch("<html>error</html>", { contentType: "text/html" });
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    await fetchExampleData("h-123");
    expect(useProductStore().task).toBeNull();
    expect(consoleSpy).toHaveBeenCalledOnce();
    consoleSpy.mockRestore();
  });
});
