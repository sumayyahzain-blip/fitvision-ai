import { useState } from 'react'
import {
    Container, Title, Text, Paper, Group, Stack, Button, Badge, Modal,
    SimpleGrid, SegmentedControl, Box, Anchor, Image, Tabs
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { Dumbbell, Clock, Flame, Signal, Plus, Play, ExternalLink } from 'lucide-react'
import { workouts } from '../data/data'

function WorkoutCard({ workout, onClick }) {
    const levelColors = {
        beginner: 'green',
        intermediate: 'yellow',
        advanced: 'red',
    }

    return (
        <Paper
            className="glass-card"
            p={0}
            style={{ cursor: 'pointer', transition: 'all 0.3s', overflow: 'hidden' }}
            onClick={onClick}
        >
            {/* Workout Image */}
            <Box style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
                <Image
                    src={workout.image}
                    alt={workout.title}
                    h={160}
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
                        height: '50%',
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                    }}
                />
                {/* Level Badge */}
                <Badge
                    size="sm"
                    color={levelColors[workout.level]}
                    style={{ position: 'absolute', top: 12, right: 12 }}
                >
                    {workout.level}
                </Badge>
                {/* Play Button */}
                <Box
                    style={{
                        position: 'absolute',
                        bottom: 12,
                        right: 12,
                        width: 36,
                        height: 36,
                        background: 'rgba(255, 0, 0, 0.9)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 10px rgba(255,0,0,0.3)',
                    }}
                >
                    <Play size={18} color="white" fill="white" />
                </Box>
                {/* Duration on image */}
                <Badge
                    size="sm"
                    color="dark"
                    style={{ position: 'absolute', bottom: 12, left: 12 }}
                >
                    <Group gap={4}>
                        <Clock size={12} />
                        {workout.duration} min
                    </Group>
                </Badge>
            </Box>

            {/* Card Content */}
            <Box p="md">
                <Title order={4} mb="xs" lineClamp={1}>{workout.title}</Title>

                <Group gap="md" mb="md">
                    <Group gap={4}>
                        <Flame size={14} color="#f97316" />
                        <Text size="sm" c="dimmed">{workout.calories} cal</Text>
                    </Group>
                </Group>

                <Group gap="xs">
                    {workout.tags.slice(0, 2).map((tag, i) => (
                        <Badge key={i} size="xs" variant="light" color="violet">
                            {tag}
                        </Badge>
                    ))}
                </Group>
            </Box>
        </Paper>
    )
}

