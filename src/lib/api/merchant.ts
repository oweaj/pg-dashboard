import { cfetch } from "./cfetch";

// 가맹점 목록 조회
export const merchantListApi = async () => {
  const result = await cfetch("/merchants/list");
  return result;
};

// 가맹점 상세 조회
export const merchantDetailApi = async () => {
  const result = await cfetch("/merchants/details");
  return result;
};

// 가맹점 코드 상세 조회
export const merchantDetailCodeApi = async (mchtCode: string) => {
  const result = await cfetch(`/merchants/details/${mchtCode}`);
  return result;
};
