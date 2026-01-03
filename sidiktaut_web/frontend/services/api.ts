import { ScanResponse } from "../types";

const API_BASE_URL = "/api";

export const scanUrl = async (url: string): Promise<ScanResponse> => {
  try {
    const res = await fetch(`${API_BASE_URL}/scan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!res.ok) {
      let errorMessage = `Server Error (${res.status})`;

      try {
        const errorData = await res.json();
        if (errorData.error) errorMessage = errorData.error;
      } catch {}

      throw new Error(errorMessage);
    }

    return (await res.json()) as ScanResponse;
  } catch (err: any) {
    console.error("[API Error]", err);

    if (
      err.message.includes("Failed to fetch") ||
      err.message.includes("NetworkError")
    ) {
      throw new Error("Backend tidak merespon. Pastikan app.py jalan.");
    }

    throw err;
  }
};
