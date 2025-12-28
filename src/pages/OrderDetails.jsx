import {
    Title, Text, Paper, Stack, Group, Badge, Button, Table, Image,
    Timeline, Divider, Card
} from '@mantine/core'
import { Package, Truck, CheckCircle, ArrowLeft, MapPin, CreditCard } from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function OrderDetails() {
    const { orderId } = useParams()
    const navigate = useNavigate()
    const { getOrderById, user } = useAuth()

    // Redirect to login if not authenticated
    if (!user) {
        return (
            <Stack align="center" justify="center" style={{ minHeight: 'calc(100vh - 200px)' }}>
                <Title order={2}>Please Sign In</Title>
                <Text c="dimmed">You need to be logged in to view order details.</Text>
                <Button color="violet" onClick={() => navigate('/login')}>
                    Go to Sign In
                </Button>
            </Stack>
        )
    }

    const order = getOrderById(orderId)

    if (!order) {
        return (
            <Stack align="center" justify="center" style={{ minHeight: 'calc(100vh - 200px)' }}>
                <Package size={64} color="gray" />
                <Title order={2}>Order Not Found</Title>
                <Text c="dimmed">The order you're looking for doesn't exist.</Text>
                <Button color="violet" onClick={() => navigate('/account')}>
                    Back to Account
                </Button>
            </Stack>
        )
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'green'
            case 'Shipped': return 'cyan'
            case 'Processing': return 'blue'
            default: return 'gray'
        }
    }

    const getTimelineActive = (status) => {
        switch (status) {
            case 'Delivered': return 3
            case 'Shipped': return 2
            case 'Processing': return 1
            default: return 0
        }
    }

    return (
        <Stack gap="lg">
            {/* Header */}
            <Group justify="space-between">
                <Group>
                    <Button
                        variant="subtle"
                        leftSection={<ArrowLeft size={16} />}
                        onClick={() => navigate('/account')}
                    >
                        Back to Account
                    </Button>
                </Group>
                <Badge size="lg" color={getStatusColor(order.status)} variant="light">
                    {order.status}
                </Badge>
            </Group>

            <Title order={2}>Order {order.id}</Title>
            <Text c="dimmed">Placed on {order.date}</Text>

            <Group grow align="flex-start">
                {/* Order Items */}
                <Paper className="glass-card" p="lg" radius="md" style={{ flex: 2 }}>
                    <Title order={3} mb="md">Order Items</Title>
                    <Stack>
                        {order.items.map((item, index) => (
                            <Paper key={index} withBorder p="sm" radius="md">
                                <Group justify="space-between">
                                    <Group>
                                        <Image
                                            src={item.image}
                                            w={60}
                                            h={60}
                                            radius="sm"
                                            fallbackSrc="https://placehold.co/60x60"
                                        />
                                        <div>
                                            <Text fw={500}>{item.name}</Text>
                                            <Text c="dimmed" size="sm">Qty: {item.quantity}</Text>
                                        </div>
                                    </Group>
                                    <Text fw={700}>{item.price}</Text>
                                </Group>
                            </Paper>
                        ))}
                    </Stack>

                    <Divider my="md" />

                    <Group justify="space-between">
                        <Text size="lg" fw={500}>Total</Text>
                        <Text size="xl" fw={700} c="violet">{order.total}</Text>
                    </Group>
                </Paper>

                {/* Order Status & Info */}
                <Stack style={{ flex: 1 }}>
                    {/* Delivery Timeline */}
                    <Paper className="glass-card" p="lg" radius="md">
                        <Title order={4} mb="md">Delivery Status</Title>
                        <Timeline active={getTimelineActive(order.status)} bulletSize={24} lineWidth={2} color="violet">
                            <Timeline.Item bullet={<CheckCircle size={12} />} title="Order Placed">
                                <Text c="dimmed" size="xs">{order.date}</Text>
                            </Timeline.Item>
                            <Timeline.Item bullet={<Package size={12} />} title="Processing">
                                <Text c="dimmed" size="xs">Your order is being prepared</Text>
                            </Timeline.Item>
                            <Timeline.Item bullet={<Truck size={12} />} title="Shipped">
                                <Text c="dimmed" size="xs">On the way to you</Text>
                            </Timeline.Item>
                            <Timeline.Item bullet={<CheckCircle size={12} />} title="Delivered">
                                <Text c="dimmed" size="xs">Package delivered</Text>
                            </Timeline.Item>
                        </Timeline>
                    </Paper>

                    {/* Shipping Address */}
                    <Paper className="glass-card" p="lg" radius="md">
                        <Group mb="sm">
                            <MapPin size={18} color="#8b5cf6" />
                            <Title order={4}>Shipping Address</Title>
                        </Group>
                        <Text size="sm" c="dimmed">
                            {user.name}<br />
                            123 Fitness Street<br />
                            Gym City, ST 12345<br />
                            United States
                        </Text>
                    </Paper>

                    {/* Payment Method */}
                    <Paper className="glass-card" p="lg" radius="md">
                        <Group mb="sm">
                            <CreditCard size={18} color="#06b6d4" />
                            <Title order={4}>Payment Method</Title>
                        </Group>
                        <Text size="sm" c="dimmed">
                            •••• •••• •••• 4242<br />
                            Visa ending in 4242
                        </Text>
                    </Paper>
                </Stack>
            </Group>

            {/* Actions */}
            <Group>
                <Button variant="light" color="violet">Track Package</Button>
                <Button variant="light" color="gray">Download Invoice</Button>
                <Button variant="light" color="red">Request Return</Button>
            </Group>
        </Stack>
    )
}
