'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Mail,
  MoreHorizontal,
  Shield,
  ShieldCheck,
  UserPlus,
  Crown,
  Trash2,
  Pencil,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

type Role = 'owner' | 'admin' | 'editor' | 'viewer'

interface TeamMember {
  id: string
  name: string
  email: string
  avatar?: string
  role: Role
  status: 'active' | 'pending'
  joinedAt: string
}

const MOCK_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Morgan',
    email: 'alex@company.com',
    role: 'owner',
    status: 'active',
    joinedAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Jordan Lee',
    email: 'jordan@company.com',
    role: 'admin',
    status: 'active',
    joinedAt: '2024-03-22',
  },
  {
    id: '3',
    name: 'Sam Rivera',
    email: 'sam@company.com',
    role: 'editor',
    status: 'active',
    joinedAt: '2024-06-10',
  },
  {
    id: '4',
    name: 'Casey Kim',
    email: 'casey@company.com',
    role: 'viewer',
    status: 'active',
    joinedAt: '2024-09-01',
  },
  {
    id: '5',
    name: 'Taylor Chen',
    email: 'taylor@company.com',
    role: 'editor',
    status: 'pending',
    joinedAt: '2025-01-28',
  },
]

const roleConfig: Record<
  Role,
  { label: string; icon: React.ElementType; className: string }
> = {
  owner: {
    label: 'Owner',
    icon: Crown,
    className: 'bg-warning/10 text-warning border-warning/20',
  },
  admin: {
    label: 'Admin',
    icon: ShieldCheck,
    className: 'bg-primary/10 text-primary border-primary/20',
  },
  editor: {
    label: 'Editor',
    icon: Pencil,
    className: 'bg-success/10 text-success border-success/20',
  },
  viewer: {
    label: 'Viewer',
    icon: Shield,
    className: 'bg-muted text-muted-foreground border-border',
  },
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const ManageUsersContainer = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [members, setMembers] = useState<TeamMember[]>(MOCK_MEMBERS)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<Role>('viewer')

  const handleInvite = () => {
    if (!inviteEmail.trim()) return

    const newMember: TeamMember = {
      id: crypto.randomUUID(),
      name: inviteEmail.split('@')[0],
      email: inviteEmail.trim(),
      role: inviteRole,
      status: 'pending',
      joinedAt: new Date().toISOString().split('T')[0],
    }

    setMembers((prev) => [...prev, newMember])
    setInviteEmail('')
    setInviteRole('viewer')
    setInviteOpen(false)

    toast({
      title: 'Invitation sent',
      description: `An invite has been sent to ${newMember.email}.`,
    })
  }

  const handleRoleChange = (memberId: string, newRole: Role) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, role: newRole } : m)),
    )
    toast({
      title: 'Role updated',
      description: `Member role changed to ${newRole}.`,
    })
  }

  const handleRemove = (memberId: string) => {
    const member = members.find((m) => m.id === memberId)
    setMembers((prev) => prev.filter((m) => m.id !== memberId))
    toast({
      title: 'Member removed',
      description: `${member?.name ?? 'User'} has been removed from the team.`,
      variant: 'destructive',
    })
  }

  const activeCount = members.filter((m) => m.status === 'active').length
  const pendingCount = members.filter((m) => m.status === 'pending').length

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => router.push('/app/settings')}
        >
          <ArrowLeft />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-foreground">
            Team Members
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {activeCount} active · {pendingCount} pending
          </p>
        </div>

        <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <UserPlus />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite a team member</DialogTitle>
              <DialogDescription>
                They'll receive an email invitation to join your workspace.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="invite-email">Email address</Label>
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleInvite()}
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select
                  value={inviteRole}
                  onValueChange={(v) => setInviteRole(v as Role)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setInviteOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleInvite} disabled={!inviteEmail.trim()}>
                <Mail />
                Send Invite
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Members Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Joined</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => {
              const rc = roleConfig[member.role]
              const RoleIcon = rc.icon

              return (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        {member.avatar && <AvatarImage src={member.avatar} />}
                        <AvatarFallback className="text-xs">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground leading-tight">
                          {member.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`gap-1 font-medium ${rc.className}`}
                    >
                      <RoleIcon className="h-3 w-3" />
                      {rc.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {member.status === 'active' ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-success">
                        <span className="h-1.5 w-1.5 rounded-full bg-success" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs text-warning">
                        <span className="h-1.5 w-1.5 rounded-full bg-warning" />
                        Pending
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">
                    {new Date(member.joinedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    {member.role !== 'owner' && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-xs">
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem
                            onClick={() => handleRoleChange(member.id, 'admin')}
                            disabled={member.role === 'admin'}
                          >
                            <ShieldCheck className="mr-2 h-3.5 w-3.5" />
                            Make Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleRoleChange(member.id, 'editor')
                            }
                            disabled={member.role === 'editor'}
                          >
                            <Pencil className="mr-2 h-3.5 w-3.5" />
                            Make Editor
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleRoleChange(member.id, 'viewer')
                            }
                            disabled={member.role === 'viewer'}
                          >
                            <Shield className="mr-2 h-3.5 w-3.5" />
                            Make Viewer
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleRemove(member.id)}
                          >
                            <Trash2 className="mr-2 h-3.5 w-3.5" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
export default ManageUsersContainer
