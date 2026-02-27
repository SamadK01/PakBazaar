import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

export default async function OrdersPage() {
    const session = await auth();

    if (!session) {
        redirect("/");
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">My Orders</h1>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package className="h-5 w-5" />
                            Active Orders
                        </CardTitle>
                        <CardDescription>View and track your current orders.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-10 text-muted-foreground">
                            <p>No active orders found.</p>
                            <p className="text-sm mt-2">When you place an order, it will appear here.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Example of what a past order might look like */}
                {/* 
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Order #1234</CardTitle>
                                <CardDescription>Placed on Feb 10, 2026</CardDescription>
                            </div>
                            <Badge>Delivered</Badge>
                        </div>
                    </CardHeader>
                    ...
                </Card> 
                */}
            </div>
        </div>
    );
}
