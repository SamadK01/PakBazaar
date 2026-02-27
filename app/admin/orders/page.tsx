import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Mock data
const orders = [
    {
        id: 'ORD-001',
        customer: 'Ali Khan',
        date: '2023-10-25',
        total: 12500,
        status: 'Pending',
        items: 2,
    },
    {
        id: 'ORD-002',
        customer: 'Sara Ahmed',
        date: '2023-10-26',
        total: 4500,
        status: 'Shipped',
        items: 1,
    },
    {
        id: 'ORD-003',
        customer: 'Usman Zafar',
        date: '2023-10-27',
        total: 2200,
        status: 'Delivered',
        items: 3,
    },
];

export default function AdminOrdersPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Orders</h1>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.customer}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={order.status === 'Delivered' ? 'default' : order.status === 'Pending' ? 'secondary' : 'outline'}
                                    >
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{order.items}</TableCell>
                                <TableCell className="text-right">Rs. {order.total.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
