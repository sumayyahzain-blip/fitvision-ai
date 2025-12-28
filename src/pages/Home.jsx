import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Container, Title, Text, Button, Group, Stack, Badge, Box, Paper, SimpleGrid, Image
} from '@mantine/core'
import { Sparkles, Play, Flame, Target, ArrowRight, Star, Users, Trophy, Heart } from 'lucide-react'

function AnimatedNumber({ target, duration = 2000 }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!isVisible) return

        let startTime
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)
            setCount(Math.floor(progress * target))
            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }
        requestAnimationFrame(animate)
    }, [isVisible, target, duration])

    return <span ref={ref}>{count.toLocaleString()}</span>
}

// Powerful transformation stories
const transformationStories = [
    {
        name: 'Yuki T.',
        before: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=300&h=400&fit=crop',
        after: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=300&h=400&fit=crop',
        result: 'Lost 30 lbs in 5 months',
        quote: 'FitVision AI gave me the confidence I never had!',
    },
    {
        name: 'Mike R.',
        before: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&h=400&fit=crop',
        after: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=300&h=400&fit=crop',
        result: 'Gained 25 lbs muscle',
        quote: 'Best decision I ever made for my health',
    },
    {
        name: 'Jessica L.',
        before: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=400&fit=crop',
        after: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=300&h=400&fit=crop',
        result: 'Complete body transformation',
        quote: 'I never thought this was possible!',
    },
]

