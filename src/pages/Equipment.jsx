import { useState } from 'react'
import {
    Container, Title, Text, Paper, Group, Stack, Badge,
    SimpleGrid, SegmentedControl, Box, Button, Image
} from '@mantine/core'
import { ShoppingBag, ShoppingCart } from 'lucide-react'
import { notifications } from '@mantine/notifications'
import { equipment } from '../data/data'

function EquipmentCard({ item }) {
    const handleAddToCart = (e) => {
        e.stopPropagation()
        notifications.show({
            title: 'Added to Cart! 🛒',
            message: `${item.name} has been added to your cart`,
            color: 'green',
        })
    }

    return (
        <Paper
            className="glass-card"
            p={0}
            style={{ transition: 'all 0.3s', cursor: 'pointer', overflow: 'hidden' }}
        >
            {/* Equipment Image */}
            <Box style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                <Image
                    src={item.image}
                    alt={item.name}
                    h={180}
                    fit="cover"
                    fallbackSrc="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop"
                />
                {/* Gradient Overlay */}
                <Box
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '40%',
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                    }}
                />
                {/* Price Badge */}
                <Badge
                    size="lg"
                    color="violet"
                    variant="filled"
                    style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        fontSize: '1rem',
                        fontWeight: 700,
                    }}
                >
                    {item.price}
                </Badge>
                {/* Category Badge */}
                <Badge
                    size="sm"
                    color="dark"
                    style={{ position: 'absolute', bottom: 12, left: 12 }}
                >
                    {item.category}
                </Badge>
            </Box>

            {/* Card Content */}
            <Box p="md">
                <Title order={4} mb="xs" lineClamp={1}>{item.name}</Title>
                <Text size="sm" c="dimmed" mb="md" lineClamp={2}>
                    {item.description}
                </Text>

                <Button
                    fullWidth
                    variant="light"
                    color="violet"
                    leftSection={<ShoppingCart size={16} />}
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </Button>
            </Box>
        </Paper>
    )
}

export default function EquipmentPage() {
    const [category, setCategory] = useState('all')

    const filteredEquipment = category === 'all'
        ? equipment
        : equipment.filter(e => e.category === category)

    return (
        <Container size="xl" py="xl">
            {/* Header */}
            <Stack align="center" mb="xl">
                <Badge size="lg" variant="light" color="violet" leftSection={<ShoppingBag size={14} />}>
                    Smart Recommendations
                </Badge>
                <Title order={1} ta="center" style={{ fontFamily: 'Outfit' }}>
                    Fitness <span className="gradient-text">Equipment</span>
                </Title>
                <Text c="dimmed" ta="center" maw={500}>
                    AI-curated equipment for your home gym. Quality gear for maximum results.
                </Text>
            </Stack>

            {/* Category Filters */}
            <Group justify="center" mb="xl">
                <SegmentedControl
                    value={category}
                    onChange={setCategory}
                    data={[
                        { label: '🏋️ All', value: 'all' },
                        { label: '💪 Weights', value: 'weights' },
                        { label: '🎯 Accessories', value: 'accessories' },
                        { label: '💆 Recovery', value: 'recovery' },
                    ]}
                    color="violet"
                />
            </Group>

            {/* Equipment Grid */}
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
                {filteredEquipment.map((item) => (
                    <EquipmentCard key={item.id} item={item} />
                ))}
            </SimpleGrid>

            {/* Featured Section */}
            <Paper className="glass-card" p="xl" mt="xl">
                <Group justify="space-between" align="center" mb="lg">
                    <Box>
                        <Title order={3}>🌟 Complete Home Gym Bundle</Title>
                        <Text c="dimmed" size="sm">Everything you need to get started</Text>
                    </Box>
                    <Badge size="xl" color="green" variant="filled">
                        Save 20%
                    </Badge>
                </Group>

                <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md" mb="lg">
                    {equipment.slice(0, 4).map((item) => (
                        <Box
                            key={item.id}
                            style={{
                                borderRadius: 12,
                                overflow: 'hidden',
                                border: '1px solid rgba(255,255,255,0.1)',
                            }}
                        >
                            <Image
                                src={item.image}
                                alt={item.name}
                                h={100}
                                fit="cover"
                            />
                            <Box p="xs" style={{ background: 'rgba(255,255,255,0.03)' }}>
                                <Text size="xs" fw={500} lineClamp={1}>{item.name}</Text>
                            </Box>
                        </Box>
                    ))}
                </SimpleGrid>

                <Group justify="space-between" align="center">
                    <Box>
                        <Text size="sm" c="dimmed" td="line-through">$512</Text>
                        <Text size="xl" fw={700} className="gradient-text">$409</Text>
                    </Box>
                    <Button
                        size="lg"
                        variant="gradient"
                        gradient={{ from: 'violet', to: 'cyan', deg: 135 }}
                        leftSection={<ShoppingCart size={20} />}
                    >
                        Get Bundle Deal
                    </Button>
                </Group>
            </Paper>
        </Container>
    )
}
