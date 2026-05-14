## Design System

Componentes em `app/components/ui/` são a fonte da verdade visual.

- Use os componentes em vez de primitivos (`<Button>` não `<button>`, `<ToggleGroup>` não chips manuais, `<Badge>` não spans coloridos).
- Use os `variant`/`size` que já existem — leia `cva({ variants })` do componente.
- **Nunca passe `className` para mudar visual** de `components/ui/*` (cor, borda, padding, tipografia, estado). `className` só serve para layout externo: margem, posição, largura.
- **Nunca use cores cruas do Tailwind** (`bg-emerald-50`, `text-red-700`). Use tokens semânticos: `bg-primary`, `text-destructive`, `text-muted-foreground`.
- Se nenhum variant serve, **pare e proponha** adicionar o variant ao componente antes de seguir.

Trate `components/ui/*` como caixa-preta: consuma a API, não imite a implementação. **Não use código deste repo como referência** — múltiplos contribuidores, padrões inconsistentes.
