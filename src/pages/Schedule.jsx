import { useState } from 'react'
import {
    Container, Title, Text, Paper, Group, Stack, Badge, Button, Box, SimpleGrid, Progress, Image
} from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Dumbbell, Play, Target, Flame, Clock, Trophy, Sparkles, Check } from 'lucide-react'
import { notifications } from '@mantine/notifications'

export default function SchedulePage() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const navigate = useNavigate()

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const today = new Date()

    // Sample workout schedule
    const workoutDays = [1, 3, 5, 8, 10, 12, 15, 17, 19, 22, 24, 26, 29]
    const restDays = [7, 14, 21, 28]
    const completedDays = [1, 3, 5, 8, 10]

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1))
    }

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1))
    }

    const handleStartWorkout = () => {
        notifications.show({
            title: "Let's Go! 💪",
            message: 'Starting your Upper Body Strength workout',
            color: 'violet',
        })
    }

    // Calculate progress
    const totalWorkouts = workoutDays.length
    const completedWorkouts = completedDays.length
    const progressPercent = Math.round((completedWorkouts / totalWorkouts) * 100)

    const renderDays = () => {
        const days = []

        for (let i = 0; i < firstDay; i++) {
            days.push(<Box key={`empty-${i}`} style={{ aspectRatio: 1 }} />)
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = today.getDate() === day &&
                today.getMonth() === month &&
                today.getFullYear() === year
            const hasWorkout = workoutDays.includes(day)
            const isRest = restDays.includes(day)
            const isCompleted = completedDays.includes(day)

            days.push(
                <Box
                    key={day}
                    style={{
                        aspectRatio: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 8,
                        cursor: 'pointer',
                        position: 'relative',
                        background: isToday
                            ? 'linear-gradient(135deg, #8b5cf6, #06b6d4)'
                            : isCompleted
                                ? 'rgba(16, 185, 129, 0.3)'
                                : hasWorkout
                                    ? 'rgba(139, 92, 246, 0.2)'
                                    : isRest
                                        ? 'rgba(249, 115, 22, 0.1)'
                                        : 'transparent',
                        border: isToday ? 'none' : '1px solid rgba(255,255,255,0.05)',
                        color: isToday ? 'white' : 'inherit',
                        fontWeight: isToday ? 600 : 400,
                        transition: 'all 0.2s',
                    }}
                >
                    {day}
                    {isCompleted && !isToday && (
                        <Check
                            size={12}
                            color="#10b981"
                            style={{ position: 'absolute', bottom: 2, right: 2 }}
                        />
                    )}
                </Box>
            )
        }

        return days
    }

    // Weekly goals
    const weeklyGoals = [
        { name: 'Workouts Completed', current: 4, target: 5, color: 'violet' },
        { name: 'Calories Burned', current: 1850, target: 2500, color: 'orange' },
        { name: 'Water Intake (L)', current: 18, target: 21, color: 'cyan' },
        { name: 'Sleep Hours', current: 48, target: 56, color: 'grape' },
    ]

    return (
        <Container size="xl" py="xl">
            {/* Header with Vision */}
            <Stack align="center" mb="xl">
                <Badge size="lg" variant="light" color="violet" leftSection={<CalendarIcon size={14} />}>
                    Stay Consistent
                </Badge>
                <Title order={1} ta="center" style={{ fontFamily: 'Outfit' }}>
                    Your <span className="gradient-text">Success Schedule</span>
                </Title>
                <Text c="dimmed" ta="center" maw={600} size="lg">
                    <strong style={{ color: '#8b5cf6' }}>Consistency is the key to transformation.</strong>
                    {' '}Plan your workouts, track your progress, and crush your goals.
                </Text>
            </Stack>

            {/* Progress Overview */}
            <Paper className="glass-card" p="xl" mb="xl">
                <Group justify="space-between" align="center" mb="lg">
                    <Box>
                        <Title order={3}>📈 Monthly Progress</Title>
                        <Text c="dimmed" size="sm">You're doing amazing! Keep it up!</Text>
                    </Box>
                    <Badge size="xl" color="green" variant="filled">
                        {progressPercent}% Complete
                    </Badge>
                </Group>

                <Progress
                    value={progressPercent}
                    size="xl"
                    color="green"
                    mb="lg"
                    styles={{
                        root: { background: 'rgba(255,255,255,0.05)' }
                    }}
                />

                <SimpleGrid cols={{ base: 2, md: 4 }} spacing="md">
                    {weeklyGoals.map((goal, i) => (
                        <Paper key={i} p="md" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12 }}>
                            <Text size="xs" c="dimmed" mb="xs">{goal.name}</Text>
                            <Group justify="space-between" mb="xs">
                                <Text fw={700}>{goal.current}</Text>
                                <Text size="sm" c="dimmed">/ {goal.target}</Text>
                            </Group>
                            <Progress
                                value={(goal.current / goal.target) * 100}
                                size="sm"
                                color={goal.color}
                            />
                        </Paper>
                    ))}
                </SimpleGrid>
            </Paper>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                {/* Calendar */}
                <Paper className="glass-card" p="xl">
                    <Group justify="space-between" mb="lg">
                        <Button variant="subtle" size="sm" onClick={prevMonth}>
                            <ChevronLeft size={20} />
                        </Button>
                        <Title order={4}>{monthNames[month]} {year}</Title>
                        <Button variant="subtle" size="sm" onClick={nextMonth}>
                            <ChevronRight size={20} />
                        </Button>
                    </Group>

                    {/* Weekday Headers */}
                    <Box
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(7, 1fr)',
                            gap: 8,
                            marginBottom: 8,
                        }}
                    >
                        {weekdays.map((day) => (
                            <Text key={day} ta="center" size="sm" c="dimmed" fw={500}>
                                {day}
                            </Text>
                        ))}
                    </Box>

                    {/* Calendar Days */}
                    <Box
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(7, 1fr)',
                            gap: 8,
                        }}
                    >
                        {renderDays()}
                    </Box>

                    {/* Legend */}
                    <Group mt="xl" justify="center" gap="lg">
                        <Group gap="xs">
                            <Box w={16} h={16} style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', borderRadius: 4 }} />
                            <Text size="xs" c="dimmed">Today</Text>
                        </Group>
                        <Group gap="xs">
                            <Box w={16} h={16} style={{ background: 'rgba(16, 185, 129, 0.4)', borderRadius: 4 }} />
                            <Text size="xs" c="dimmed">Completed</Text>
                        </Group>
                        <Group gap="xs">
                            <Box w={16} h={16} style={{ background: 'rgba(139, 92, 246, 0.3)', borderRadius: 4 }} />
                            <Text size="xs" c="dimmed">Scheduled</Text>
                        </Group>
                        <Group gap="xs">
                            <Box w={16} h={16} style={{ background: 'rgba(249, 115, 22, 0.2)', borderRadius: 4 }} />
                            <Text size="xs" c="dimmed">Rest Day</Text>
                        </Group>
                    </Group>
                </Paper>

                {/* Today's Workout */}
                <Stack gap="xl">
                    <Paper className="glass-card" p={0} style={{ overflow: 'hidden' }}>
                        {/* Workout Image */}
                        <Box style={{ position: 'relative', height: 150 }}>
                            <Image
                                src="https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=600&h=300&fit=crop"
                                alt="Today's Workout"
                                h={150}
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
                            <Badge
                                color="violet"
                                size="lg"
                                style={{ position: 'absolute', top: 12, right: 12 }}
                            >
                                TODAY
                            </Badge>
                        </Box>

                        <Box p="xl">
                            <Title order={4} mb="lg">💪 Today: Upper Body Strength</Title>

                            <Stack gap="sm" mb="xl">
                                {[
                                    { name: 'Bench Press', sets: '4×12', done: true },
                                    { name: 'Shoulder Press', sets: '3×10', done: true },
                                    { name: 'Bicep Curls', sets: '3×12', done: false },
                                    { name: 'Tricep Dips', sets: '3×15', done: false },
                                ].map((exercise, i) => (
                                    <Paper
                                        key={i}
                                        p="sm"
                                        style={{
                                            background: exercise.done
                                                ? 'rgba(16, 185, 129, 0.1)'
                                                : 'rgba(255, 255, 255, 0.03)',
                                            borderRadius: 10,
                                            border: exercise.done
                                                ? '1px solid rgba(16, 185, 129, 0.3)'
                                                : '1px solid rgba(255,255,255,0.05)',
                                        }}
                                    >
                                        <Group justify="space-between">
                                            <Group gap="sm">
                                                {exercise.done ? (
                                                    <Check size={18} color="#10b981" />
                                                ) : (
                                                    <Box w={18} h={18} style={{ border: '2px solid #64748b', borderRadius: 4 }} />
                                                )}
                                                <Text size="sm" td={exercise.done ? 'line-through' : 'none'} c={exercise.done ? 'dimmed' : 'inherit'}>
                                                    {exercise.name}
                                                </Text>
                                            </Group>
                                            <Badge size="sm" variant="light" color="violet">
                                                {exercise.sets}
                                            </Badge>
                                        </Group>
                                    </Paper>
                                ))}
                            </Stack>

                            <Button
                                fullWidth
                                size="lg"
                                leftSection={<Play size={20} />}
                                variant="gradient"
                                gradient={{ from: 'violet', to: 'cyan', deg: 135 }}
                                onClick={handleStartWorkout}
                            >
                                Continue Workout
                            </Button>
                        </Box>
                    </Paper>

                    {/* Quick Stats */}
                    <Paper className="glass-card" p="xl">
                        <Title order={5} mb="md">🏆 This Week's Wins</Title>
                        <SimpleGrid cols={2} spacing="md">
                            <Paper p="md" style={{ background: 'rgba(139, 92, 246, 0.1)', borderRadius: 12, textAlign: 'center' }}>
                                <Flame size={24} color="#8b5cf6" style={{ marginBottom: 8 }} />
                                <Text size="xl" fw={700}>1,850</Text>
                                <Text size="xs" c="dimmed">Calories Burned</Text>
                            </Paper>
                            <Paper p="md" style={{ background: 'rgba(16, 185, 129, 0.1)', borderRadius: 12, textAlign: 'center' }}>
                                <Trophy size={24} color="#10b981" style={{ marginBottom: 8 }} />
                                <Text size="xl" fw={700}>4</Text>
                                <Text size="xs" c="dimmed">Workouts Done</Text>
                            </Paper>
                        </SimpleGrid>
                    </Paper>
                </Stack>
            </SimpleGrid>

            {/* Motivation CTA */}
            <Paper
                className="glass-card"
                p="xl"
                mt="xl"
                style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.1))',
                    textAlign: 'center',
                }}
            >
                <Title order={3} mb="sm">🎯 Your Goal is Within Reach!</Title>
                <Text c="dimmed" mb="lg" maw={500} mx="auto">
                    You've completed {completedWorkouts} workouts this month. Stay consistent and you'll see
                    incredible results. Every workout counts!
                </Text>
                <Group justify="center">
                    <Button
                        size="lg"
                        variant="gradient"
                        gradient={{ from: 'violet', to: 'cyan', deg: 135 }}
                        leftSection={<Sparkles size={20} />}
                        onClick={() => navigate('/simulator')}
                    >
                        See Your Future Self
                    </Button>
                </Group>
            </Paper>
        </Container>
    )
}
