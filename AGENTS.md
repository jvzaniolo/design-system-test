## Design System

Componentes em `app/components/ui/` são a fonte da verdade visual.

- Use os componentes em vez de primitivas (`<Button>` não `<button>`, `<ToggleGroup>` não chips manuais, `<Badge>` não spans coloridos).
- Use os `variant`/`size` que já existem — leia `cva({ variants })` do componente.
- **Nunca passe `className` para mudar visual** de `components/ui/*` (cor, borda, padding, tipografia, estado). `className` só serve para layout externo: margem, posição, largura.
- **Nunca use cores cruas do Tailwind** (`bg-emerald-50`, `text-red-700`). Use tokens semânticos: `bg-primary`, `text-destructive`, `text-muted-foreground`.
- Se nenhum variant serve, **pare e proponha** adicionar o variant ao componente antes de seguir.

Trate `components/ui/*` como caixa-preta: consuma a API, não imite a implementação. **Não use código deste repo como referência** — múltiplos contribuidores, padrões inconsistentes.

## Protocolo de descoberta (obrigatório antes de escrever código com libs)

Memória de treino está desatualizada. Versões aqui são pinadas. Inferência "eu sei como funciona" está proibida.

1. **`package.json`** — identifique a versão exata da lib.
2. **context7** — `mcp__context7__resolve-library-id` → `mcp__context7__query-docs` (com versão quando indexada, ex: `/mui/base-ui/v1.4.1`).
3. **`WebSearch`** se context7 não cobrir — fallback obrigatório. Ordem de preferência:
   1. Docs oficiais (`site:docs.X.dev`)
   2. GitHub do projeto (README, CHANGELOG, `examples/`, issues da versão)
   3. MDN / specs W3C
   4. Engenharia de fontes reconhecidas (Vercel, mantenedor)

   Evite Stack Overflow, blogs sem data, conteúdo gerado por IA.
4. **Escreva o código** citando a fonte no thinking.

Se nada acima cobrir, declare na conversa: *"sem docs; usando memória, pode estar desatualizado"*.

**Pula o protocolo apenas para:** refatoração pura sem APIs externas, lógica TS/JS pura, ou estender arquivo que já mostra o padrão certo.

## Skills relevantes

`vercel-react-best-practices` · `vercel-composition-patterns` · `web-design-guidelines` · `frontend-design`
