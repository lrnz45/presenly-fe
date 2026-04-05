// useKiosk.ts
import type { KioskCheckInLogEntry } from "~/types";

export const useKiosk = () => {
  const { fetchApi } = useApi();

  const identifyFace = async (embedding: number[]) => {
    // Tambahkan subtitle di return type agar UI bisa menampilkan jabatan
    return fetchApi<{
      success: boolean;
      employeeId: string; // Gunakan string jika di DB UUID/String
      institutionId: number;
      name: string;
      confidence: number;
      subtitle?: string;
    }>("/kiosk/identify", {
      method: "POST",
      body: { embedding },
    });
  };

  const logAttendance = async (
    employeeId: string | number,
    confidence: number,
    scanType: "IN" | "OUT" = "IN",
    nonce: string = ""
  ) => {
    return fetchApi<KioskCheckInLogEntry>("/kiosk/scan", {
      method: "POST",
      body: { employeeId, confidence, scanType, nonce },
    });
  };

  const verifyExitPin = async (pin: string) => {
    const res = await fetchApi<{ success: boolean }>("/kiosk/exit-request", {
      method: "POST",
      body: { pin },
    });
    return res?.success || false;
  };

  const getDailyStats = async () => {
    try {
      return await fetchApi<{ total: number; late: number; rate: number; missing: number; employeeTotal: number }>(
        "/kiosk/daily-stats",
      );
    } catch {
      return { total: 0, late: 0, rate: 0, missing: 0, employeeTotal: 0 };
    }
  };

  const getNonce = async () => {
    const res = await fetchApi<{ nonce: string }>("/kiosk/nonce", { method: "POST" });
    return res?.nonce || "";
  };

  return { identifyFace, logAttendance, verifyExitPin, getDailyStats, getNonce };
};
