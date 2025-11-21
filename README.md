#### 실행 방법

```
1. 저장소 복제
git clone https://github.com/oweaj/pg-dashboard.git

2. 종속성 설치
npm install

3. 프로젝트 실행
npm run dev

< 환경변수 >
NEXT_PUBLIC_BASE_URL=https://recruit.paysbypays.com/api/v1

```

---

#### 설명

---

- 사용한 템플릿/라이브러리 : Shadcn/ui
- [차트 테이블 대시보드](https://ui.shadcn.com/blocks)

프로젝트에서는 Shadcn/ui의 대시보드 템플릿을 기반으로 초기 레이아웃을 잡았습니다.
대시보드의 기본 레이아웃 구조는 그대로 사용하면서 필요에 따라 차트, 모달, 캘린더 등 ui와 기능을 커스터마이징했습니다.
이렇게 하면 대시보드 구조를 빠르게 구축하면서 필요한 부분 하나씩 가져가며 불필요한 부분은 제거하거나 수정하면서 프로젝트 요구사항에 맞춰 유연하게 조정할 수 있어서 대시보드 템플릿을 활용했습니다.

---

#### 사용한 기술 및 라이브러리

Next.js, Typescript, Tanstack-Query, Tailwindcss, Shadcn/ui
