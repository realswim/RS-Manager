# 🏊 수영장 관리 시스템 (Aqua Manager)

배포 가이드 — 처음 하시는 분도 따라할 수 있어요!

---

## 📦 파일 구조

```
pool-app/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx       ← 앱 전체 코드
│   └── index.js
├── package.json
├── vercel.json
└── .gitignore
```

---

## 🚀 배포 방법 (무료)

### STEP 1 — GitHub 가입 & 저장소 만들기

1. https://github.com 접속 → **Sign up** 으로 가입
2. 로그인 후 우측 상단 **+** → **New repository** 클릭
3. Repository name: `aqua-manager` 입력
4. **Create repository** 클릭

### STEP 2 — 파일 올리기

1. 만들어진 저장소 페이지에서 **uploading an existing file** 클릭
2. 이 폴더 안의 파일들을 드래그해서 올리기
   - `public/index.html`
   - `src/App.jsx`
   - `src/index.js`
   - `package.json`
   - `vercel.json`
   - `.gitignore`
3. **Commit changes** 클릭

### STEP 3 — Vercel 배포

1. https://vercel.com 접속
2. **Continue with GitHub** 으로 로그인
3. **Add New → Project** 클릭
4. `aqua-manager` 저장소 선택 → **Import**
5. 설정 그대로 두고 **Deploy** 클릭
6. 1~2분 기다리면 완료! 🎉

### STEP 4 — 링크 확인

- 배포 완료 후 `https://aqua-manager-xxx.vercel.app` 형태의 주소가 생성돼요
- 이 주소를 직원들에게 공유하세요

---

## 📱 폰 홈화면에 앱으로 추가하기

### 아이폰 (Safari)
1. Safari에서 앱 주소 접속
2. 하단 공유 버튼(□↑) 탭
3. **홈 화면에 추가** 탭
4. **추가** 탭

### 안드로이드 (Chrome)
1. Chrome에서 앱 주소 접속
2. 우측 상단 ⋮ 메뉴 탭
3. **홈 화면에 추가** 탭

---

## ✅ 완료!

이제 폰 홈화면에서 앱 아이콘을 탭하면 수영장 관리 앱이 열려요.