export default function HomePage() {
    const navigate = useNavigate()

    return (
        <Box>
            {/* Hero Section with Inspiring Image */}
            <Box
                style={{
                    position: 'relative',
                    minHeight: '600px',
                    maxHeight: '700px',
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden',
                    paddingTop: '40px',
                    paddingBottom: '40px',
                }}
            >
                {/* Hero Background - Inspiring Asian Fitness Woman */}
                <Box
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '50%',
                        height: '100%',
                        zIndex: 0,
                    }}
                >
                    <Image
                        src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=1200&h=1200&fit=crop"
                        alt="Inspiring Fitness"
                        h="100%"
                        fit="cover"
                        style={{ opacity: 0.9 }}
                    />
                    <Box
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(90deg, rgba(10,10,15,1) 0%, rgba(10,10,15,0.7) 40%, transparent 100%)',
                        }}
                    />
                </Box>

                <Container size="lg" style={{ position: 'relative', zIndex: 1 }}>
                    <Box style={{ maxWidth: 650 }}>
                        <Badge
                            size="lg"
                            variant="light"
                            color="violet"
                            leftSection={<Sparkles size={14} />}
                            className="hero-badge"
                            mb="lg"
                            styles={{
                                root: {
                                    padding: '12px 20px',
                                    borderRadius: 50,
                                }
                            }}
                        >
                            🔥 #1 AI-Powered Fitness Platform
                        </Badge>

                        <Title order={1} size={48} mb="md" style={{ fontFamily: 'Outfit, sans-serif', lineHeight: 1.1 }}>
                            Become The Best
                            <Text component="span" className="gradient-text" size={48} fw={700} display="block">
                                Version of Yourself
                            </Text>
                        </Title>

                        <Text size="lg" c="dimmed" maw={500} mb="lg" lh={1.6}>
                            Your transformation journey starts today. Join <strong style={{ color: '#8b5cf6' }}>50,000+</strong> people
                            who have already achieved their dream body. The best time to start is <strong style={{ color: '#10b981' }}>NOW</strong>.
                        </Text>

                        <Group mb="md">
                            <Button
                                size="xl"
                                leftSection={<Sparkles size={22} />}
                                variant="gradient"
                                gradient={{ from: 'violet', to: 'cyan', deg: 135 }}
                                onClick={() => navigate('/simulator')}
                                styles={{
                                    root: {
                                        padding: '20px 32px',
                                        fontSize: '1.1rem',
                                        '&:hover': {
                                            transform: 'translateY(-3px)',
                                            boxShadow: '0 15px 50px rgba(139, 92, 246, 0.5)',
                                        }
                                    }
                                }}
                            >
                                Start Your Transformation
                            </Button>
                            <Button
                                size="xl"
                                variant="default"
                                leftSection={<Play size={22} />}
                                onClick={() => navigate('/workouts')}
                                styles={{
                                    root: {
                                        padding: '20px 32px',
                                        fontSize: '1.1rem',
                                    }
                                }}
                            >
                                View Workouts
                            </Button>
                        </Group>

                        {/* Trust Indicators */}
                        <Group gap="xl">
                            <Group gap="xs">
                                <Star size={20} color="#fbbf24" fill="#fbbf24" />
                                <Star size={20} color="#fbbf24" fill="#fbbf24" />
                                <Star size={20} color="#fbbf24" fill="#fbbf24" />
                                <Star size={20} color="#fbbf24" fill="#fbbf24" />
                                <Star size={20} color="#fbbf24" fill="#fbbf24" />
                                <Text size="sm" c="dimmed" ml="xs">4.9/5 from 10,000+ reviews</Text>
                            </Group>
                        </Group>
                    </Box>
                </Container>
            </Box>

            {/* Motivational Banner - Focus & Unstoppable */}
            <Box py={40} style={{ background: 'linear-gradient(90deg, #1a1a2e 0%, #2d2b42 100%)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <Container size="lg">
                    <Stack align="center" gap="xs">
                        <Title
                            order={2}
                            ta="center"
                            style={{
                                fontFamily: 'Outfit',
                                fontSize: '2.5rem',
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                color: 'white',
                                textShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
                            }}
                        >
                            STAY <span className="gradient-text">FOCUSED</span>. BE <span className="text-white">UNSTOPPABLE</span>.
                        </Title>
                        <Text c="dimmed" size="sm" ta="center" maw={600} mx="auto" ls={1}>
                            THE ONLY LIMIT IS YOUR MINDSET. BREAK THROUGH BARRIERS.
                        </Text>
                    </Stack>
                </Container>
            </Box>

            {/* Stats Section */}
            <Box py={32} style={{ background: 'rgba(139, 92, 246, 0.05)' }}>
                <Container size="lg">
                    <Group justify="center" gap="lg" wrap="wrap">
                        <Paper className="glass-card" p="md" ta="center" style={{ minWidth: 140, flex: '1 1 140px', maxWidth: 200 }}>
                            <Users size={24} color="#8b5cf6" style={{ marginBottom: 6 }} />
                            <Text size="xl" fw={700} className="gradient-text">
                                <AnimatedNumber target={50000} />+
                            </Text>
                            <Text size="xs" c="dimmed">Happy Members</Text>
                        </Paper>
                        <Paper className="glass-card" p="md" ta="center" style={{ minWidth: 140, flex: '1 1 140px', maxWidth: 200 }}>
                            <Trophy size={24} color="#f97316" style={{ marginBottom: 6 }} />
                            <Text size="xl" fw={700} className="gradient-text">
                                <AnimatedNumber target={500} />+
                            </Text>
                            <Text size="xs" c="dimmed">Workout Plans</Text>
                        </Paper>
                        <Paper className="glass-card" p="md" ta="center" style={{ minWidth: 140, flex: '1 1 140px', maxWidth: 200 }}>
                            <Heart size={24} color="#ec4899" style={{ marginBottom: 6 }} />
                            <Text size="xl" fw={700} className="gradient-text">
                                <AnimatedNumber target={98} />%
                            </Text>
                            <Text size="xs" c="dimmed">Success Rate</Text>
                        </Paper>
                        <Paper className="glass-card" p="md" ta="center" style={{ minWidth: 140, flex: '1 1 140px', maxWidth: 200 }}>
                            <Flame size={24} color="#10b981" style={{ marginBottom: 6 }} />
                            <Text size="xl" fw={700} className="gradient-text">
                                <AnimatedNumber target={10} />M+
                            </Text>
                            <Text size="xs" c="dimmed">Calories Burned</Text>
                        </Paper>
                    </Group>
                </Container>
            </Box>

            {/* Transformation Stories */}
            <Container size="lg" py={50}>
                <Stack align="center" mb={32}>
                    <Badge size="lg" variant="light" color="green">
                        ⭐ Real Results
                    </Badge>
                    <Title order={2} ta="center" style={{ fontFamily: 'Outfit' }}>
                        Life-Changing <span className="gradient-text">Transformations</span>
                    </Title>
                    <Text c="dimmed" ta="center" maw={600}>
                        See what our members have achieved. These are real people with real results.
                        Your transformation could be next!
                    </Text>
                </Stack>

                <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
                    {transformationStories.map((story, index) => (
                        <Paper
                            key={index}
                            className="glass-card"
                            p="lg"
                            style={{
                                overflow: 'hidden',
                                transition: 'all 0.3s',
                                cursor: 'pointer',
                            }}
                        >
                            {/* Before/After Images */}
                            <Group justify="center" gap="xs" mb="sm">
                                <Box style={{ position: 'relative' }}>
                                    <Image
                                        src={story.before}
                                        alt="Before"
                                        w={110}
                                        h={140}
                                        radius="md"
                                        fit="cover"
                                    />
                                    <Badge
                                        color="red"
                                        size="xs"
                                        style={{ position: 'absolute', top: 8, left: 8 }}
                                    >
                                        BEFORE
                                    </Badge>
                                </Box>
                                <ArrowRight size={24} color="#8b5cf6" />
                                <Box style={{ position: 'relative' }}>
                                    <Image
                                        src={story.after}
                                        alt="After"
                                        w={110}
                                        h={140}
                                        radius="md"
                                        fit="cover"
                                        style={{
                                            boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)',
                                        }}
                                    />
                                    <Badge
                                        color="green"
                                        size="xs"
                                        style={{ position: 'absolute', top: 8, left: 8 }}
                                    >
                                        AFTER
                                    </Badge>
                                </Box>
                            </Group>

                            {/* Story Content */}
                            <Stack gap="xs" align="center">
                                <Badge color="violet" size="lg">{story.result}</Badge>
                                <Text size="sm" c="dimmed" ta="center" fs="italic">
                                    "{story.quote}"
                                </Text>
                                <Text size="sm" fw={600}>— {story.name}</Text>
                            </Stack>
                        </Paper>
                    ))}
                </SimpleGrid>

                <Group justify="center" mt={28}>
                    <Button
                        size="lg"
                        variant="gradient"
                        gradient={{ from: 'violet', to: 'cyan', deg: 135 }}
                        rightSection={<ArrowRight size={20} />}
                        onClick={() => navigate('/simulator')}
                    >
                        Start Your Journey Today
                    </Button>
                </Group>
            </Container>

            {/* Features Section */}
            <Box py={50} style={{ background: 'rgba(139, 92, 246, 0.03)' }}>
                <Container size="lg">
                    <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
                        <Paper className="glass-card" p="lg">
                            <Box
                                mb="sm"
                                style={{
                                    width: 50,
                                    height: 50,
                                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2))',
                                    borderRadius: 12,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Sparkles size={24} color="#8b5cf6" />
                            </Box>
                            <Title order={5} mb="xs">AI Body Simulator</Title>
                            <Text size="xs" c="dimmed">
                                Upload your photo and see exactly how you'll look after your transformation.
                                Our AI visualizes your future self!
                            </Text>
                        </Paper>

                        <Paper className="glass-card" p="lg">
                            <Box
                                mb="sm"
                                style={{
                                    width: 50,
                                    height: 50,
                                    background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(239, 68, 68, 0.2))',
                                    borderRadius: 12,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Flame size={24} color="#f97316" />
                            </Box>
                            <Title order={5} mb="xs">Personalized Workouts</Title>
                            <Text size="xs" c="dimmed">
                                AI-generated workout plans tailored to your goals. Every exercise includes
                                YouTube video tutorials for perfect form.
                            </Text>
                        </Paper>

                        <Paper className="glass-card" p="lg">
                            <Box
                                mb="sm"
                                style={{
                                    width: 50,
                                    height: 50,
                                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(34, 197, 94, 0.2))',
                                    borderRadius: 12,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Target size={24} color="#10b981" />
                            </Box>
                            <Title order={5} mb="xs">Nutrition & Diet Plans</Title>
                            <Text size="xs" c="dimmed">
                                Science-backed meal plans designed for your specific goal.
                                Whether it's fat loss, muscle gain, or toning.
                            </Text>
                        </Paper>
                    </SimpleGrid>
                </Container>
            </Box>

            {/* CTA Section */}
            <Container size="sm" py={50}>
                <Paper
                    className="glass-card"
                    p={36}
                    style={{
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.1))',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        textAlign: 'center',
                    }}
                >
                    <Title order={3} mb="sm" style={{ fontFamily: 'Outfit' }}>
                        Ready to Change Your Life?
                    </Title>
                    <Text size="md" c="dimmed" mb="lg" maw={450} mx="auto">
                        The best investment you can make is in yourself.
                        Start your transformation journey today - it's completely free!
                    </Text>
                    <Button
                        size="xl"
                        variant="gradient"
                        gradient={{ from: 'violet', to: 'cyan', deg: 135 }}
                        leftSection={<Sparkles size={22} />}
                        onClick={() => navigate('/simulator')}
                    >
                        Get Started Free
                    </Button>
                </Paper>
            </Container>
        </Box>
    )
}
