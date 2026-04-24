## Objetivo

Aplicar refinamentos de UX/UI nas 4 telas do projeto `nr1-nova-tela` (vitrine `index`, `avaliacao-intro`, `questionario`, `obrigado`), **mantendo intacta a estrutura de páginas, a árvore de componentes e a lógica de funcionamento**. Apenas ajustes de estilo, micro-cópia, layout e consistência visual.

Excluído desta entrega (a pedido): modo noturno, ilustração de fundo na tela de obrigado, indicador de tempo estimado restante.

---

## Escopo por tela

### 1. `src/routes/avaliacao-intro.tsx` — Instruções

- Botão "voltar" do topo: trocar fundo laranja sólido por estilo **outline/ghost** (ícone laranja, fundo branco, borda accent). Mantém tamanho 40×40 e mesma ação.
- Acima do `<h1>`: adicionar **kicker** `AVALIAÇÃO • COPSOQ II` em maiúsculas, tracking largo, cor accent.
- Bloco "Escala de respostas": transformar as 5 palavras (Nunca → Sempre) em **5 chips/pílulas** com gradiente sutil de intensidade (cinza claro → laranja).
- Frase "Não existem respostas certas ou erradas": envolver em **callout** (`bg-accent/5`, borda lateral accent, ícone Info à esquerda).
- Botão "prosseguir" circular: manter circular flutuante apenas em `lg+`. Em mobile/tablet, exibir CTA **pill full-width fixo no rodapé** com o texto `Começar avaliação →`. Mesma função `handleForward`.

### 2. `src/routes/questionario.tsx` — Pergunta atual

- Header/breadcrumb:
  - Remover ícone `Undo2` decorativo em círculo laranja.
  - "Vitrine" vira `<Link to="/">` real com hover sublinhado.
  - Adicionar à direita do header o contador `Pergunta X de Y`.
- Numeração da pergunta (`1.`): reduzir de `text-5xl/6xl` para `text-3xl/4xl` e mudar para cor accent (laranja) — vira marcador, não manchete.
- Lista de opções:
  - Aumentar altura para `h-14 md:h-16` e texto `text-base md:text-lg`.
  - Trocar separação por borda inferior por **cards empilhados** com `gap-2`, `rounded-xl`, `border`.
  - Adicionar índice numérico discreto à direita (`0`–`4`) em `text-xs text-muted-foreground`.
- Setas flutuantes desktop (left/right fixas na viewport):
  - Remover do canto da tela.
  - Mover para **dentro do card de pergunta**, ancoradas no rodapé do `<main>`: `← Anterior` (ghost) e `Próxima →` (primário, com texto). Lógica `goPrev/goNext` inalterada.
- Hint "Selecione uma alternativa para continuar": adicionar ícone `Info`, mudar cor para `text-accent` quando pergunta não respondida.
- `PaginationPanel`:
  - Tooltip no hover de cada número com prévia (~40 chars) do texto da pergunta.
  - Trocar quadradinho "respondido" de `bg-[#1e293b]` (quase preto) por `bg-primary` (azul de marca).
  - Substituir o ponto branco decorativo por um `Check` mini, ou remover (manter só o fundo cheio).
- Barra de progresso: aumentar de `h-1` para `h-1.5`, adicionar `aria-valuenow`, exibir `{progress}%` como **chip flutuante** posicionado sobre o ponto atual da barra.

### 3. `src/routes/obrigado.tsx` — Confirmação

- Acima do título: **círculo de sucesso** 80×80 com `bg-accent/10` e ícone `Check` accent dentro.
- Parágrafo principal: trocar `font-bold` por `font-medium` (corrige hierarquia tipográfica).
- Botão "Voltar ao início": adicionar **botão secundário irmão** `Baixar respostas (PDF)` (visual apenas, usando dependências já presentes — implementação básica de download via `jspdf`).
- Botão "voltar" do topo: mesmo tratamento ghost/outline da tela de intro. Atualizar `aria-label` para `Voltar à vitrine`.

### 4. `src/routes/index.tsx` — Vitrine "Lector"

- Navbar:
  - Remover a `<div>` central vazia entre logo e busca.
  - Limpar `useState`s órfãos (`isMobileMenuOpen`, `isMinhaAreaOpen`) que não estão conectados a nada.
- 17 seções (Simples 1–5, Completo 1–5, Avançado 1–7): agrupar em **3 abas** (`Simples | Completo | Avançado`) usando `@radix-ui/react-tabs` (já no package). Cada aba renderiza suas variantes — nenhum card é alterado, apenas reagrupados.
- Banners do `picsum.photos`: substituir por banners com **gradiente de marca** (`from-brand-primary to-brand-secondary`) e título/CTA mock realista. Estrutura `BANNERS[]` mantida.
- Busca com sugestões:
  - Adicionar fallback para `thumb` vazio (placeholder com inicial do título sobre `bg-brand-primary/10`).
  - Atalho `/` para focar a busca (listener no document).
- Dropdown do usuário: envolver em `DropdownMenu` do Radix (já instalado) para fechar ao clicar fora — comportamento esperado.

### 5. Ajustes transversais

- **Unificar paleta**: substituir cores hardcoded (`#003A75`, `#1e293b`, `#f26c24`, `#F28220`, `text-gray-*`) pelos tokens já existentes em `src/index.css` e classes `brand-primary`/`brand-accent`. Single source of truth.
- **Foco visível**: adicionar `focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2` em todos os botões circulares laranja (intro, obrigado, questionário). WCAG 2.4.7.
- **Micro-feedback ao responder** no questionário: animação curta (`motion`) ao selecionar uma opção + pulsação sutil no botão "Próxima" enquanto não avança. Sem auto-advance — apenas reforço visual. `setAnswer` inalterado.

---

## O que NÃO muda

- Roteamento e navegação entre telas.
- Estrutura de dados (`SECTIONS`, `BANNERS`, `QUESTIONS`, `SCALES`, `useSurveyState`).
- Hooks, estados e funções de lógica (`handleForward`, `goNext`, `goPrev`, `select`, `setAnswer`, `setCurrent`).
- Hierarquia de componentes (`Navbar`, `PaginationPanel`, etc. continuam existindo nos mesmos arquivos).
- Bibliotecas — só usa o que já está no `package.json`.

---

## Detalhes técnicos

- **Tailwind v4** já configurado com `@theme` e tokens CSS — todas as cores novas via `bg-brand-primary`, `text-accent`, etc.
- **Tabs na vitrine**: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"`.
- **Dropdown do usuário**: `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"` — preserva o conteúdo atual do menu, só troca o wrapper.
- **Tooltip de paginação**: `import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"`.
- **PDF na obrigado**: `jspdf` já instalado — função simples que gera PDF com lista `pergunta → resposta` a partir do estado salvo.
- **Atalho `/` na busca**: `useEffect` com `keydown` listener + `inputRef.current?.focus()`, com guard para ignorar quando já há foco em input/textarea.