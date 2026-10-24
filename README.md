# Kurio — Marketplace de NFTs

SPA do marketplace Kurio. Catálogo, detalhe, carrinho, checkout, conta e tempo real rodam no browser com dados simulados. Não há blockchain, extensão de carteira nem gateway de pagamento.

Contratos REST, sessão, carrinho, cache e Socket.IO estão em [ARCHITECTURE.md](./ARCHITECTURE.md).

## Stack

React 19, TypeScript, TanStack Router, TanStack Query, Axios, Socket.IO, Tailwind CSS, shadcn/ui, MSW e Playwright. Node `>= 22.12`.

## Setup

```bash
cp .env.example .env
npm install
npm run dev
```

O app sobe em `http://localhost:5173`. O MSW inicia com `VITE_ENABLE_MSW=true` e intercepta REST e Socket.IO no Service Worker. Um checkout limpo não depende de serviço externo.

| Comando | Uso |
| --- | --- |
| `npm run dev` | Desenvolvimento com mocks |
| `npm run typecheck` | Verificação de tipos |
| `npm run lint` | ESLint |
| `npm run build` | `tsc -b` e build de produção |
| `npm run preview` | Preview do build |
| `npm run test:e2e` | Playwright (Chromium desktop 1440×900 e mobile) |
| `npm run lighthouse` | Auditoria HTML (preview em `127.0.0.1:4173`) |
| `npm run storybook` | Storybook na porta 6006 |

## Variáveis

Copiadas de [.env.example](./.env.example).

| Variável | Default | Efeito |
| --- | --- | --- |
| `VITE_ENABLE_MSW` | `true` | Liga o Service Worker no browser e no build de demonstração |
| `VITE_API_BASE_URL` | `/api` | Prefixo REST interceptado pelo MSW |
| `VITE_MOCK_SCENARIO` | `default` | Cenário inicial quando ainda não há estado persistido |
| `VITE_SOCKET_PATH` | `/socket.io` | Path do cliente Socket.IO |

O estado simulado fica em `localStorage` (`kurio-mock-db-v2`). A sessão fica em `kurio-session-token`. O pedido em andamento no checkout fica em `sessionStorage` (`kurio-active-order-id`).

## Credenciais

Senhas não são gravadas em claro. O login de demonstração já vem preenchido com o colecionador.

| Usuário | E-mail | Senha |
| --- | --- | --- |
| Colecionador | `collector@kurio.test` | `Password123!` |
| Artista | `artist@kurio.test` | `Password123!` |

Cupom válido: `LAUNCH2026` (desconto `0.50` ETH). Cupom expirado: `EXPIRED2025`.

## Rotas

| Caminho | Tela |
| --- | --- |
| `/` | Início, com busca, filtros, ordenação e paginação na URL |
| `/nfts/$nftId` | Detalhe |
| `/carrinho` | Carrinho |
| `/pagamento` | Checkout (exige sessão) |
| `/login` | Login, com `?redirect=` para voltar ao fluxo |
| `/cadastro` | Cadastro |
| `/perfil` | Perfil (exige sessão) |
| `/carteiras` | Carteiras (exige sessão) |

Qualquer outro caminho cai na página de rota inexistente. Refresh e acesso direto funcionam nas rotas acima.

## Cenários

O reset restaura o banco simulado e apaga as sessões. Faça o reset antes do login quando o cenário precisar valer para o usuário autenticado. No console do app já carregado:

```js
await fetch('/api/mock/reset', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ scenario: 'default' }),
})
```

Troque `default` por um destes nomes. `GET /api/mock/state` devolve o cenário ativo.

| Cenário | O que acontece |
| --- | --- |
| `default` | Latência baixa e pagamento confirmado |
| `slow` | Latência alta (~1,8s) para skeletons |
| `empty-catalog` | Catálogo sem NFTs |
| `unstable` | Cerca de 25% das respostas em HTTP 503 |
| `payment-rejected` | Pedido fica pendente e depois é recusado; o carrinho permanece |
| `payment-timeout` | Confirmação demora ~12s; o mesmo pedido é recuperado depois do reload |

### Reproduzir falhas

Catálogo vazio: reset em `empty-catalog` e abra `/`. A lista mostra "Nenhum NFT encontrado."

Carregamento lento: reset em `slow`, recarregue `/` e o catálogo exibe skeleton até a resposta.

Pagamento recusado: reset em `payment-rejected`, entre com o colecionador, abra `/pagamento` e confirme. A mensagem é "Pagamento recusado. Os itens continuam no carrinho."

Pedido pendente e retomada: reset em `payment-timeout`, confirme a compra e recarregue `/pagamento` enquanto o texto de pendência estiver na tela. O pedido continua o mesmo e, ao terminar, abre "Seus NFTs agora estão na sua carteira".

Próxima listagem com erro: com o app aberto, `POST /api/mock/fail-next` arma um único HTTP 503 em `GET /api/nfts`. Uma nova busca no catálogo dispara a falha; a tentativa seguinte volta ao fluxo normal.

Preço alterado no carrinho: com um NFT no carrinho,

```js
await fetch('/api/mock/trigger/nft-price-change', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nftId: 'nft-emerald-ape-042', priceEth: '9.99' }),
})
```

O evento `nft.updated` chega pelo Socket.IO. O resumo muda e o checkout pede nova confirmação enquanto a cotação estiver desatualizada.

Evento repetido ou antigo: `POST /api/mock/trigger/nft-event-replay` reenvia o último `nft.updated`. `POST /api/mock/trigger/nft-stale-event` com `{ "nftId" }` emite a versão 1, que o cliente descarta se já aplicou uma versão maior.

## Testes

```bash
npx playwright install chromium
npm run test:e2e
```

O Playwright sobe o dev server em `http://127.0.0.1:4173`. Cada teste parte de um contexto limpo. Os fluxos rodam em desktop (1440×900) e mobile (Pixel 7). Relatório HTML em `playwright-report/`. Trace só na primeira retentativa, quando `CI` está definido.

Arquivos: `tests/e2e/catalog.spec.ts`, `checkout.spec.ts`, `flows.spec.ts` e `visual.spec.ts`. As baselines de início, detalhe, carrinho e pagamento ficam em `tests/e2e/visual.spec.ts-snapshots/`.

## Lighthouse

Com o preview do build na porta 4173:

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
npm run lighthouse
```

O script grava HTML de início (desktop e mobile) e do detalhe desktop em `lighthouse-reports/`.

## Publicação

O site está no ar em [https://kurio-2ru.pages.dev](https://kurio-2ru.pages.dev), no projeto Cloudflare Pages `kurio`.

| Campo | Valor |
| --- | --- |
| Comando de build | `npm run build` |
| Diretório de saída | `dist` |
| Node | `22` |

`public/_redirects` manda qualquer caminho para `/index.html` com status 200. Refresh e acesso direto das rotas funcionam no Pages. As variáveis `VITE_*` entram no bundle na hora do build: defina `VITE_ENABLE_MSW=true` no projeto antes de publicar, para os mocks e o Socket.IO continuarem no browser.
