const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const cfetch = async (endPoint: string) => {
  const res = await fetch(`${BASE_URL}${endPoint}`, {
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`요청 실패: ${res.status}`);
  }

  return res.json();
};
