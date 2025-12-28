import { useState } from 'react'
import {
    Container, Title, Text, Paper, Group, Stack, Badge, Tabs, Box, SimpleGrid, Image, Progress, Button
} from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { Apple, Droplet, Moon, Salad, Clock, Target, TrendingDown, TrendingUp, Sparkles, Check, ArrowRight } from 'lucide-react'
import { dietPlans } from '../data/data'

// Goal-specific images
const goalImages = {
    'weight-loss': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop',
    'muscle-gain': 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&h=400&fit=crop',
    'toning': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
}

function MealPlanCard({ plan, goalKey }) {
    return (
        <Paper className="glass-card" p={0} style={{ overflow: 'hidden' }}>
            {/* Goal Image Header */}
            <Box style={{ position: 'relative', height: 180 }}>
                <Image
                    src={goalImages[goalKey]}
                    alt={plan.name}
                    h={180}
                    fit="cover"
                />
                <Box
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '60%',
                        background: 'linear-gradient(transparent, rgba(18,18,26,1))',
                    }}
                />
                <Box style={{ position: 'absolute', bottom: 16, left: 20 }}>
                    <Group>
                        <Text size={40}>{plan.emoji}</Text>
                        <Title order={2} c="white">{plan.name}</Title>
                    </Group>
                </Box>
            </Box>

            <Box p="xl">
                {/* Macros Overview */}
                <Paper p="md" mb="lg" style={{ background: 'rgba(139, 92, 246, 0.1)', borderRadius: 12 }}>
                    <Group justify="space-between" mb="md">
                        <Box>
                            <Text size="sm" c="dimmed">Daily Calories</Text>
                            <Text size="xl" fw={700} className="gradient-text">{plan.calories}</Text>
                        </Box>
                        <Box ta="right">
                            <Text size="sm" c="dimmed">Macro Split</Text>
                            <Text size="sm" fw={500}>{plan.macros}</Text>
                        </Box>
                    </Group>

                    {/* Visual Macro Bars */}
                    <Stack gap="xs">
                        <Group justify="space-between">
                            <Text size="xs">Protein</Text>
                            <Text size="xs" c="violet">
                                {goalKey === 'weight-loss' ? '40%' : goalKey === 'muscle-gain' ? '35%' : '35%'}
                            </Text>
                        </Group>
                        <Progress
                            value={goalKey === 'weight-loss' ? 40 : goalKey === 'muscle-gain' ? 35 : 35}
                            color="violet"
                            size="sm"
                        />
                        <Group justify="space-between">
                            <Text size="xs">Carbs</Text>
                            <Text size="xs" c="cyan">
                                {goalKey === 'weight-loss' ? '30%' : goalKey === 'muscle-gain' ? '45%' : '40%'}
                            </Text>
                        </Group>
                        <Progress
                            value={goalKey === 'weight-loss' ? 30 : goalKey === 'muscle-gain' ? 45 : 40}
                            color="cyan"
                            size="sm"
                        />
                        <Group justify="space-between">
                            <Text size="xs">Fat</Text>
                            <Text size="xs" c="orange">
                                {goalKey === 'weight-loss' ? '30%' : goalKey === 'muscle-gain' ? '20%' : '25%'}
                            </Text>
                        </Group>
                        <Progress
                            value={goalKey === 'weight-loss' ? 30 : goalKey === 'muscle-gain' ? 20 : 25}
                            color="orange"
                            size="sm"
                        />
                    </Stack>
                </Paper>

                <Title order={4} mb="md">📅 Daily Meal Schedule</Title>
                <Stack gap="sm" mb="xl">
                    {plan.meals.map((meal, i) => (
                        <Paper
                            key={i}
                            p="md"
                            style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderRadius: 12,
                                border: '1px solid rgba(255,255,255,0.05)',
                            }}
                        >
                            <Group justify="space-between" align="flex-start">
                                <Group gap="md">
                                    <Box
                                        style={{
                                            width: 40,
                                            height: 40,
                                            background: 'rgba(139, 92, 246, 0.15)',
                                            borderRadius: 10,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Clock size={18} color="#8b5cf6" />
                                    </Box>
                                    <Box>
                                        <Text size="sm" fw={600}>{meal.time}</Text>
                                        <Text size="sm" c="dimmed">{meal.food}</Text>
                                    </Box>
                                </Group>
                                <Check size={18} color="#10b981" />
                            </Group>
                        </Paper>
                    ))}
                </Stack>

                <Paper
                    p="md"
                    style={{
                        background: 'rgba(16, 185, 129, 0.1)',
                        borderRadius: 12,
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                    }}
                >
                    <Text fw={600} c="green" mb="sm">💡 Success Tips:</Text>
                    {plan.tips.map((tip, i) => (
                        <Group key={i} gap="sm" mb="xs">
                            <Check size={14} color="#10b981" />
                            <Text size="sm" c="dimmed">{tip}</Text>
                        </Group>
                    ))}
                </Paper>
            </Box>
        </Paper>
    )
}

