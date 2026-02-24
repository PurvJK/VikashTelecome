import { useState } from "react";
import { Star, Check, X, Eye, Search, ThumbsUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { adminReviews, AdminReview } from "@/data/adminMockData";
import { toast } from "@/hooks/use-toast";

const statusColors: Record<string, string> = {
    published: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
};

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`w-3.5 h-3.5 ${s <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}`} />
            ))}
        </div>
    );
}

export default function Reviews() {
    const [reviews, setReviews] = useState<AdminReview[]>(adminReviews);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [ratingFilter, setRatingFilter] = useState("All");
    const [selected, setSelected] = useState<AdminReview | null>(null);

    const filtered = reviews.filter((r) => {
        const matchSearch =
            r.productName.toLowerCase().includes(search.toLowerCase()) ||
            r.customer.toLowerCase().includes(search.toLowerCase()) ||
            r.title.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === "All" || r.status === statusFilter;
        const matchRating = ratingFilter === "All" || r.rating === Number(ratingFilter);
        return matchSearch && matchStatus && matchRating;
    });

    const updateStatus = (id: string, status: AdminReview["status"]) => {
        setReviews((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
        setSelected((prev) => prev && prev.id === id ? { ...prev, status } : prev);
        toast({ title: `Review ${status}` });
    };

    const stats = [
        { label: "Total Reviews", value: reviews.length, color: "text-blue-600" },
        { label: "Published", value: reviews.filter((r) => r.status === "published").length, color: "text-green-600" },
        { label: "Pending", value: reviews.filter((r) => r.status === "pending").length, color: "text-yellow-600" },
        { label: "Avg. Rating", value: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1), color: "text-amber-600" },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Reviews</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Moderate customer product reviews</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {stats.map((s) => (
                    <Card key={s.label}>
                        <CardContent className="p-4">
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
                            <Input placeholder="Search reviews..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Status</SelectItem>
                                <SelectItem value="published">Published</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={ratingFilter} onValueChange={setRatingFilter}>
                            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Ratings</SelectItem>
                                {[5, 4, 3, 2, 1].map((r) => (
                                    <SelectItem key={r} value={String(r)}>{r} ⭐</SelectItem>
                                ))}
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
                                <TableHead className="pl-4">Review</TableHead>
                                <TableHead className="hidden sm:table-cell">Customer</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead className="hidden md:table-cell">Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right pr-4">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.map((review) => (
                                <TableRow key={review.id} className="hover:bg-muted/20">
                                    <TableCell className="pl-4">
                                        <div className="flex items-center gap-3">
                                            <img src={review.productImage} alt={review.productName} className="w-10 h-10 object-cover rounded-lg border flex-shrink-0" />
                                            <div className="min-w-0">
                                                <p className="font-medium text-sm line-clamp-1">{review.title}</p>
                                                <p className="text-xs text-muted-foreground line-clamp-1">{review.productName}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell text-sm">{review.customer}</TableCell>
                                    <TableCell><StarRating rating={review.rating} /></TableCell>
                                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{review.date}</TableCell>
                                    <TableCell>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[review.status]}`}>
                                            {review.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right pr-4">
                                        <div className="flex justify-end gap-1">
                                            <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600" onClick={() => setSelected(review)}>
                                                <Eye className="w-3.5 h-3.5" />
                                            </Button>
                                            {review.status !== "published" && (
                                                <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-green-50 hover:text-green-600" onClick={() => updateStatus(review.id, "published")} title="Approve">
                                                    <Check className="w-3.5 h-3.5" />
                                                </Button>
                                            )}
                                            {review.status !== "rejected" && (
                                                <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-red-50 hover:text-red-600" onClick={() => updateStatus(review.id, "rejected")} title="Reject">
                                                    <X className="w-3.5 h-3.5" />
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filtered.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                        <Star className="w-8 h-8 mx-auto mb-2 opacity-30" />
                                        <p className="text-sm">No reviews found</p>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Review Detail Dialog */}
            <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2"><Star className="w-5 h-5 text-amber-400" /> Review Detail</DialogTitle>
                    </DialogHeader>
                    {selected && (
                        <div className="space-y-4">
                            {/* Product */}
                            <div className="flex gap-3 p-3 bg-muted/30 rounded-xl">
                                <img src={selected.productImage} alt="" className="w-14 h-14 object-cover rounded-lg border" />
                                <div>
                                    <p className="font-semibold text-sm">{selected.productName}</p>
                                    <StarRating rating={selected.rating} />
                                    <p className="text-xs text-muted-foreground mt-1">{selected.date}</p>
                                </div>
                            </div>

                            {/* Reviewer */}
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-xs text-muted-foreground">Customer</p>
                                    <p className="font-semibold">{selected.customer}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Email</p>
                                    <p className="font-semibold">{selected.email}</p>
                                </div>
                            </div>

                            {/* Review */}
                            <div className="p-4 bg-muted/30 rounded-xl space-y-2">
                                <p className="font-semibold">"{selected.title}"</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">{selected.comment}</p>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground pt-1">
                                    <ThumbsUp className="w-3.5 h-3.5" /> {selected.helpful} people found this helpful
                                </div>
                            </div>

                            <div className="flex gap-2 pt-1">
                                <span className={`self-center text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusColors[selected.status]}`}>
                                    Current: {selected.status}
                                </span>
                                <div className="flex gap-2 ml-auto">
                                    {selected.status !== "published" && (
                                        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white gap-1"
                                            onClick={() => updateStatus(selected.id, "published")}>
                                            <Check className="w-4 h-4" /> Approve
                                        </Button>
                                    )}
                                    {selected.status !== "rejected" && (
                                        <Button size="sm" variant="destructive" className="gap-1"
                                            onClick={() => updateStatus(selected.id, "rejected")}>
                                            <X className="w-4 h-4" /> Reject
                                        </Button>
                                    )}
                                    <DialogClose asChild><Button variant="outline" size="sm">Close</Button></DialogClose>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
