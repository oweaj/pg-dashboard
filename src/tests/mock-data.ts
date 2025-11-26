export const mockPaymentList = {
  data: [
    {
      mchtCode: "MCHT-TEST-001",
      payType: "ONLINE",
      amount: "10000",
      currency: "KRW",
      status: "SUCCESS",
      paymentCode: "PAY-20251101-0001",
      paymentAt: "2025-11-01T00:30:00",
    },
    {
      mchtCode: "MCHT-TEST-002",
      payType: "MOBILE",
      amount: "20000",
      currency: "KRW",
      status: "FAILED",
      paymentCode: "PAY-20251102-0002",
      paymentAt: "2025-11-02T00:00:00",
    },
  ],
};

export const mockPaymentType = {
  data: [
    { type: "ONLINE", description: "온라인" },
    { type: "DEVICE", description: "단말기" },
    { type: "MOBILE", description: "모바일" },
    { type: "VACT", description: "가상계좌" },
    { type: "BILLING", description: "정기결제" },
  ],
};

export const mockPaymentStatus = {
  data: [
    { code: "PENDING", description: "결제대기" },
    { code: "SUCCESS", description: "결제완료" },
    { code: "FAILED", description: "결제실패" },
    { code: "CANCELLED", description: "환불완료" },
  ],
};

export const mockMerchantStatus = {
  data: [
    { code: "ACTIVE", description: "활성" },
    { code: "CLOSED", description: "폐기" },
    { code: "INACTIVE", description: "중지" },
    { code: "READY", description: "대기" },
  ],
};

export const mockMerchantList = {
  data: [
    { bizType: "CAFE", mchtCode: "MCHT-TEST-001", mchtName: "테스트 가맹점A", status: "ACTIVE" },
    { bizType: "TEST", mchtCode: "MCHT-TEST-002", mchtName: "테스트 가맹점B", status: "READY" },
  ],
};

export const mockMerchantDetail = {
  data: [
    {
      address: "서울 강남구 테헤란로 100",
      bizNo: "101-11-00001",
      bizType: "CAFE",
      email: "test@testcafe.com",
      mchtCode: "MCHT-TEST-001",
      mchtName: "테스트 가맹점A",
      phone: "02-111-1234",
      registeredAt: "2025-10-01T00:10:00",
      status: "ACTIVE",
      updatedAt: "2025-10-01T00:10:00",
    },
    {
      address: "서울 강남구 테헤란로 200",
      bizNo: "101-22-00002",
      bizType: "TEST",
      email: "test@test.com",
      mchtCode: "MCHT-TEST-002",
      mchtName: "테스트 가맹점B",
      phone: "02-222-1234",
      registeredAt: "2025-10-11T00:20:00",
      status: "READY",
      updatedAt: "2025-10-11T00:20:00",
    },
  ],
};