export default function NutritionPage() {
    const [activeTab, setActiveTab] = useState('weight-loss')
    const navigate = useNavigate()

    const tips = [
        { icon: Droplet, title: 'Hydration', desc: 'Drink 3+ liters of water daily for optimal metabolism', color: 'cyan' },
        { icon: Moon, title: 'Sleep', desc: 'Get 7-9 hours quality sleep for muscle recovery', color: 'violet' },
        { icon: Salad, title: 'Whole Foods', desc: '80% unprocessed, natural foods for best results', color: 'green' },
        { icon: Clock, title: 'Meal Timing', desc: 'Consistent meal times optimize your metabolism', color: 'orange' },
    ]

    return (
        <Container size="xl" py="xl">
            {/* Header with Vision */}
            <Stack align="center" mb="xl">
                <Badge size="lg" variant="light" color="violet" leftSection={<Apple size={14} />}>
                    Transform From Within
                </Badge>
                <Title order={1} ta="center" style={{ fontFamily: 'Outfit' }}>
                    Your <span className="gradient-text">Nutrition Blueprint</span>
                </Title>
                <Text c="dimmed" ta="center" maw={600} size="lg">
                    <strong style={{ color: '#10b981' }}>Your body is 80% nutrition, 20% exercise.</strong>
                    {' '}Choose the right plan and watch your transformation accelerate.
                </Text>
            </Stack>

            {/* Goal Selection with Clear Vision */}
            <Paper className="glass-card" p="xl" mb="xl">
                <Title order={4} ta="center" mb="lg">🎯 What's Your Goal?</Title>
                <Tabs value={activeTab} onChange={setActiveTab} color="violet">
                    <Tabs.List justify="center" grow>
                        <Tabs.Tab value="weight-loss" leftSection={<TrendingDown size={16} />}>
                            🔥 Burn Fat & Lose Weight
                        </Tabs.Tab>
                        <Tabs.Tab value="muscle-gain" leftSection={<TrendingUp size={16} />}>
                            💪 Build Muscle & Strength
                        </Tabs.Tab>
                        <Tabs.Tab value="toning" leftSection={<Target size={16} />}>
                            ✨ Get Lean & Toned
                        </Tabs.Tab>
                    </Tabs.List>
                </Tabs>
            </Paper>

            {/* Meal Plan */}
            <MealPlanCard plan={dietPlans[activeTab]} goalKey={activeTab} />

            {/* Universal Health Tips */}
            <Paper className="glass-card" p="xl" mt="xl">
                <Stack align="center" mb="lg">
                    <Title order={3}>🌟 Keys to Nutritional Success</Title>
                    <Text c="dimmed" ta="center" maw={500}>
                        Follow these universal principles for maximum results, regardless of your specific goal.
                    </Text>
                </Stack>

                <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
                    {tips.map((tip, i) => (
                        <Paper
                            key={i}
                            p="xl"
                            style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderRadius: 16,
                                textAlign: 'center',
                                border: '1px solid rgba(255,255,255,0.05)',
                                transition: 'all 0.3s',
                            }}
                        >
                            <Box
                                mb="md"
                                style={{
                                    width: 60,
                                    height: 60,
                                    margin: '0 auto',
                                    background: `rgba(139, 92, 246, 0.1)`,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <tip.icon size={28} color="#8b5cf6" />
                            </Box>
                            <Title order={5} mb="xs">{tip.title}</Title>
                            <Text size="sm" c="dimmed">{tip.desc}</Text>
                        </Paper>
                    ))}
                </SimpleGrid>
            </Paper>

            {/* CTA Section */}
            <Paper
                className="glass-card"
                p="xl"
                mt="xl"
                style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.1))',
                    textAlign: 'center',
                }}
            >
                <Title order={3} mb="sm">Ready to See Your Transformation?</Title>
                <Text c="dimmed" mb="lg">
                    Combine this nutrition plan with our AI workouts for maximum results!
                </Text>
                <Group justify="center">
                    <Button
                        size="lg"
                        variant="gradient"
                        gradient={{ from: 'violet', to: 'cyan', deg: 135 }}
                        leftSection={<Sparkles size={20} />}
                        onClick={() => navigate('/simulator')}
                    >
                        Try AI Simulator
                    </Button>
                    <Button
                        size="lg"
                        variant="light"
                        color="violet"
                        rightSection={<ArrowRight size={20} />}
                        onClick={() => navigate('/workouts')}
                    >
                        View Workouts
                    </Button>
                </Group>
            </Paper>
        </Container>
    )
}
