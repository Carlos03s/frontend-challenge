# Runbook local

## Desenvolvimento

```bash
cp .env.example .env
npm install
npm run dev
```

MSW ativo por padrão (`VITE_ENABLE_MSW=true`).

## Qualidade

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

## Testes E2E

```bash
npx playwright install chromium
npm run test:e2e
```

Antes dos testes, o helper `POST /api/mock/reset` restaura o cenário `default`.

Credenciais usadas no fluxo de login da UI de demonstração: `collector@kurio.test` / `Password123!`.

## Lighthouse

Com preview rodando em `http://127.0.0.1:4173`:

```bash
npm run preview -- --host 127.0.0.1 --port 4173
npm run lighthouse
```

Relatórios HTML em `lighthouse-reports/`.

Contratos, cenários de mock e Socket.IO: [ARCHITECTURE.md](./ARCHITECTURE.md).