export default function WorkoutsPage() {
    const [filter, setFilter] = useState('all')
    const [levelFilter, setLevelFilter] = useState('all')
    const [opened, { open, close }] = useDisclosure(false)
    const [selectedWorkout, setSelectedWorkout] = useState(null)

    // Sort workouts by level order: beginner → intermediate → advanced
    const levelOrder = { beginner: 1, intermediate: 2, advanced: 3 }

    const sortedWorkouts = [...workouts].sort((a, b) =>
        levelOrder[a.level] - levelOrder[b.level]
    )

    // Filter by type and level
    let filteredWorkouts = sortedWorkouts

    if (filter !== 'all') {
        filteredWorkouts = filteredWorkouts.filter(w => w.type === filter)
    }

    if (levelFilter !== 'all') {
        filteredWorkouts = filteredWorkouts.filter(w => w.level === levelFilter)
    }

    const handleWorkoutClick = (workout) => {
        setSelectedWorkout(workout)
        open()
    }

    const handleAddToSchedule = () => {
        notifications.show({
            title: 'Success!',
            message: 'Workout added to your schedule!',
            color: 'green',
        })
        close()
    }

    // Group workouts by level for display
    const beginnerWorkouts = filteredWorkouts.filter(w => w.level === 'beginner')
    const intermediateWorkouts = filteredWorkouts.filter(w => w.level === 'intermediate')
    const advancedWorkouts = filteredWorkouts.filter(w => w.level === 'advanced')

    return (
        <Container size="xl" py="xl">
            {/* Header */}
            <Stack align="center" mb="xl">
                <Badge size="lg" variant="light" color="violet" leftSection={<Dumbbell size={14} />}>
                    AI-Generated
                </Badge>
                <Title order={1} ta="center" style={{ fontFamily: 'Outfit' }}>
                    Personalized <span className="gradient-text">Workouts</span>
                </Title>
                <Text c="dimmed" ta="center" maw={500}>
                    Customized workout plans with video tutorials. Start from beginner and progress to advanced!
                </Text>
            </Stack>

            {/* Filters */}
            <Stack gap="md" mb="xl">
                {/* Type Filter */}
                <Group justify="center">
                    <Text size="sm" c="dimmed">Type:</Text>
                    <SegmentedControl
                        value={filter}
                        onChange={setFilter}
                        data={[
                            { label: 'All', value: 'all' },
                            { label: 'Strength', value: 'strength' },
                            { label: 'Cardio', value: 'cardio' },
                            { label: 'Flexibility', value: 'flexibility' },
                            { label: 'HIIT', value: 'hiit' },
                        ]}
                        color="violet"
                    />
                </Group>

                {/* Level Filter */}
                <Group justify="center">
                    <Text size="sm" c="dimmed">Level:</Text>
                    <SegmentedControl
                        value={levelFilter}
                        onChange={setLevelFilter}
                        data={[
                            { label: '🎯 All Levels', value: 'all' },
                            { label: '🌱 Beginner', value: 'beginner' },
                            { label: '⚡ Intermediate', value: 'intermediate' },
                            { label: '🔥 Advanced', value: 'advanced' },
                        ]}
                        color="violet"
                    />
                </Group>
            </Stack>

            {/* Workouts by Level */}
            {levelFilter === 'all' ? (
                <Stack gap="xl">
                    {/* Beginner Section */}
                    {beginnerWorkouts.length > 0 && (
                        <Box>
                            <Group mb="md">
                                <Badge size="lg" color="green" variant="filled">🌱 Beginner</Badge>
                                <Text c="dimmed" size="sm">Perfect for starting your fitness journey</Text>
                            </Group>
                            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
                                {beginnerWorkouts.map((workout) => (
                                    <WorkoutCard
                                        key={workout.id}
                                        workout={workout}
                                        onClick={() => handleWorkoutClick(workout)}
                                    />
                                ))}
                            </SimpleGrid>
                        </Box>
                    )}

                    {/* Intermediate Section */}
                    {intermediateWorkouts.length > 0 && (
                        <Box>
                            <Group mb="md">
                                <Badge size="lg" color="yellow" variant="filled">⚡ Intermediate</Badge>
                                <Text c="dimmed" size="sm">Take your fitness to the next level</Text>
                            </Group>
                            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
                                {intermediateWorkouts.map((workout) => (
                                    <WorkoutCard
                                        key={workout.id}
                                        workout={workout}
                                        onClick={() => handleWorkoutClick(workout)}
                                    />
                                ))}
                            </SimpleGrid>
                        </Box>
                    )}

                    {/* Advanced Section */}
                    {advancedWorkouts.length > 0 && (
                        <Box>
                            <Group mb="md">
                                <Badge size="lg" color="red" variant="filled">🔥 Advanced</Badge>
                                <Text c="dimmed" size="sm">Challenge yourself with intense workouts</Text>
                            </Group>
                            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
                                {advancedWorkouts.map((workout) => (
                                    <WorkoutCard
                                        key={workout.id}
                                        workout={workout}
                                        onClick={() => handleWorkoutClick(workout)}
                                    />
                                ))}
                            </SimpleGrid>
                        </Box>
                    )}
                </Stack>
            ) : (
                <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
                    {filteredWorkouts.map((workout) => (
                        <WorkoutCard
                            key={workout.id}
                            workout={workout}
                            onClick={() => handleWorkoutClick(workout)}
                        />
                    ))}
                </SimpleGrid>
            )}

            {/* Workout Modal */}
            <Modal
                opened={opened}
                onClose={close}
                size="lg"
                centered
                padding={0}
                styles={{
                    content: {
                        background: 'rgba(18, 18, 26, 0.98)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        overflow: 'hidden',
                    },
                    header: {
                        display: 'none',
                    }
                }}
            >
                {selectedWorkout && (
                    <Stack gap={0}>
                        {/* Modal Image Header */}
                        <Box style={{ position: 'relative', height: 200 }}>
                            <Image
                                src={selectedWorkout.image}
                                alt={selectedWorkout.title}
                                h={200}
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
                            <Button
                                size="xs"
                                color="dark"
                                variant="filled"
                                style={{ position: 'absolute', top: 12, right: 12 }}
                                onClick={close}
                            >
                                ✕
                            </Button>
                            <Box style={{ position: 'absolute', bottom: 16, left: 20 }}>
                                <Title order={2} c="white">{selectedWorkout.title}</Title>
                            </Box>
                        </Box>

                        {/* Modal Content */}
                        <Box p="xl">
                            <Group gap="lg" mb="lg">
                                <Group gap={4}>
                                    <Clock size={16} color="#94a3b8" />
                                    <Text size="sm">{selectedWorkout.duration} min</Text>
                                </Group>
                                <Group gap={4}>
                                    <Flame size={16} color="#f97316" />
                                    <Text size="sm">{selectedWorkout.calories} cal</Text>
                                </Group>
                                <Group gap={4}>
                                    <Signal size={16} color="#8b5cf6" />
                                    <Text size="sm" tt="capitalize">{selectedWorkout.level}</Text>
                                </Group>
                            </Group>

                            {/* Exercises with YouTube Links */}
                            <Box mb="lg">
                                <Group mb="sm">
                                    <Title order={5}>Exercises</Title>
                                    <Badge color="red" size="sm" leftSection={<Play size={10} />}>
                                        Video Tutorials
                                    </Badge>
                                </Group>

                                <Stack gap="xs">
                                    {selectedWorkout.exercises.map((exercise, i) => (
                                        <Paper
                                            key={i}
                                            p="sm"
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.03)',
                                                borderRadius: 8,
                                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                            }}
                                        >
                                            <Group justify="space-between" align="center">
                                                <Group gap="sm">
                                                    <Box
                                                        style={{
                                                            width: 28,
                                                            height: 28,
                                                            background: 'rgba(139, 92, 246, 0.2)',
                                                            borderRadius: 6,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        <Text size="xs" fw={600} c="violet">{i + 1}</Text>
                                                    </Box>
                                                    <Text size="sm">{exercise.name}</Text>
                                                </Group>
                                                <Anchor
                                                    href={exercise.youtube}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Button
                                                        size="xs"
                                                        color="red"
                                                        variant="light"
                                                        leftSection={<Play size={12} fill="currentColor" />}
                                                        rightSection={<ExternalLink size={12} />}
                                                    >
                                                        Watch
                                                    </Button>
                                                </Anchor>
                                            </Group>
                                        </Paper>
                                    ))}
                                </Stack>
                            </Box>

                            {/* Nutrition Guide */}
                            <Paper
                                p="md"
                                mb="lg"
                                style={{
                                    background: 'rgba(16, 185, 129, 0.1)',
                                    border: '1px solid rgba(16, 185, 129, 0.2)',
                                    borderRadius: 12,
                                }}
                            >
                                <Title order={5} c="green" mb="sm">🥗 Nutrition Guide</Title>
                                <Text size="sm" mb="xs">
                                    <strong>Pre-workout:</strong> {selectedWorkout.diet.pre}
                                </Text>
                                <Text size="sm" mb="xs">
                                    <strong>Post-workout:</strong> {selectedWorkout.diet.post}
                                </Text>
                                <Text size="sm" c="dimmed" fs="italic">
                                    💡 {selectedWorkout.diet.tip}
                                </Text>
                            </Paper>

                            <Button
                                fullWidth
                                size="md"
                                leftSection={<Plus size={18} />}
                                variant="gradient"
                                gradient={{ from: 'violet', to: 'cyan', deg: 135 }}
                                onClick={handleAddToSchedule}
                            >
                                Add to Schedule
                            </Button>
                        </Box>
                    </Stack>
                )}
            </Modal>
        </Container>
    )
}
