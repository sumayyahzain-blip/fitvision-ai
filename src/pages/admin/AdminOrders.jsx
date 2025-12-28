import {
    Title, Paper, Text, Stack, Group, Table, Badge, ActionIcon, Avatar,
    TextInput, Button, Select, Tabs
} from '@mantine/core'
import { Search, Filter, Eye, Printer, Truck } from 'lucide-react'

// Using the same mock data structure as Dashboard but expanded
const orders = [
    { id: '#ORD-001', customer: 'Sarah Connor', date: 'Oct 24, 2024', items: 3, total: '$149.99', status: 'Completed', payment: 'Paid' },
    { id: '#ORD-002', customer: 'John Wick', date: 'Oct 25, 2024', items: 1, total: '$299.00', status: 'Processing', payment: 'Paid' },
    { id: '#ORD-003', customer: 'Ellen Ripley', date: 'Oct 26, 2024', items: 2, total: '$85.50', status: 'Shipped', payment: 'Paid' },
    { id: '#ORD-004', customer: 'Marty McFly', date: 'Oct 27, 2024', items: 1, total: '$24.99', status: 'Completed', payment: 'Paid' },
    { id: '#ORD-005', customer: 'Tony Stark', date: 'Oct 28, 2024', items: 12, total: '$2,499.00', status: 'Pending', payment: 'Unpaid' },
    { id: '#ORD-006', customer: 'Bruce Wayne', date: 'Oct 29, 2024', items: 5, total: '$5,000.00', status: 'Processing', payment: 'Paid' },
]

export default function AdminOrders() {
    return (
        <Stack gap="lg">
            <Group justify="space-between">
                <div>
                    <Title order={2}>Orders</Title>
                    <Text c="dimmed">Track and manage customer orders</Text>
                </div>
                <Group>
                    <Button variant="default" leftSection={<Printer size={16} />}>Export</Button>
                    <Button color="orange" leftSection={<Truck size={16} />}>Ship Orders</Button>
                </Group>
            </Group>

            <Paper className="glass-card" p="md" radius="md">
                <Tabs defaultValue="all" mb="md" color="orange">
                    <Tabs.List>
                        <Tabs.Tab value="all">All Orders</Tabs.Tab>
                        <Tabs.Tab value="processing">Processing</Tabs.Tab>
                        <Tabs.Tab value="shipped">Shipped</Tabs.Tab>
                        <Tabs.Tab value="completed">Completed</Tabs.Tab>
                    </Tabs.List>
                </Tabs>

                <Group mb="md">
                    <TextInput
                        placeholder="Search orders..."
                        leftSection={<Search size={16} />}
                        style={{ flex: 1 }}
                    />
                    <Select
                        placeholder="Status"
                        data={['All', 'Paid', 'Unpaid', 'Refunded']}
                        defaultValue="All"
                        w={150}
                    />
                </Group>

                <Table verticalSpacing="sm" striped>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Order</Table.Th>
                            <Table.Th>Date</Table.Th>
                            <Table.Th>Customer</Table.Th>
                            <Table.Th>Payment</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th>Total</Table.Th>
                            <Table.Th>Action</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {orders.map((order) => (
                            <Table.Tr key={order.id}>
                                <Table.Td fw={700} c="orange.4">{order.id}</Table.Td>
                                <Table.Td>{order.date}</Table.Td>
                                <Table.Td fw={500}>{order.customer}</Table.Td>
                                <Table.Td>
                                    <Badge size="sm" variant="dot" color={order.payment === 'Paid' ? 'green' : 'red'}>
                                        {order.payment}
                                    </Badge>
                                </Table.Td>
                                <Table.Td>
                                    <Badge
                                        color={
                                            order.status === 'Completed' ? 'green' :
                                                order.status === 'Processing' ? 'blue' :
                                                    order.status === 'Shipped' ? 'cyan' : 'gray'
                                        }
                                    >
                                        {order.status}
                                    </Badge>
                                </Table.Td>
                                <Table.Td fw={700}>{order.total}</Table.Td>
                                <Table.Td>
                                    <ActionIcon variant="subtle" color="gray">
                                        <Eye size={16} />
                                    </ActionIcon>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Paper>
        </Stack>
    )
}
