import {
    Title,
    Paper,
    Group,
    Text,
    ThemeIcon,
    SimpleGrid,
    Table,
    Badge
} from '@mantine/core'
import {
    DollarSign,
    ShoppingCart,
    Users,
    Package,
    TrendingUp,
    TrendingDown
} from 'lucide-react'

// Mock Data for Dashboard Stats
const stats = [
    { label: 'Total Revenue', value: '$45,231.89', diff: 12, icon: DollarSign, color: 'green' },
    { label: 'Total Orders', value: '1,294', diff: -4, icon: ShoppingCart, color: 'blue' },
    { label: 'Active Customers', value: '8,534', diff: 5, icon: Users, color: 'violet' },
    { label: 'Products In Stock', value: '142', diff: 0, icon: Package, color: 'orange' }
]

const recentOrders = [
    { id: '#ORD-001', customer: 'Sarah Connor', product: 'Resistance Bands Set', amount: '$49.99', status: 'Completed', color: 'green' },
    { id: '#ORD-002', customer: 'John Wick', product: 'Adjustable Dumbbells', amount: '$299.00', status: 'Processing', color: 'blue' },
    { id: '#ORD-003', customer: 'Ellen Ripley', product: 'Yoga Mat Premium', amount: '$85.50', status: 'Shipped', color: 'yellow' },
    { id: '#ORD-004', customer: 'Marty McFly', product: 'Smart Watch Band', amount: '$24.99', status: 'Completed', color: 'green' },
    { id: '#ORD-005', customer: 'Tony Stark', product: 'Full Home Gym Setup', amount: '$2,499.00', status: 'Pending', color: 'gray' },
]

export default function AdminDashboard() {
    console.log("AdminDashboard Stats+Table Rendering (Fixed)")
    return (
        <div>
            <Title order={2} mb="md">Dashboard Overview</Title>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} mb="lg">
                {stats.map((stat) => (
                    <Paper key={stat.label} p="md" radius="md" withBorder>
                        <Group justify="space-between">
                            <Text size="xs" c="dimmed" fw={700} tt="uppercase">
                                {stat.label}
                            </Text>
                            <ThemeIcon color={stat.color} variant="light" size="lg" radius="md">
                                <stat.icon size={18} />
                            </ThemeIcon>
                        </Group>

                        <Group align="flex-end" gap="xs" mt={25}>
                            <Text fz="h2" fw={700} lh={1}>
                                {stat.value}
                            </Text>
                            <Text c={stat.diff > 0 ? 'teal' : 'red'} fz="sm" fw={500} style={{ display: 'flex', alignItems: 'center' }}>
                                <span>{stat.diff}%</span>
                                {stat.diff > 0 ? <TrendingUp size={16} style={{ marginLeft: 4 }} /> : <TrendingDown size={16} style={{ marginLeft: 4 }} />}
                            </Text>
                        </Group>
                        <Text fz="xs" c="dimmed" mt={7}>
                            Compared to previous month
                        </Text>
                    </Paper>
                ))}
            </SimpleGrid>

            <Paper withBorder p="md" radius="md">
                <Group justify="space-between" mb="md">
                    <Title order={3}>Recent Orders</Title>
                    <Badge variant="light">Live Updates</Badge>
                </Group>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Order ID</Table.Th>
                            <Table.Th>Customer</Table.Th>
                            <Table.Th>Product</Table.Th>
                            <Table.Th>Amount</Table.Th>
                            <Table.Th>Status</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {recentOrders.map((row) => (
                            <Table.Tr key={row.id}>
                                <Table.Td fw={500}>{row.id}</Table.Td>
                                <Table.Td>{row.customer}</Table.Td>
                                <Table.Td>{row.product}</Table.Td>
                                <Table.Td>{row.amount}</Table.Td>
                                <Table.Td>
                                    <Badge color={row.color} variant="dot">
                                        {row.status}
                                    </Badge>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Paper>
        </div>
    )
}
