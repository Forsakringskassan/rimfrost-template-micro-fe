import { env, ensureEnvLoaded } from "../config/env";
import { useProductStore } from "../stores/ExampleStore";

export async function fetchExampleData(handlaggningId: string) {
    const store = useProductStore();

    try {
        await ensureEnvLoaded();
        const bffUrl = env.bffUrl;
        const response = await fetch(`${bffUrl}/api/task`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ handlaggningId }),
        });
        const contentType = response.headers.get("Content-Type") || "";

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        if (contentType.includes("application/json")) {
            const data = await response.json();
            store.setTask(data);
        } else {
            throw new Error(`Unexpected content type: ${contentType}`);
        }
    } catch (error) {
        console.error("Failed to fetch example data:", error);
        store.setError("Kunde inte hämta uppgiftsdata. Försök igen senare.");
    }
}