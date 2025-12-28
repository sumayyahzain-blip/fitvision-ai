import { useState } from 'react'
import {
    Title, Text, Paper, Stack, Group, Avatar, Badge, Button, Tabs,
    Table, Image, ActionIcon, NumberInput, Divider, SimpleGrid, Card
} from '@mantine/core'
import { ShoppingCart, Package, Settings, LogOut, Trash, Plus, Minus, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { notifications } from '@mantine/notifications'

export default function Account() {
    const { user, cart, orders, logout, updateCartQuantity, removeFromCart } = useAuth()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('orders')

    // Redirect to login if not authenticated
    if (!user) {
        return (
            <Stack align="center" justify="center" style={{ minHeight: 'calc(100vh - 200px)' }}>
                <Title order={2}>Please Sign In</Title>
                <Text c="dimmed">You need to be logged in to view your account.</Text>
                <Button color="violet" onClick={() => navigate('/login')}>
                    Go to Sign In
                </Button>
            </Stack>
        )
    }

    const handleLogout = () => {
        logout()
        notifications.show({ title: 'Logged Out', message: 'See you next time!', color: 'blue' })
        navigate('/')
    }

    const cartTotal = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', '').replace(',', ''))
        return sum + (price * item.quantity)
    }, 0)

    return (
        <Stack gap="lg">
            {/* Profile Header */}
            <Paper className="glass-card" p="lg" radius="md">
                <Group justify="space-between">
                    <Group>
                        <Avatar src={user.avatar} size="xl" radius="xl" />
                        <div>
                            <Title order={2}>{user.name}</Title>
                            <Text c="dimmed">{user.email}</Text>
                            <Badge color="violet" variant="light" mt="xs">Premium Member</Badge>
                        </div>
                    </Group>
                    <Button
                        variant="light"
                        color="red"
                        leftSection={<LogOut size={16} />}
                        onClick={handleLogout}
                    >
                        Sign Out
                    </Button>
                </Group>
            </Paper>

            {/* Stats Cards */}
            <SimpleGrid cols={{ base: 1, sm: 3 }}>
                <Card className="glass-card" p="md" radius="md">
                    <Group>
                        <Package size={24} color="#8b5cf6" />
                        <div>
                            <Text size="xl" fw={700}>{orders.length}</Text>
                            <Text size="sm" c="dimmed">Total Orders</Text>
                        </div>
                    </Group>
                </Card>
                <Card className="glass-card" p="md" radius="md">
                    <Group>
                        <ShoppingCart size={24} color="#06b6d4" />
                        <div>
                            <Text size="xl" fw={700}>{cart.length}</Text>
                            <Text size="sm" c="dimmed">Cart Items</Text>
                        </div>
                    </Group>
                </Card>
                <Card className="glass-card" p="md" radius="md">
                    <Group>
                        <Settings size={24} color="#f97316" />
                        <div>
                            <Text size="xl" fw={700}>Active</Text>
                            <Text size="sm" c="dimmed">Account Status</Text>
                        </div>
                    </Group>
                </Card>
            </SimpleGrid>

            {/* Tabs */}
            <Paper className="glass-card" p="md" radius="md">
                <Tabs value={activeTab} onChange={setActiveTab} color="violet">
                    <Tabs.List>
                        <Tabs.Tab value="orders" leftSection={<Package size={16} />}>
                            My Orders
                        </Tabs.Tab>
                        <Tabs.Tab value="cart" leftSection={<ShoppingCart size={16} />}>
                            Shopping Cart ({cart.length})
                        </Tabs.Tab>
                    </Tabs.List>

                    {/* Orders Tab */}
                    <Tabs.Panel value="orders" pt="md">
                        {orders.length === 0 ? (
                            <Stack align="center" py="xl">
                                <Package size={48} color="gray" />
                                <Text c="dimmed">No orders yet</Text>
                                <Button color="violet" onClick={() => navigate('/equipment')}>
                                    Start Shopping
                                </Button>
                            </Stack>
                        ) : (
                            <Table verticalSpacing="sm">
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>Order ID</Table.Th>
                                        <Table.Th>Date</Table.Th>
                                        <Table.Th>Items</Table.Th>
                                        <Table.Th>Total</Table.Th>
                                        <Table.Th>Status</Table.Th>
                                        <Table.Th>Action</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {orders.map((order) => (
                                        <Table.Tr key={order.id}>
                                            <Table.Td fw={700} c="violet">{order.id}</Table.Td>
                                            <Table.Td>{order.date}</Table.Td>
                                            <Table.Td>{order.items.length} item(s)</Table.Td>
                                            <Table.Td fw={700}>{order.total}</Table.Td>
                                            <Table.Td>
                                                <Badge
                                                    color={order.status === 'Delivered' ? 'green' : order.status === 'Processing' ? 'blue' : 'gray'}
                                                    variant="light"
                                                >
                                                    {order.status}
                                                </Badge>
                                            </Table.Td>
                                            <Table.Td>
                                                <Button
                                                    variant="subtle"
                                                    size="xs"
                                                    leftSection={<Eye size={14} />}
                                                    onClick={() => navigate(`/order/${order.id}`)}
                                                >
                                                    View
                                                </Button>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        )}
                    </Tabs.Panel>

                    {/* Cart Tab */}
                    <Tabs.Panel value="cart" pt="md">
                        {cart.length === 0 ? (
                            <Stack align="center" py="xl">
                                <ShoppingCart size={48} color="gray" />
                                <Text c="dimmed">Your cart is empty</Text>
                                <Button color="violet" onClick={() => navigate('/equipment')}>
                                    Browse Products
                                </Button>
                            </Stack>
                        ) : (
                            <Stack>
                                {cart.map((item) => (
                                    <Paper key={item.id} withBorder p="sm" radius="md">
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
                                                    <Text c="dimmed" size="sm">{item.price}</Text>
                                                </div>
                                            </Group>
                                            <Group>
                                                <Group gap={4}>
                                                    <ActionIcon
                                                        variant="light"
                                                        color="gray"
                                                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                                    >
                                                        <Minus size={14} />
                                                    </ActionIcon>
                                                    <Text w={30} ta="center" fw={500}>{item.quantity}</Text>
                                                    <ActionIcon
                                                        variant="light"
                                                        color="gray"
                                                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        <Plus size={14} />
                                                    </ActionIcon>
                                                </Group>
                                                <ActionIcon
                                                    variant="subtle"
                                                    color="red"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    <Trash size={16} />
                                                </ActionIcon>
                                            </Group>
                                        </Group>
                                    </Paper>
                                ))}

                                <Divider my="md" />

                                <Group justify="space-between">
                                    <Text size="lg" fw={700}>Total:</Text>
                                    <Text size="xl" fw={700} c="violet">${cartTotal.toFixed(2)}</Text>
                                </Group>

                                <Button fullWidth color="violet" size="lg" mt="md">
                                    Proceed to Checkout
                                </Button>
                            </Stack>
                        )}
                    </Tabs.Panel>
                </Tabs>
            </Paper>
        </Stack>
    )
}
