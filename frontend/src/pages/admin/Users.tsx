import { useEffect, useState } from "react";
import { Search, Shield, ShieldOff, Mail, User, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { AdminUser } from "@/data/adminMockData";
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

export default function Users() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

    const filtered = users.filter((u) => {
        const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
        const matchRole = roleFilter === "All" || u.role === roleFilter;
        const matchStatus = statusFilter === "All" || u.status === statusFilter;
        return matchSearch && matchRole && matchStatus;
    });

    useEffect(() => {
        api.adminListUsers()
            .then((data) => {
                const mapped = data.map((user) => ({
                    id: user.id || user._id || "",
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    status: user.status || "active",
                    joinedDate: user.createdAt ? new Date(user.createdAt).toISOString().slice(0, 10) : "",
                    orders: 0,
                })) as AdminUser[];
                setUsers(mapped);
            })
            .catch((error) => {
                toast({ title: "Failed to load users", description: (error as Error).message, variant: "destructive" });
            });
    }, []);

    const toggleStatus = async (id: string) => {
        const target = users.find((u) => u.id === id);
        if (!target) return;
        const newStatus = target.status === "active" ? "blocked" : "active";
        try {
            await api.adminUpdateUser(id, { status: newStatus });
            setUsers((prev) =>
                prev.map((u) => (u.id === id ? { ...u, status: newStatus as "active" | "blocked" } : u))
            );
            setSelectedUser((prev) =>
                prev && prev.id === id ? { ...prev, status: newStatus as "active" | "blocked" } : prev
            );
            toast({ title: `User ${newStatus === "active" ? "unblocked" : "blocked"} successfully` });
        } catch (error) {
            toast({ title: "Failed to update user", description: (error as Error).message, variant: "destructive" });
        }
    };

    const userOrders = (email: string) => [] as { id: string; date: string; total: number; status: string }[];

    const stats = [
        { label: "Total Users", value: users.length, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Active", value: users.filter((u) => u.status === "active").length, color: "text-green-600", bg: "bg-green-50" },
        { label: "Blocked", value: users.filter((u) => u.status === "blocked").length, color: "text-red-600", bg: "bg-red-50" },
        { label: "Admins", value: users.filter((u) => u.role === "admin").length, color: "text-purple-600", bg: "bg-purple-50" },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Users</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Manage customer accounts and permissions</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {stats.map((s) => (
                    <Card key={s.label}>
                        <CardContent className={`p-4 ${s.bg} rounded-xl`}>
                            <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
                            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
                        </div>
                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Roles</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="blocked">Blocked</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Table */}
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/40">
                                <TableHead className="pl-4">User</TableHead>
                                <TableHead className="hidden md:table-cell">Email</TableHead>
                                <TableHead className="hidden sm:table-cell">Role</TableHead>
                                <TableHead className="hidden lg:table-cell">Joined</TableHead>
                                <TableHead className="hidden md:table-cell">Orders</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right pr-4">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.map((user) => (
                                <TableRow key={user.id} className="hover:bg-muted/20">
                                    <TableCell className="pl-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                                                }`}>
                                                {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                            </div>
                                            <span className="font-medium text-sm">{user.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{user.email}</TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"
                                            }`}>
                                            {user.role}
                                        </span>
                                    </TableCell>
                                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{user.joinedDate}</TableCell>
                                    <TableCell className="hidden md:table-cell text-sm font-medium">{user.orders}</TableCell>
                                    <TableCell>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${user.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                            }`}>
                                            {user.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right pr-4">
                                        <div className="flex justify-end gap-1">
                                            <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600" onClick={() => setSelectedUser(user)}>
                                                <Eye className="w-3.5 h-3.5" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className={`h-8 w-8 ${user.status === "active" ? "hover:bg-red-50 hover:text-red-600" : "hover:bg-green-50 hover:text-green-600"}`}
                                                onClick={() => toggleStatus(user.id)}
                                                title={user.status === "active" ? "Block user" : "Unblock user"}
                                            >
                                                {user.status === "active" ? <ShieldOff className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5" />}
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filtered.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                                        <User className="w-8 h-8 mx-auto mb-2 opacity-30" />
                                        <p className="text-sm">No users found</p>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* User Detail Dialog */}
            <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-500" /> User Profile
                        </DialogTitle>
                    </DialogHeader>
                    {selectedUser && (
                        <div className="space-y-4">
                            {/* Avatar */}
                            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${selectedUser.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                                    }`}>
                                    {selectedUser.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                </div>
                                <div>
                                    <p className="font-bold text-lg">{selectedUser.name}</p>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{selectedUser.email}</p>
                                    <div className="flex gap-2 mt-1">
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${selectedUser.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"
                                            }`}>{selectedUser.role}</span>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${selectedUser.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                            }`}>{selectedUser.status}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="p-3 bg-muted/30 rounded-lg">
                                    <p className="text-muted-foreground text-xs">Joined</p>
                                    <p className="font-semibold mt-0.5">{selectedUser.joinedDate}</p>
                                </div>
                                <div className="p-3 bg-muted/30 rounded-lg">
                                    <p className="text-muted-foreground text-xs">Total Orders</p>
                                    <p className="font-semibold mt-0.5">{selectedUser.orders}</p>
                                </div>
                            </div>

                            {/* Orders */}
                            {userOrders(selectedUser.email).length > 0 && (
                                <div>
                                    <p className="text-sm font-semibold mb-2">Order History</p>
                                    <div className="border rounded-lg divide-y">
                                        {userOrders(selectedUser.email).map((order) => (
                                            <div key={order.id} className="flex items-center justify-between px-3 py-2.5 text-sm">
                                                <div>
                                                    <p className="font-medium">{order.id}</p>
                                                    <p className="text-xs text-muted-foreground">{order.date}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold">₹{order.total.toLocaleString()}</p>
                                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium capitalize ${order.status === "delivered" ? "bg-green-100 text-green-700" :
                                                            order.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                                                        }`}>{order.status}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-2 pt-1">
                                <Button
                                    className={`flex-1 ${selectedUser.status === "active" ? "bg-red-500 hover:bg-red-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"}`}
                                    onClick={() => toggleStatus(selectedUser.id)}
                                >
                                    {selectedUser.status === "active" ? <><ShieldOff className="w-4 h-4 mr-2" /> Block User</> : <><Shield className="w-4 h-4 mr-2" /> Unblock User</>}
                                </Button>
                                <DialogClose asChild>
                                    <Button variant="outline" className="flex-1">Close</Button>
                                </DialogClose>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
