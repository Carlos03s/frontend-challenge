# Arquitetura — mocks e contratos (fase 3)

Este documento descreve a camada de simulação (MSW + Socket.IO) e os contratos REST usados pela aplicação. Setup, credenciais e cenários estão no [README.md](./README.md).

## Ativação

| Variável | Default | Descrição |
| --- | --- | --- |
| `VITE_ENABLE_MSW` | `true` | Inicia o Service Worker MSW no browser |
| `VITE_API_BASE_URL` | `/api` | Prefixo REST interceptado pelo MSW |
| `VITE_MOCK_SCENARIO` | `default` | Cenário inicial se não houver persistência |
| `VITE_SOCKET_PATH` | `/socket.io` | Path do cliente Socket.IO |

Copie [.env.example](./.env.example) para `.env` para desenvolvimento local.

Persistência do estado simulado: `localStorage` (`kurio-mock-db-v2`). Cenário selecionado: `kurio-mock-scenario`. Pedido em andamento no checkout: `sessionStorage` (`kurio-active-order-id`).

## Cache e sessão

O TanStack Query usa `staleTime` de 30 segundos e `retry` 1, sem refetch ao focar a janela. A sessão fica no `localStorage` (`kurio-session-token`), expira em 8 horas e, ao receber `SESSION_EXPIRED`, limpa carrinho, perfil, favoritos e a query de pedidos antes de redirecionar para o login. Visitantes também conectam o Socket.IO para receber `nft.updated`; `order.updated` continua restrito a quem enviou `session.subscribe`. Eventos com `eventId` repetido ou `version` menor que a já aplicada são descartados.

## Credenciais fictícias

| Usuário | E-mail | Senha |
| --- | --- | --- |
| Colecionador | `collector@kurio.test` | `Password123!` |
| Artista | `artist@kurio.test` | `Password123!` |

Cupons: `LAUNCH2026` (válido), `EXPIRED2025` (expirado).

## Cenários (`POST /api/mock/reset`)

| Nome | Uso |
| --- | --- |
| `default` | Fluxo feliz, latência baixa, pagamento confirmado |
| `slow` | Latência alta (skeletons / loading) |
| `empty-catalog` | Catálogo vazio |
| `unstable` | Falhas 503 intermitentes (~25%) |
| `payment-rejected` | Pedido recusado após pendência |
| `payment-timeout` | Confirmação lenta (~12s) para idempotência |

Consulta do cenário ativo: `GET /api/mock/state`.

Disparo manual de alteração de preço (testes): `POST /api/mock/trigger/nft-price-change` com `{ "nftId", "priceEth" }` — emite `nft.updated` via Socket.IO. `POST /api/mock/trigger/nft-event-replay` repete o último evento. `POST /api/mock/trigger/nft-stale-event` com `{ "nftId" }` emite o mesmo recurso na versão 1.

## Contratos REST (resumo)

Base: `{VITE_API_BASE_URL}`. Erros: `{ error: { code, message, details? } }`.

| Método | Caminho | Auth | Descrição |
| --- | --- | --- | --- |
| POST | `/auth/register` | — | Cadastro |
| POST | `/auth/login` | — | Login (mescla carrinho convidado via header `X-Guest-Cart-Id`) |
| GET | `/auth/session` | Bearer | Sessão atual |
| POST | `/auth/logout` | Bearer | Encerrar sessão |
| GET | `/nfts` | — | Listagem (`q`, `collectionIds`, `networkIds`, `minPriceEth`, `maxPriceEth`, `sort`, `page`, `pageSize`) |
| GET | `/nfts/:nftId` | opcional | Detalhe (+ favorito se autenticado) |
| GET/POST/DELETE | `/favorites`, `/favorites/:nftId` | Bearer | Favoritos |
| GET/POST/PATCH/DELETE | `/cart`, `/cart/items`, `/cart/items/:itemId` | opcional | Carrinho (`X-Guest-Cart-Id` para visitante) |
| POST/DELETE | `/cart/promo` | opcional | Cupom |
| POST | `/cart/quote` | opcional | Cotação + issues de stale |
| POST | `/orders` | Bearer | Cria pedido (`Idempotency-Key` obrigatório) |
| GET | `/orders/:orderId` | Bearer | Estado / recibo |
| GET/PATCH | `/profile` | Bearer | Perfil |
| POST | `/profile/password` | Bearer | Senha |
| GET | `/wallets` | Bearer | Carteiras |
| PUT | `/wallets/primary`, `/wallets/secondary` | Bearer | Salvar carteira |

Valores monetários em **strings decimais ETH** (precisão interna 6 casas em `utils/ethDecimal.ts`).

## Socket.IO (MSW + `@mswjs/socket.io-binding`)

- Interceptação WebSocket: o MSW remove o prefixo `/socket.io/` antes de comparar, então o handler usa a origem da página (`getSocketIoWebSocketLinkPattern()`).
- O `socket.io-client` é importado só depois do MSW substituir `WebSocket`. Um import estático no bundle inicial captura o construtor nativo e o mock deixa de receber a conexão.
- Após conectar, o cliente emite `session.subscribe` com `{ token }` para receber eventos privados de pedido.
- Eventos:
  - **`nft.updated`**: broadcast — preço/edições atualizados (`NftUpdatedEventPayload`).
  - **`order.updated`**: apenas assinantes do `userId` da sessão (`OrderUpdatedEventPayload`).

### Limitações do binding

O pacote MSW não replica salas/namespaces avançados do Socket.IO; a simulação cobre encode/decode, listeners e `emit` ponto-a-ponto. A aplicação usa o cliente oficial `socket.io-client`; a lógica de negócio **não** simula eventos na UI.

## Cliente HTTP e socket

- Axios: [`src/api/httpClient.ts`](src/api/httpClient.ts) — injeta `Authorization` e `X-Guest-Cart-Id`.
- Socket: [`src/api/socket/createSocketClient.ts`](src/api/socket/createSocketClient.ts).

## Estrutura de pastas

```
src/types/api/          # DTOs e códigos de erro
src/mocks/fixtures/     # Seed determinístico
src/mocks/db/           # Estado + persistência
src/mocks/services/     # Regras de negócio da simulação
src/mocks/handlers/     # MSW HTTP + WebSocket
src/mocks/socket/       # Registro de conexões e emissão
```

Tipos de domínio da UI permanecem em `src/types/`; DTOs de transporte em `src/types/api/`.

## Node (Playwright)

[`src/mocks/startNodeMocks.ts`](src/mocks/startNodeMocks.ts) exporta `setupServer` para testes E2E que rodem fora do Service Worker. Com `VITE_ENABLE_MSW=true`, o dev server já usa o worker no browser.
