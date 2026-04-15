import { useProductStore } from "../stores/ExampleStore";

export async function fetchExampleData(handlaggningId: string) {
    const store = useProductStore();
    const bffUrl = import.meta.env.VITE_BFF_URL || "http://localhost:9009";
    
    try {
        const response = await fetch(`${bffUrl}/api/task/${handlaggningId}`);
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
    }
}