
# Welcome to React Router

# 📘 Project Overview

A modern web application built with React, using Vite, Tailwind, React Router v7, and Vitest. The project follows a modular and type-safe structure suitable for scalable frontend development.

---

## 🚀 Tech Stack

| Layer      | Technology                                    |
| ---------- | --------------------------------------------- |
| UI         | React 19, TypeScript (strict mode)            |
| Routing    | React Router v7 (data APIs)                   |
| Styling    | Tailwind CSS, Radix UI, Radix Icons           |
| State Mgmt | Zustand (`useAuthStore`)                      |
| Tooling    | Vite + `vite-tsconfig-paths`                  |
| Testing    | Vitest, Testing Library, jest-dom, user-event |
| CI/CD      | GitLab CI/CD with test & coverage reports     |

---

## 🗂️ Folder Structure

```files
app/
├── api/               # Backend APIs
├── components/        # Shared presentational components
├── layouts/           # Route-based Page Layout (React Router v7)
├── pages/             # Route-based Pages (React Router v7)
├── routes/            # Route-based components (React Router v7)
│   └── auth.tsx       # Login page with <Form /> and useNavigation
├── stores/            # Zustand stores (e.g., useAuthStore)
├── test/              # Global test setup (jest-dom, etc.)
└── root.tsx           # Root app component
```

---

## 🧪 Testing

* Uses `vitest`, `@testing-library/react`, `jest-dom`, and `user-event`
* Preferred query style: semantic (e.g. `getByRole`, `getByLabelText`)
* Tests use `createRoutesStub()` for route-aware components

### 🧰 Sample Test Setup

```tsx
import Auth from '~/routes/auth';
import { createRoutesStub } from 'react-router';
import { render } from '@testing-library/react';

const Stub = createRoutesStub([
  {
    path: "/auth",
    Component: Auth,
    action() {
      return {};
    }
  }
]);

render(<Stub initialEntries={["/auth"]} />);
```

### Test Scripts

```json
"scripts": {
  "test": "vitest",
  "test:ci": "vitest run --coverage"
}
```

---

## 🔁 Continuous Integration: GitLab CI/CD

### ✅ Test & Coverage Configuration

```yaml
unit_tests:
  image: node:20
  script:
    - npm ci
    - npm run test:ci
  coverage: 'All files\s+\|\s+\d+\.\d+\s+\|\s+\d+\s+\|\s+\d+\.\d+\s+\|\s+(\d+\.\d+)'
  artifacts:
    when: always
    reports:
      junit: junit.xml
    paths:
      - coverage/
```

### ✅ CI Features

* JUnit test report shown in GitLab pipeline UI
* Coverage badge supported via:

  ```md
  ![coverage](https://gitlab.com/<namespace>/<project>/badges/main/coverage.svg)
  ```
* Pipeline status badge:

  ```md
  ![pipeline](https://gitlab.com/<namespace>/<project>/badges/main/pipeline.svg)
  ```

### Output Artifacts

* `coverage/index.html` (HTML report)
* `junit.xml` (for test UI summary)

---

## 📌 Notes

* Prefer `createRoutesStub()` in unit tests
* Tailwind is configured via `tailwind.config.js`
* Global test setup is in `src/test/setup.ts`
* Coverage is collected via V8 engine (`c8` under the hood)

---

## ✅ Status Badges

[![Pipeline Status](https://gitlab.im.priv/integ/schedule/ui/badges/dev/pipeline.svg)](https://gitlab.im.priv/integ/schedule/ui/pipelines)
[![Coverage](https://gitlab.im.priv/integ/schedule/ui/badges/dev/coverage.svg)](https://gitlab.im.priv/integ/schedule/ui/-/jobs)

---

For questions, improvements, or issues, please reach out to the dev team.
