import { useMemo, useState } from "react"
import { Link } from "react-router"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BellIcon,
  Building2Icon,
  CheckCircle2Icon,
  ChevronDownIcon,
  ChevronsUpDownIcon,
  CircleUserIcon,
  CopyIcon,
  DownloadIcon,
  LayoutDashboardIcon,
  MailPlusIcon,
  MoreHorizontalIcon,
  PackageIcon,
  SearchIcon,
  SettingsIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  UserCheckIcon,
  UserCogIcon,
  UserMinusIcon,
  UsersIcon,
} from "lucide-react"

import { Avatar, AvatarBadge, AvatarFallback } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Checkbox } from "~/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "~/components/ui/empty"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { Separator } from "~/components/ui/separator"
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
import { Switch } from "~/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group"

type UserStatus = "Ativo" | "Pendente" | "Suspenso"
type UserRole = "Administrador" | "Gerente" | "Analista" | "Convidado"
type SortKey = "name" | "role" | "status" | "team" | "lastSeen"
type SortDir = "asc" | "desc"

interface ManagedUser {
  id: string
  name: string
  email: string
  initials: string
  role: UserRole
  status: UserStatus
  team: string
  lastSeen: string
  mfa: boolean
  seats: string
}

const USERS: ManagedUser[] = [
  {
    id: "usr_1029",
    name: "Sofia Andrade",
    email: "sofia.andrade@acme.com",
    initials: "SA",
    role: "Administrador",
    status: "Ativo",
    team: "Operações",
    lastSeen: "Hoje, 09:42",
    mfa: true,
    seats: "Admin",
  },
  {
    id: "usr_1028",
    name: "Rafael Motta",
    email: "rafael.motta@acme.com",
    initials: "RM",
    role: "Gerente",
    status: "Ativo",
    team: "Vendas",
    lastSeen: "Hoje, 08:15",
    mfa: true,
    seats: "Padrão",
  },
  {
    id: "usr_1027",
    name: "Camila Torres",
    email: "camila.torres@acme.com",
    initials: "CT",
    role: "Analista",
    status: "Pendente",
    team: "Financeiro",
    lastSeen: "Convite enviado",
    mfa: false,
    seats: "Padrão",
  },
  {
    id: "usr_1026",
    name: "Lucas Ferreira",
    email: "lucas.ferreira@acme.com",
    initials: "LF",
    role: "Analista",
    status: "Ativo",
    team: "Produto",
    lastSeen: "Ontem, 18:03",
    mfa: true,
    seats: "Padrão",
  },
  {
    id: "usr_1025",
    name: "Ana Beatriz",
    email: "ana.beatriz@acme.com",
    initials: "AB",
    role: "Convidado",
    status: "Suspenso",
    team: "Jurídico",
    lastSeen: "08 Mai 2026",
    mfa: false,
    seats: "Leitura",
  },
  {
    id: "usr_1024",
    name: "Pedro Cavalcanti",
    email: "pedro.cavalcanti@acme.com",
    initials: "PC",
    role: "Gerente",
    status: "Ativo",
    team: "Sucesso",
    lastSeen: "12 Mai 2026",
    mfa: true,
    seats: "Padrão",
  },
  {
    id: "usr_1023",
    name: "Juliana Neves",
    email: "juliana.neves@acme.com",
    initials: "JN",
    role: "Analista",
    status: "Pendente",
    team: "Marketing",
    lastSeen: "Convite enviado",
    mfa: false,
    seats: "Padrão",
  },
  {
    id: "usr_1022",
    name: "Bruno Almeida",
    email: "bruno.almeida@acme.com",
    initials: "BA",
    role: "Administrador",
    status: "Ativo",
    team: "Plataforma",
    lastSeen: "11 Mai 2026",
    mfa: true,
    seats: "Admin",
  },
]

