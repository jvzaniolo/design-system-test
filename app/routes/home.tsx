import { useState, useMemo } from "react"
import { Link } from "react-router"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BarChart3Icon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronsUpDownIcon,
  LayoutDashboardIcon,
  PackageIcon,
  SearchIcon,
  SettingsIcon,
  ShoppingCartIcon,
  TrendingUpIcon,
  UsersIcon,
  BellIcon,
  CircleUserIcon,
  DollarSignIcon,
  PercentIcon,
} from "lucide-react"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "~/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { Separator } from "~/components/ui/separator"

// ─── Types ───────────────────────────────────────────────────────────────────

type OrderStatus = "Concluído" | "Pendente" | "Cancelado" | "Processando"
type SortKey = "id" | "customer" | "product" | "status" | "date" | "amount"
type SortDir = "asc" | "desc"

interface Order {
  id: string
  customer: string
  product: string
  status: OrderStatus
  date: string
  amount: number
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ORDERS: Order[] = [
  {
    id: "#8821",
    customer: "Sofia Andrade",
    product: "Plano Enterprise",
    status: "Concluído",
    date: "13 Mai 2026",
    amount: 2490.0,
  },
  {
    id: "#8820",
    customer: "Rafael Motta",
    product: "Plano Pro",
    status: "Processando",
    date: "13 Mai 2026",
    amount: 790.0,
  },
  {
    id: "#8819",
    customer: "Camila Torres",
    product: "Add-on Analytics",
    status: "Pendente",
    date: "12 Mai 2026",
    amount: 290.0,
  },
  {
    id: "#8818",
    customer: "Lucas Ferreira",
    product: "Plano Starter",
    status: "Concluído",
    date: "12 Mai 2026",
    amount: 190.0,
  },
  {
    id: "#8817",
    customer: "Ana Beatriz",
    product: "Plano Enterprise",
    status: "Cancelado",
    date: "11 Mai 2026",
    amount: 2490.0,
  },
  {
    id: "#8816",
    customer: "Pedro Cavalcanti",
    product: "Plano Pro",
    status: "Concluído",
    date: "11 Mai 2026",
    amount: 790.0,
  },
  {
    id: "#8815",
    customer: "Juliana Neves",
    product: "Add-on Storage",
    status: "Pendente",
    date: "10 Mai 2026",
    amount: 150.0,
  },
  {
    id: "#8814",
    customer: "Bruno Almeida",
    product: "Plano Starter",
    status: "Concluído",
    date: "10 Mai 2026",
    amount: 190.0,
  },
  {
    id: "#8813",
    customer: "Mariana Souza",
    product: "Plano Enterprise",
    status: "Concluído",
    date: "09 Mai 2026",
    amount: 2490.0,
  },
  {
    id: "#8812",
    customer: "Felipe Rocha",
    product: "Add-on Analytics",
    status: "Processando",
    date: "09 Mai 2026",
    amount: 290.0,
  },
  {
    id: "#8811",
    customer: "Isabela Lima",
    product: "Plano Pro",
    status: "Concluído",
    date: "08 Mai 2026",
    amount: 790.0,
  },
  {
    id: "#8810",
    customer: "Thiago Martins",
    product: "Plano Starter",
    status: "Cancelado",
    date: "08 Mai 2026",
    amount: 190.0,
  },
]

const NAV_MAIN = [
  {
    label: "Dashboard",
    icon: LayoutDashboardIcon,
    active: true,
    badge: null,
    href: "/",
  },
  {
    label: "Analytics",
    icon: BarChart3Icon,
    active: false,
    badge: null,
    href: null,
  },
  {
    label: "Usuários",
    icon: UsersIcon,
    active: false,
    badge: "2.8k",
    href: "/usuarios",
  },
  {
    label: "Pedidos",
    icon: ShoppingCartIcon,
    active: false,
    badge: "12",
    href: null,
  },
  {
    label: "Produtos",
    icon: PackageIcon,
    active: false,
    badge: null,
    href: null,
  },
]

const STATS = [
  {
    label: "Receita Total",
    value: "R$ 48.291",
    sub: "+12,5% vs mês anterior",
    trend: "up",
    icon: DollarSignIcon,
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    label: "Usuários Ativos",
    value: "2.847",
    sub: "+8,2% vs mês anterior",
    trend: "up",
    icon: UsersIcon,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/40",
  },
  {
    label: "Pedidos",
    value: "1.234",
    sub: "+3,7% vs mês anterior",
    trend: "up",
    icon: ShoppingCartIcon,
    color: "text-violet-600",
    bg: "bg-violet-50 dark:bg-violet-950/40",
  },
  {
    label: "Ticket Médio",
    value: "R$ 39,13",
    sub: "-2,1% vs mês anterior",
    trend: "down",
    icon: PercentIcon,
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/40",
  },
]

type BadgeVariant = "default" | "secondary" | "destructive" | "outline"

const STATUS_VARIANT: Record<OrderStatus, BadgeVariant> = {
  Concluído: "secondary",
  Processando: "default",
  Pendente: "outline",
  Cancelado: "destructive",
}

// ─── Components ───────────────────────────────────────────────────────────────

function SortIcon({
  col,
  sortKey,
  sortDir,
}: {
  col: SortKey
  sortKey: SortKey
  sortDir: SortDir
}) {
  if (col !== sortKey)
    return (
      <ChevronsUpDownIcon className="ml-1 inline size-3.5 text-muted-foreground/50" />
    )
  if (sortDir === "asc")
    return <ChevronUpIcon className="ml-1 inline size-3.5 text-foreground" />
  return <ChevronDownIcon className="ml-1 inline size-3.5 text-foreground" />
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<SortKey>("date")
  const [sortDir, setSortDir] = useState<SortDir>("desc")
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "Todos">(
    "Todos"
  )

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("desc")
    }
  }

  const filtered = useMemo(() => {
    let rows = ORDERS

    if (statusFilter !== "Todos") {
      rows = rows.filter((o) => o.status === statusFilter)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      rows = rows.filter(
        (o) =>
          o.customer.toLowerCase().includes(q) ||
          o.product.toLowerCase().includes(q) ||
          o.id.toLowerCase().includes(q)
      )
    }

    return [...rows].sort((a, b) => {
      let av: string | number = a[sortKey]
      let bv: string | number = b[sortKey]
      if (typeof av === "string") av = av.toLowerCase()
      if (typeof bv === "string") bv = bv.toLowerCase()
      if (av < bv) return sortDir === "asc" ? -1 : 1
      if (av > bv) return sortDir === "asc" ? 1 : -1
      return 0
    })
  }, [search, sortKey, sortDir, statusFilter])

  const statuses: Array<OrderStatus | "Todos"> = [
    "Todos",
    "Concluído",
    "Processando",
    "Pendente",
    "Cancelado",
  ]

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="Acme Corp">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <TrendingUpIcon className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Acme Corp</span>
                  <span className="text-xs text-muted-foreground">
                    Pro Plan
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {NAV_MAIN.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      isActive={item.active}
                      tooltip={item.label}
                      render={item.href ? <Link to={item.href} /> : undefined}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarSeparator />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Configurações">
                <SettingsIcon />
                <span>Configurações</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="João Vitor">
                <div className="flex size-8 items-center justify-center rounded-full bg-muted">
                  <CircleUserIcon className="size-5 text-muted-foreground" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="text-sm font-medium">João Vitor</span>
                  <span className="text-xs text-muted-foreground">
                    joao@acme.com
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-4" />
          <div className="flex flex-1 items-center gap-2">
            <span className="text-sm text-muted-foreground">Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon-sm">
              <BellIcon className="size-4" />
            </Button>
            <Button variant="outline" size="sm">
              Exportar
            </Button>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-6 p-6">
          {/* Page title */}
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Visão Geral
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Maio 2026 · Atualizado agora
            </p>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STATS.map((stat) => (
              <Card key={stat.label} size="sm">
                <CardHeader className="pb-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                      {stat.label}
                    </CardTitle>
                    <div className={`rounded-lg p-1.5 ${stat.bg}`}>
                      <stat.icon className={`size-4 ${stat.color}`} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="text-2xl font-bold tracking-tight">
                    {stat.value}
                  </p>
                  <p
                    className={`mt-1 flex items-center gap-1 text-xs ${stat.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpIcon className="size-3" />
                    ) : (
                      <ArrowDownIcon className="size-3" />
                    )}
                    {stat.sub}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Orders table */}
          <Card className="flex-1">
            <CardHeader className="border-b pb-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Pedidos Recentes</CardTitle>
                  <CardDescription className="mt-0.5">
                    {filtered.length} de {ORDERS.length} pedidos
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <SearchIcon className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Buscar pedido..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="h-8 w-48 pl-8 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Status filters */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <ToggleGroup
                  value={[statusFilter]}
                  onValueChange={(vals) => {
                    if (vals[0]) {
                      setStatusFilter(vals[0] as OrderStatus | "Todos")
                    }
                  }}
                  spacing={2}
                  className="flex-wrap"
                >
                  {statuses.map((s) => (
                    <ToggleGroupItem key={s} value={s} size="sm">
                      {s}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    {(
                      [
                        { key: "id", label: "Pedido" },
                        { key: "customer", label: "Cliente" },
                        { key: "product", label: "Produto" },
                        { key: "status", label: "Status" },
                        { key: "date", label: "Data" },
                        { key: "amount", label: "Valor" },
                      ] as { key: SortKey; label: string }[]
                    ).map((col) => (
                      <TableHead
                        key={col.key}
                        className="cursor-pointer px-4 select-none"
                        onClick={() => handleSort(col.key)}
                      >
                        {col.label}
                        <SortIcon
                          col={col.key}
                          sortKey={sortKey}
                          sortDir={sortDir}
                        />
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="py-10 text-center text-sm text-muted-foreground"
                      >
                        Nenhum pedido encontrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="px-4 font-mono text-xs text-muted-foreground">
                          {order.id}
                        </TableCell>
                        <TableCell className="px-4 font-medium">
                          {order.customer}
                        </TableCell>
                        <TableCell className="px-4 text-muted-foreground">
                          {order.product}
                        </TableCell>
                        <TableCell className="px-4">
                          <Badge variant={STATUS_VARIANT[order.status]}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-4 text-sm text-muted-foreground">
                          {order.date}
                        </TableCell>
                        <TableCell className="px-4 font-semibold tabular-nums">
                          {order.amount.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
