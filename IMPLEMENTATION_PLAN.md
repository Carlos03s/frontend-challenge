# Plano de implementação

O `README.md` é a fonte de verdade para escopo, stack, comportamentos e critérios de aceite.

## 1. Setup inicial

- Iniciar React + TypeScript com Vite.
- Instalar as dependências base da stack obrigatória e as ferramentas desta etapa.
- Configurar Tailwind CSS, shadcn/ui, Storybook, Playwright, ESLint e TypeScript.
- Disponibilizar uma rota raiz vazia apenas para validar a inicialização.
- Não criar componentes de produto, mocks ou fluxos nesta etapa.

Critério de conclusão:

- desenvolvimento, build, lint, typecheck e Storybook iniciam sem erro;
- nenhum fluxo funcional foi antecipado.

## 2. Componentes isolados

- Ler o Figma e inventariar os componentes, estados e composições necessários.
- Definir os tokens visuais a partir do Figma.
- Adaptar os componentes shadcn/ui à identidade visual.
- Criar componentes de UI burra, recebendo apenas props prontas.
- Criar stories para variantes, estados, responsividade, skeletons, erros e interações visuais.
- Validar acessibilidade e os viewports de 390, 768 e 1440 pixels no Storybook.

Critério de conclusão:

- todos os componentes previstos estão navegáveis e verificáveis isoladamente;
- componentes não acessam Router, Query, Axios, MSW ou regras de negócio.

## 3. Contratos e mocks

- Definir contratos tipados para REST e eventos Socket.IO.
- Criar fixtures, pelo menos dois usuários e os cenários determinísticos exigidos.
- Implementar handlers MSW com estado consistente e reset reproduzível.
- Implementar persistência necessária para refresh.
- Simular eventos por integração compatível com Socket.IO, exercitando `socket.io-client`.
- Cobrir latência, respostas fora de ordem, erros, expiração, conflitos e idempotência.

Critério de conclusão:

- REST e tempo real podem ser exercitados pela camada de rede sem lógica fictícia na UI;
- cenários podem ser selecionados e restaurados de forma determinística.

## 4. Integração dos fluxos

- Criar as páginas de rota e manter as definições do TanStack Router finas.
- Orquestrar estado, parâmetros da URL, Query, mutations, navegação e view models nas páginas e hooks.
- Integrar Axios, TanStack Query, sessão, catálogo, favoritos, carrinho, checkout, pedidos, perfil e carteiras.
- Implementar reconciliação REST/Socket.IO, isolamento por usuário, idempotência e recuperação após refresh.
- Conectar somente props prontas aos componentes criados na etapa 2.

Critério de conclusão:

- todos os fluxos do README funcionam contra os mocks;
- nenhum componente de UI contém fetch, Query, mutation ou cálculo de domínio.

## 5. Validação integrada

- Criar os testes Playwright exigidos no README.
- Executar os fluxos principais em Chromium desktop e mobile.
- Adicionar regressão visual com dados estáveis.
- Validar teclado, foco, formulários, skeletons, falhas, tempo real e retomada.
- Garantir isolamento de estado por teste e gerar relatório HTML e traces de falhas.

Critério de conclusão:

- suíte E2E executável e estável;
- fluxos REST passam pelos handlers MSW e fluxos de tempo real passam pelo cliente Socket.IO.

## 6. Auditoria e entrega

- Instalar e configurar a ferramenta de auditoria Lighthouse.
- Executar Lighthouse em início e detalhe, mobile e desktop, com três medições por perfil.
- Registrar medianas, LCP, CLS e TBT.
- Corrigir ou justificar resultados abaixo das metas de performance, acessibilidade, boas práticas e SEO.
- Finalizar documentação, comandos, contratos, decisões e limitações.
- Validar build limpo, acesso direto às rotas e deploy público com mocks funcionando.

Critério de conclusão:

- metas e evidências do README registradas;
- checkout limpo reproduz a aplicação, os testes e as auditorias.