const NAV_MAIN = [
  {
    label: "Dashboard",
    icon: LayoutDashboardIcon,
    active: false,
    badge: null,
    href: "/",
  },
  {
    label: "Usuários",
    icon: UsersIcon,
    active: true,
    badge: "8",
    href: "/usuarios",
  },
  {
    label: "Permissões",
    icon: ShieldCheckIcon,
    active: false,
    badge: null,
    href: null,
  },
  {
    label: "Times",
    icon: Building2Icon,
    active: false,
    badge: null,
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

const STATUS_VARIANT: Record<
  UserStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  Ativo: "secondary",
  Pendente: "outline",
  Suspenso: "destructive",
}

const ROLE_VARIANT: Record<
  UserRole,
  "default" | "secondary" | "destructive" | "outline"
> = {
  Administrador: "default",
  Gerente: "secondary",
  Analista: "outline",
  Convidado: "outline",
}

const STATUS_OPTIONS: Array<UserStatus | "Todos"> = [
  "Todos",
  "Ativo",
  "Pendente",
  "Suspenso",
]

const SORT_COLUMNS: Array<{ key: SortKey; label: string }> = [
  { key: "name", label: "Usuário" },
  { key: "role", label: "Perfil" },
  { key: "status", label: "Status" },
  { key: "team", label: "Time" },
  { key: "lastSeen", label: "Último acesso" },
]

function SortIcon({
  col,
  sortKey,
  sortDir,
}: {
  col: SortKey
  sortKey: SortKey
  sortDir: SortDir
}) {
  if (col !== sortKey) return <ChevronsUpDownIcon />
  if (sortDir === "asc") return <ArrowUpIcon />
  return <ArrowDownIcon />
}

export default function UsersPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<UserStatus | "Todos">(
    "Todos"
  )
  const [roleFilter, setRoleFilter] = useState<UserRole | "Todos">("Todos")
  const [sortKey, setSortKey] = useState<SortKey>("name")
  const [sortDir, setSortDir] = useState<SortDir>("asc")

  const filteredUsers = useMemo(() => {
    let rows = USERS

    if (statusFilter !== "Todos") {
      rows = rows.filter((user) => user.status === statusFilter)
    }

    if (roleFilter !== "Todos") {
      rows = rows.filter((user) => user.role === roleFilter)
    }

    if (search.trim()) {
      const query = search.toLowerCase()
      rows = rows.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.team.toLowerCase().includes(query)
      )
    }

    return [...rows].sort((a, b) => {
      const av = a[sortKey].toLowerCase()
      const bv = b[sortKey].toLowerCase()

      if (av < bv) return sortDir === "asc" ? -1 : 1
      if (av > bv) return sortDir === "asc" ? 1 : -1
      return 0
    })
  }, [roleFilter, search, sortDir, sortKey, statusFilter])

  const activeUsers = USERS.filter((user) => user.status === "Ativo").length
  const pendingUsers = USERS.filter((user) => user.status === "Pendente").length
  const protectedUsers = USERS.filter((user) => user.mfa).length
  const adminUsers = USERS.filter(
    (user) => user.role === "Administrador"
  ).length

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((current) => (current === "asc" ? "desc" : "asc"))
      return
    }

    setSortKey(key)
    setSortDir("asc")
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="Acme Corp">
                <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <ShieldCheckIcon />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Acme Corp</span>
                  <span className="text-xs text-muted-foreground">
                    Console Admin
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Administração</SidebarGroupLabel>
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
                <Avatar>
                  <AvatarFallback>JV</AvatarFallback>
                </Avatar>
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
        <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" />
          <div className="flex flex-1 items-center gap-2">
            <span className="text-sm text-muted-foreground">Usuários</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon-sm">
              <BellIcon />
              <span className="sr-only">Notificações</span>
            </Button>
            <Button variant="outline" size="sm">
              <DownloadIcon data-icon="inline-start" />
              Exportar
            </Button>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-6 p-6">
          <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex max-w-2xl flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">
                Administração
              </p>
              <h1 className="text-2xl font-semibold tracking-tight">
                Gerenciamento de usuários
              </h1>
              <p className="text-sm text-muted-foreground">
                Controle acessos, convites, perfis e segurança da equipe em um
                só lugar.
              </p>
            </div>

            <Dialog>
              <DialogTrigger render={<Button />}>
                <MailPlusIcon data-icon="inline-start" />
                Convidar usuário
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Convidar usuário</DialogTitle>
                  <DialogDescription>
                    Envie um convite com o perfil e o time corretos.
                  </DialogDescription>
                </DialogHeader>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="invite-email">E-mail</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <MailPlusIcon />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="invite-email"
                        type="email"
                        placeholder="nome@empresa.com"
                      />
                    </InputGroup>
                  </Field>
                  <Field>
                    <FieldLabel>Perfil</FieldLabel>
                    <Select defaultValue="Analista">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {(
                            [
                              "Administrador",
                              "Gerente",
                              "Analista",
                              "Convidado",
                            ] as UserRole[]
                          ).map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FieldDescription>
                      O perfil poderá ser alterado depois.
                    </FieldDescription>
                  </Field>
                  <Field orientation="horizontal">
                    <Switch defaultChecked />
                    <div className="flex flex-col gap-0.5">
                      <FieldLabel>Exigir MFA no primeiro acesso</FieldLabel>
                      <FieldDescription>
                        Recomendado para contas com dados sensíveis.
                      </FieldDescription>
                    </div>
                  </Field>
                </FieldGroup>
                <DialogFooter>
                  <Button variant="outline">Salvar rascunho</Button>
                  <Button>Enviar convite</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Card size="sm">
              <CardHeader>
                <CardTitle>Ativos</CardTitle>
                <CardDescription>Usuários com acesso liberado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between gap-3">
                  <span className="text-3xl font-semibold tracking-tight">
                    {activeUsers}
                  </span>
                  <Badge variant="secondary">
                    <CheckCircle2Icon data-icon="inline-start" />
                    Saudável
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card size="sm">
              <CardHeader>
                <CardTitle>Convites</CardTitle>
                <CardDescription>Aguardando aceite</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between gap-3">
                  <span className="text-3xl font-semibold tracking-tight">
                    {pendingUsers}
                  </span>
                  <Badge variant="outline">Pendentes</Badge>
                </div>
              </CardContent>
            </Card>
            <Card size="sm">
              <CardHeader>
                <CardTitle>MFA</CardTitle>
                <CardDescription>Contas com proteção ativa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between gap-3">
                  <span className="text-3xl font-semibold tracking-tight">
                    {protectedUsers}/{USERS.length}
                  </span>
                  <Badge variant="secondary">
                    <ShieldCheckIcon data-icon="inline-start" />
                    Seguro
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card size="sm">
              <CardHeader>
                <CardTitle>Admins</CardTitle>
                <CardDescription>Com acesso privilegiado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between gap-3">
                  <span className="text-3xl font-semibold tracking-tight">
                    {adminUsers}
                  </span>
                  <Badge variant="default">Revisar</Badge>
                </div>
              </CardContent>
            </Card>
          </section>

          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div className="flex flex-col gap-1">
                  <CardTitle>Diretório</CardTitle>
                  <CardDescription>
                    {filteredUsers.length} de {USERS.length} usuários
                    encontrados
                  </CardDescription>
                </div>
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                  <div className="w-full md:w-80">
                    <InputGroup>
                      <InputGroupAddon>
                        <SearchIcon />
                      </InputGroupAddon>
                      <InputGroupInput
                        placeholder="Buscar por nome, e-mail ou time"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                      />
                    </InputGroup>
                  </div>
                  <Select
                    value={roleFilter}
                    onValueChange={(value) =>
                      setRoleFilter(value as UserRole | "Todos")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Todos">Todos os perfis</SelectItem>
                        <SelectItem value="Administrador">
                          Administrador
                        </SelectItem>
                        <SelectItem value="Gerente">Gerente</SelectItem>
                        <SelectItem value="Analista">Analista</SelectItem>
                        <SelectItem value="Convidado">Convidado</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <SlidersHorizontalIcon data-icon="inline-start" />
                    Colunas
                  </Button>
                </div>
              </div>

              <ToggleGroup
                value={[statusFilter]}
                onValueChange={(values) => {
                  if (values[0]) {
                    setStatusFilter(values[0] as UserStatus | "Todos")
                  }
                }}
                spacing={2}
                size="sm"
              >
                {STATUS_OPTIONS.map((status) => (
                  <ToggleGroupItem key={status} value={status}>
                    {status}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </CardHeader>

            <Separator />

            <CardContent>
              {filteredUsers.length === 0 ? (
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <UsersIcon />
                    </EmptyMedia>
                    <EmptyTitle>Nenhum usuário encontrado</EmptyTitle>
                    <EmptyDescription>
                      Ajuste os filtros ou envie um novo convite para a equipe.
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <Button variant="outline" size="sm">
                      Limpar filtros
                    </Button>
                  </EmptyContent>
                </Empty>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <Checkbox aria-label="Selecionar todos os usuários" />
                      </TableHead>
                      {SORT_COLUMNS.map((column) => (
                        <TableHead key={column.key}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSort(column.key)}
                          >
                            {column.label}
                            <SortIcon
                              col={column.key}
                              sortKey={sortKey}
                              sortDir={sortDir}
                            />
                          </Button>
                        </TableHead>
                      ))}
                      <TableHead>MFA</TableHead>
                      <TableHead>
                        <span className="sr-only">Ações</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Checkbox aria-label={`Selecionar ${user.name}`} />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{user.initials}</AvatarFallback>
                              {user.status === "Ativo" && <AvatarBadge />}
                            </Avatar>
                            <div className="flex min-w-52 flex-col">
                              <span className="font-medium">{user.name}</span>
                              <span className="text-sm text-muted-foreground">
                                {user.email}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={ROLE_VARIANT[user.role]}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={STATUS_VARIANT[user.status]}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{user.team}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {user.lastSeen}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.mfa ? "secondary" : "outline"}>
                            {user.mfa ? "Ativo" : "Pendente"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={<Button variant="ghost" size="icon-sm" />}
                            >
                              <MoreHorizontalIcon />
                              <span className="sr-only">
                                Abrir ações de {user.name}
                              </span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuGroup>
                                <DropdownMenuLabel>{user.id}</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <UserCogIcon />
                                  Editar perfil
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <CopyIcon />
                                  Copiar e-mail
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <UserCheckIcon />
                                  Reenviar convite
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem variant="destructive">
                                <UserMinusIcon />
                                Suspender acesso
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
