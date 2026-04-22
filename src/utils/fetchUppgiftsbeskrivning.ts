import { env } from "../config/env";
import { useProductStore } from "../stores/ExampleStore";

export async function fetchUppgiftsbeskrivning() {
  const store = useProductStore();
  store.setDescriptionLoading(true);

  try {
    const url = `${env.bffUrl}/api/uppgiftsbeskrivning`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(`Response is not JSON. Got: ${text.substring(0, 100)}`);
    }

    const data = await response.json();
    if (data && typeof data.beskrivning === "string") {
      store.setUppgiftsbeskrivning(data.beskrivning);
    } else {
      throw new Error("Invalid response format from backend");
    }
  } catch (error) {
    console.error("Error fetching description:", error);
    store.setUppgiftsbeskrivning("");
  } finally {
    store.setDescriptionLoading(false);
  }
}
