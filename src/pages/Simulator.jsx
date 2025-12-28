import { useState, useRef, useEffect } from 'react'
import {
    Container, Title, Text, Paper, Group, Stack, Button, Badge,
    SegmentedControl, Slider, Box, Image, Loader, Center, Grid, Modal, SimpleGrid
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { Wand2, Upload, TrendingDown, TrendingUp, Activity, Sparkles, X, ArrowRight, User, MoveHorizontal, Maximize2, Dumbbell, Play } from 'lucide-react'
import { dietPlans, transformationEffects, transformationVariations, workouts } from '../data/data'
import { useNavigate } from 'react-router-dom'

// Before/After Slider Component
const BeforeAfterSlider = ({ beforeImage, afterImage, afterEffects, onClick, style, removeBackground }) => {
    const [sliderPosition, setSliderPosition] = useState(50)
    const containerRef = useRef(null)

    const handleMouseMove = (e) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
            setSliderPosition((x / rect.width) * 100)
        }
    }

    const handleTouchMove = (e) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width))
            setSliderPosition((x / rect.width) * 100)
        }
    }

    const afterImageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        ...afterEffects,
    }

    // Simulate Background Removal if requested
    if (removeBackground) {
        // Since we can't do real-time AI removal on client-side JS purely reliably without valid API,
        // we simulate "Clearer Image" by focusing and adding a strong vignette or contrast mask
        // In a real app, this would use the transparent PNG returned by the AI service.
        // mimicking the "removed background" look by using a radial gradient mask to hide edges
        afterImageStyle.maskImage = 'radial-gradient(ellipse at center, black 60%, transparent 100%)';
        afterImageStyle.WebkitMaskImage = 'radial-gradient(ellipse at center, black 60%, transparent 100%)';
        // And adding a solid background color to the container
    }

    return (
        <Box
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onClick={onClick}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                cursor: 'ew-resize',
                userSelect: 'none',
                touchAction: 'none',
                borderRadius: 16,
                backgroundColor: removeBackground ? '#0a0a0f' : 'transparent', // Dark bg for "removed" look
                ...style
            }}
        >
            {/* After Image (Background/Underneath) */}
            <Image
                src={afterImage}
                alt="After"
                style={afterImageStyle}
            />
            <Badge
                color="green"
                variant="filled"
                size="lg"
                style={{ position: 'absolute', top: 20, right: 20, zIndex: 10 }}
            >
                AFTER
            </Badge>

            {/* Before Image (Foreground - Clipped) */}
            <Box
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: `${sliderPosition}%`,
                    height: '100%',
                    overflow: 'hidden',
                    borderRight: '3px solid white',
                    zIndex: 20,
                    backgroundColor: '#1a1a25', // Fallback
                }}
            >
                <Image
                    src={beforeImage}
                    alt="Before"
                    style={{
                        width: containerRef.current ? containerRef.current.offsetWidth : '100%',
                        height: '100%',
                        objectFit: 'cover',
                        maxWidth: 'none', // Critical for correct alignment
                    }}
                />
                <Badge
                    color="red"
                    variant="filled"
                    size="lg"
                    style={{ position: 'absolute', top: 20, left: 20, zIndex: 30 }}
                >
                    BEFORE
                </Badge>
            </Box>

            {/* Slider Handle */}
            <Box
                style={{
                    position: 'absolute',
                    top: 0,
                    left: `${sliderPosition}%`,
                    height: '100%',
                    width: 40,
                    transform: 'translateX(-50%)',
                    zIndex: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none', // Letting clicks pass through to container
                }}
            >
                <Box
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#64748b',
                    }}
                >
                    <MoveHorizontal size={20} />
                </Box>
            </Box>

            {/* Click to Expand Hint */}
            <Box
                style={{
                    position: 'absolute',
                    bottom: 20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 50,
                    background: 'rgba(0,0,0,0.6)',
                    padding: '6px 16px',
                    borderRadius: 20,
                    backdropFilter: 'blur(4px)',
                    opacity: 0.8,
                    pointerEvents: 'none'
                }}
            >
                <Group gap={6}>
                    <Maximize2 size={14} color="white" />
                    <Text size="xs" c="white">Click to Enlarge</Text>
                </Group>
            </Box>
        </Box>
    )
}

export default function SimulatorPage() {
    const navigate = useNavigate()
    const [uploadedImage, setUploadedImage] = useState(null)
    const [goal, setGoal] = useState('weight-loss')
    const [intensity, setIntensity] = useState('moderate')
    const [timeline, setTimeline] = useState(6)
    const [isGenerating, setIsGenerating] = useState(false)
    const [useOwnPhoto, setUseOwnPhoto] = useState(false)
    const fileInputRef = useRef(null)

    const [result, setResult] = useState(null)
    const [opened, { open, close }] = useDisclosure(false)

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setUploadedImage(e.target.result)
                setUseOwnPhoto(true)
                setResult(null)
                setGeneratedVariations([])
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setUploadedImage(e.target.result)
                setUseOwnPhoto(true)
                setResult(null)
                setGeneratedVariations([])
            }
            reader.readAsDataURL(file)
        }
    }

    const [generatedVariations, setGeneratedVariations] = useState([])

    const handleGenerate = () => {
        setIsGenerating(true)
        setResult(null)
        setGeneratedVariations([])

        setTimeout(() => {
            setIsGenerating(false)

            // Get all variations for the current goal
            const variations = transformationVariations[goal] || transformationVariations['weight-loss']

            // Create full result objects for all 5 variations
            // applying the user's photo (if exists) to all of them
            const allResults = variations.map(match => {
                const sourceImage = useOwnPhoto && uploadedImage ? uploadedImage : match.image
                return {
                    plan: dietPlans[goal],
                    effects: {
                        ...transformationEffects[goal], // Base stats
                        ...match.effects, // Specific filters/transforms
                        description: match.description
                    },
                    images: {
                        before: sourceImage,
                        after: sourceImage // Morphing: same image + CSS effects
                    },
                    workout: workouts.find(w => w.id === match.workoutId),
                    variationLabel: match.label,
                    variationId: match.id || Math.random() // Ensure ID key
                }
            })

            // Set the choices for the user to pick from
            setGeneratedVariations(allResults)

            notifications.show({
                title: 'Analysis Complete! 🧬',
                message: 'Select a target physique to view detailed transformation.',
                color: 'violet',
            })
        }, 2500)
    }

    const handleNextGoal = (newGoal) => {
        setGoal(newGoal)
        close()
        notifications.show({
            title: 'Goal Updated! 🚀',
            message: `Switched to ${newGoal.replace('-', ' ').toUpperCase()}. Click Generate to see your next level!`,
            color: 'blue'
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const goalData = [
        { value: 'weight-loss', label: 'Weight Loss', icon: TrendingDown, color: 'orange' },
        { value: 'muscle-gain', label: 'Muscle Gain', icon: TrendingUp, color: 'blue' },
        { value: 'toning', label: 'Toning', icon: Activity, color: 'green' },
    ]

    return (
        <Container size="xl" py="xl">
            {/* Header */}
            <Stack align="center" mb="xl">
                <Badge size="lg" variant="light" color="violet" leftSection={<Wand2 size={14} />}>
                    AI Technology
                </Badge>
                <Title order={1} ta="center" style={{ fontFamily: 'Outfit' }}>
                    Body Transformation <span className="gradient-text">Simulator</span>
                </Title>
                <Text c="dimmed" ta="center" maw={500}>
                    See realistic transformation results based on your fitness goals.
                </Text>
            </Stack>

            <Grid gutter="xl">
                {/* Upload Section */}
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Paper className="glass-card" p="xl" h="100%" mih={400}>
                        <Title order={4} mb="md">📸 Your Photo (Optional)</Title>
                        {!uploadedImage ? (
                            <Box
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                style={{
                                    height: 280,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '2px dashed rgba(139, 92, 246, 0.3)',
                                    borderRadius: 16,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    background: 'rgba(139, 92, 246, 0.05)',
                                }}
                            >
                                <Box
                                    style={{
                                        width: 80,
                                        height: 80,
                                        background: 'rgba(139, 92, 246, 0.15)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: 20,
                                    }}
                                >
                                    <Upload size={36} color="#8b5cf6" />
                                </Box>
                                <Title order={4}>Upload Your Photo</Title>
                                <Text c="dimmed" size="sm" mt="xs">Or use sample images</Text>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                            </Box>
                        ) : (
                            <Box style={{ position: 'relative' }}>
                                <Image
                                    src={uploadedImage}
                                    alt="Your Photo"
                                    radius="md"
                                    h={280}
                                    fit="cover"
                                />
                                <Button
                                    size="xs"
                                    color="red"
                                    variant="filled"
                                    style={{ position: 'absolute', top: 8, right: 8 }}
                                    onClick={() => {
                                        setUploadedImage(null)
                                        setUseOwnPhoto(false)
                                        setResult(null)
                                    }}
                                >
                                    <X size={16} />
                                </Button>
                                <Badge
                                    color="green"
                                    style={{ position: 'absolute', bottom: 8, left: 8 }}
                                >
                                    ✓ Your Photo
                                </Badge>
                            </Box>
                        )}

                        <Text size="xs" c="dimmed" ta="center" mt="md">
                            💡 Upload your photo to see personalized results, or use our sample transformation images
                        </Text>
                    </Paper>
                </Grid.Col>

                {/* Controls Section */}
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Paper className="glass-card" p="xl" h="100%" mih={400}>
                        <Title order={4} mb="lg">⚙️ Transformation Settings</Title>

                        <Stack gap="lg">
                            <Box>
                                <Text size="sm" c="dimmed" mb="sm" fw={500}>Goal Type</Text>
                                <Stack gap="xs">
                                    {goalData.map((item) => (
                                        <Button
                                            key={item.value}
                                            variant={goal === item.value ? 'light' : 'subtle'}
                                            color={goal === item.value ? 'violet' : 'gray'}
                                            onClick={() => {
                                                setGoal(item.value)
                                                setResult(null)
                                            }}
                                            leftSection={<item.icon size={18} />}
                                            fullWidth
                                            justify="flex-start"
                                            styles={{ root: { height: 'auto', padding: '12px 16px' } }}
                                        >
                                            <Text size="sm">{item.label}</Text>
                                        </Button>
                                    ))}
                                </Stack>
                            </Box>

                            <Box>
                                <Text size="sm" c="dimmed" mb="sm" fw={500}>
                                    Timeline: <span style={{ color: '#8b5cf6', fontWeight: 700 }}>{timeline} months</span>
                                </Text>
                                <Slider
                                    value={timeline}
                                    onChange={setTimeline}
                                    min={1}
                                    max={12}
                                    step={1}
                                    color="violet"
                                    marks={[
                                        { value: 1, label: '1' },
                                        { value: 6, label: '6' },
                                        { value: 12, label: '12' },
                                    ]}
                                />
                            </Box>

                            <Button
                                size="lg"
                                fullWidth
                                leftSection={<Sparkles size={20} />}
                                variant="gradient"
                                gradient={{ from: 'violet', to: 'cyan', deg: 135 }}
                                onClick={handleGenerate}
                                loading={isGenerating}
                            >
                                Generate Transformation
                            </Button>
                        </Stack>
                    </Paper>
                </Grid.Col>

                {/* Result Section */}
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Paper className="glass-card" p="xl" h="100%" mih={400}>
                        <Title order={4} mb="md">✨ Select Your Result</Title>

                        {isGenerating ? (
                            <Center style={{ height: 320 }}>
                                <Stack align="center">
                                    <Loader size="xl" color="violet" type="bars" />
                                    <Text c="dimmed" ta="center">
                                        Analyzing body composition...<br /> Generating AI transformation...
                                    </Text>
                                </Stack>
                            </Center>
                        ) : result ? (
                            // Selected Result View
                            <Stack>
                                {/* Before/After Slider Container */}
                                <Box
                                    style={{
                                        width: '100%',
                                        height: 350,
                                        borderRadius: 16,
                                        overflow: 'hidden',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                        border: '1px solid rgba(139, 92, 246, 0.3)',
                                    }}
                                >
                                    <BeforeAfterSlider
                                        beforeImage={result.images.before}
                                        afterImage={result.images.after}
                                        afterEffects={{
                                            filter: useOwnPhoto ? result.effects.filter : 'none',
                                            transform: useOwnPhoto ? result.effects.transform : 'none',
                                        }}
                                        removeBackground={result.effects.removeBackground}
                                        onClick={open}
                                    />
                                </Box>

                                {/* Transformation Description */}
                                <Badge color="violet" size="lg" fullWidth variant="light" py="xs">
                                    🎯 {result.effects.description}
                                </Badge>

                                {/* Recommended Workout Link */}
                                {result.workout && (
                                    <Box
                                        p="sm"
                                        style={{
                                            background: 'rgba(56, 189, 248, 0.1)',
                                            borderRadius: 12,
                                            border: '1px solid rgba(56, 189, 248, 0.2)',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => navigate('/workouts')}
                                    >
                                        <Group justify="space-between">
                                            <Group gap="xs">
                                                <Dumbbell size={18} color="#38bdf8" />
                                                <Stack gap={0}>
                                                    <Text size="xs" c="dimmed">Recommended Plan</Text>
                                                    <Text size="sm" fw={600} c="cyan.3">{result.workout.title}</Text>
                                                </Stack>
                                            </Group>
                                            <ArrowRight size={16} color="#38bdf8" />
                                        </Group>
                                    </Box>
                                )}

                                <Button
                                    variant="subtle"
                                    size="xs"
                                    compact
                                    color="gray"
                                    onClick={() => setResult(null)}
                                >
                                    ← Back to Variations
                                </Button>
                            </Stack>
                        ) : generatedVariations.length > 0 ? (
                            // NEW: Variation Selection Grid
                            <Stack>
                                <Text size="sm" c="dimmed">Select your target physique:</Text>
                                <SimpleGrid cols={2} spacing="sm">
                                    {generatedVariations.map((v, i) => (
                                        <Paper
                                            key={i}
                                            onClick={() => setResult(v)}
                                            className="glass-card"
                                            p={0}
                                            style={{
                                                cursor: 'pointer',
                                                overflow: 'hidden',
                                                position: 'relative',
                                                border: '1px solid rgba(139, 92, 246, 0.3)',
                                                transition: 'transform 0.2s',
                                                aspectRatio: '0.8',
                                            }}
                                        >
                                            {/* Preview Image - Apply Effects */}
                                            <Image
                                                src={v.images.after}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    ...v.effects, // Apply the morph effects to the thumbnail
                                                }}
                                            />
                                            <Box
                                                style={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: 0,
                                                    right: 0,
                                                    background: 'rgba(0,0,0,0.7)',
                                                    padding: '8px',
                                                    textAlign: 'center'
                                                }}
                                            >
                                                <Text size="xs" fw={700} c="white">{v.variationLabel}</Text>
                                            </Box>
                                        </Paper>
                                    ))}
                                </SimpleGrid>
                            </Stack>
                        ) : (
                            <Stack style={{ height: '100%', justifyContent: 'center' }}>
                                {/* DEMO / PREVIEW MODE */}
                                <Box
                                    style={{
                                        flex: 1,
                                        borderRadius: 16,
                                        overflow: 'hidden',
                                        position: 'relative',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        minHeight: 250
                                    }}
                                >
                                    <Badge
                                        color="yellow"
                                        variant="filled"
                                        style={{ position: 'absolute', top: 10, right: 10, zIndex: 100 }}
                                    >
                                        PREVIEW MODE
                                    </Badge>
                                    <BeforeAfterSlider
                                        beforeImage="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=500&fit=crop"
                                        afterImage="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=500&fit=crop"
                                        afterEffects={{ filter: 'none', transform: 'none' }}
                                        removeBackground={false}
                                    />
                                </Box>
                                <Text c="dimmed" ta="center" size="sm" mt="sm">
                                    See your potential! <br />
                                    Click <strong>Generate</strong> to simulate your own.
                                </Text>
                            </Stack>
                        )}
                    </Paper>
                </Grid.Col>
            </Grid>

            {/* FULL SCREEN MODAL */}
            <Modal
                opened={opened}
                onClose={close}
                size="90%"
                centered
                padding={0}
                styles={{
                    content: {
                        background: 'transparent',
                        boxShadow: 'none',
                    },
                    body: {
                        background: 'transparent',
                    }
                }}
                withCloseButton={false}
            >
                {result && (
                    <Grid gutter="xl" style={{ height: '85vh', width: '100%', margin: 0 }}>
                        {/* Left Side: Large Image Slider */}
                        <Grid.Col span={{ base: 12, md: 8 }} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Group justify="space-between" w="100%" mb="md">
                                <Title order={2} style={{ color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                                    Life Changing <span className="gradient-text">Inspired</span>
                                </Title>
                                <Button variant="subtle" color="gray" onClick={close} size="lg">
                                    <X size={32} color="white" />
                                </Button>
                            </Group>

                            <Box
                                style={{
                                    flex: 1,
                                    width: '100%',
                                    borderRadius: 24,
                                    overflow: 'hidden',
                                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    position: 'relative'
                                }}
                            >
                                <BeforeAfterSlider
                                    beforeImage={result.images.before}
                                    afterImage={result.images.after}
                                    afterEffects={{
                                        filter: useOwnPhoto ? result.effects.filter : 'none',
                                        transform: useOwnPhoto ? result.effects.transform : 'none',
                                    }}
                                    removeBackground={result.effects.removeBackground}
                                />
                            </Box>
                        </Grid.Col>

                        {/* Right Side: Detailed Insights */}
                        <Grid.Col span={{ base: 12, md: 4 }} style={{ height: '100%', overflowY: 'auto' }}>
                            <Stack
                                p="xl"
                                style={{
                                    background: 'rgba(20, 20, 30, 0.95)',
                                    borderRadius: 24,
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    height: '100%',
                                    backdropFilter: 'blur(20px)'
                                }}
                            >
                                <Title order={3} c="white">Analysis & Feedback</Title>
                                <Text c="dimmed" size="sm">Based on your goal: <span style={{ color: '#8b5cf6' }}>{result.plan.name}</span></Text>

                                {/* Key Stats Grid */}
                                <Grid mt="md">
                                    {Object.entries(result.effects.stats || {}).map(([key, value]) => (
                                        <Grid.Col span={6} key={key}>
                                            <Paper p="sm" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12 }}>
                                                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                                </Text>
                                                <Text size="lg" fw={700} c="green.4">{value}</Text>
                                            </Paper>
                                        </Grid.Col>
                                    ))}
                                </Grid>

                                {/* Suggested Workout Card (Large in Modal) */}
                                {result.workout && (
                                    <Box mt="md" mb="md">
                                        <Title order={4} c="white" mb="sm">Recommended Workout</Title>
                                        <Paper
                                            p="md"
                                            style={{
                                                background: 'rgba(56, 189, 248, 0.15)',
                                                borderRadius: 16,
                                                border: '1px solid rgba(56, 189, 248, 0.3)'
                                            }}
                                        >
                                            <Group mb="xs">
                                                <Badge color="cyan" size="lg" leftSection={<Dumbbell size={14} />}>
                                                    {result.workout.type.toUpperCase()}
                                                </Badge>
                                                <Badge color="gray" variant="outline">{result.workout.duration} min</Badge>
                                            </Group>
                                            <Title order={3} c="white" mb="xs">{result.workout.title}</Title>
                                            <Text size="sm" c="gray.3" mb="md">
                                                Designed for: <span style={{ color: '#ffffff', fontWeight: 600 }}>{result.variationLabel}</span>
                                            </Text>
                                            <Button
                                                fullWidth
                                                variant="white"
                                                color="dark"
                                                leftSection={<Play size={16} />}
                                                onClick={() => navigate('/workouts')}
                                            >
                                                Start Workout
                                            </Button>
                                        </Paper>
                                    </Box>

                                )}

                                {/* Nutrition & Food Intake - NEW */}
                                <Box mb="lg">
                                    <Title order={4} c="white" mb="sm">Nutrition & Food Intake</Title>
                                    <Paper
                                        p="md"
                                        style={{
                                            background: 'rgba(16, 185, 129, 0.15)',
                                            borderRadius: 16,
                                            border: '1px solid rgba(16, 185, 129, 0.3)'
                                        }}
                                    >
                                        <Group mb="xs">
                                            <Badge color="green" size="lg" leftSection={<Sparkles size={14} />}>
                                                {result.plan.name}
                                            </Badge>
                                        </Group>

                                        <Text size="sm" c="gray.3" mb="xs">
                                            To achieve this <strong>{result.variationLabel}</strong> look quickly:
                                        </Text>
                                        <Grid>
                                            <Grid.Col span={6}>
                                                <Stack gap={4}>
                                                    <Text size="xs" c="dimmed">Daily Calories</Text>
                                                    <Text size="lg" fw={700} c="white">{result.plan.calories}</Text>
                                                </Stack>
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <Stack gap={4}>
                                                    <Text size="xs" c="dimmed">Macros</Text>
                                                    <Text size="sm" fw={600} c="white">{result.plan.macros}</Text>
                                                </Stack>
                                            </Grid.Col>
                                        </Grid>
                                        <Button
                                            fullWidth
                                            mt="md"
                                            variant="white"
                                            color="dark"
                                            size="xs"
                                            onClick={() => navigate('/nutrition')} // Assuming nutrition page exists or will be linked
                                        >
                                            View Full Meal Plan
                                        </Button>
                                    </Paper>
                                </Box>

                                <Title order={4} c="white" mt="md">Expected Changes</Title>
                                <Stack gap="md">
                                    {(result.effects.feedback || []).map((item, index) => (
                                        <Group key={index} align="flex-start" wrap="nowrap">
                                            <Badge size="xs" circle color="violet">{index + 1}</Badge>
                                            <Text size="sm" c="gray.3">{item}</Text>
                                        </Group>
                                    ))}
                                </Stack>


                                {/* Next Phase Recommendation - INTERACTIVE CARDS */}
                                <Box mt="xl" pb="xl">
                                    <Title order={4} c="white" mb="md">🚀 Explore Next Goals</Title>
                                    <Text size="sm" c="gray.5" mb="md">
                                        Choose your next target to instantly simulate the journey:
                                    </Text>

                                    <Grid gutter="sm">
                                        {goal === 'weight-loss' && (
                                            <>
                                                <Grid.Col span={6}>
                                                    <Paper
                                                        p="xm"
                                                        onClick={() => handleNextGoal('muscle-gain')}
                                                        style={{
                                                            background: 'rgba(255,255,255,0.05)',
                                                            borderRadius: 12,
                                                            cursor: 'pointer',
                                                            border: '1px solid transparent',
                                                            transition: 'all 0.2s',
                                                            textAlign: 'center'
                                                        }}
                                                    >
                                                        <TrendingUp size={24} color="#38bdf8" style={{ marginBottom: 8 }} />
                                                        <Text size="xs" fw={700} c="white">BUILD MUSCLE</Text>
                                                        <Text size="xs" c="dimmed" lh={1.2} mt={4}>Add curves & shape</Text>
                                                    </Paper>
                                                </Grid.Col>
                                                <Grid.Col span={6}>
                                                    <Paper
                                                        p="xm"
                                                        onClick={() => handleNextGoal('toning')}
                                                        style={{
                                                            background: 'rgba(255,255,255,0.05)',
                                                            borderRadius: 12,
                                                            cursor: 'pointer',
                                                            border: '1px solid transparent',
                                                            transition: 'all 0.2s',
                                                            textAlign: 'center'
                                                        }}
                                                    >
                                                        <Activity size={24} color="#4ade80" style={{ marginBottom: 8 }} />
                                                        <Text size="xs" fw={700} c="white">GET TONED</Text>
                                                        <Text size="xs" c="dimmed" lh={1.2} mt={4}>Lean & defined</Text>
                                                    </Paper>
                                                </Grid.Col>
                                            </>
                                        )}
                                        {goal === 'muscle-gain' && (
                                            <>
                                                <Grid.Col span={6}>
                                                    <Paper
                                                        p="xm"
                                                        onClick={() => handleNextGoal('toning')}
                                                        style={{
                                                            background: 'rgba(255,255,255,0.05)',
                                                            borderRadius: 12,
                                                            cursor: 'pointer',
                                                            border: '1px solid transparent',
                                                            transition: 'all 0.2s',
                                                            textAlign: 'center'
                                                        }}
                                                    >
                                                        <Activity size={24} color="#4ade80" style={{ marginBottom: 8 }} />
                                                        <Text size="xs" fw={700} c="white">CUTTING</Text>
                                                        <Text size="xs" c="dimmed" lh={1.2} mt={4}>Reveal muscle detail</Text>
                                                    </Paper>
                                                </Grid.Col>
                                                <Grid.Col span={6}>
                                                    <Paper
                                                        p="xm"
                                                        onClick={() => handleNextGoal('muscle-gain')} // Self-ref logic tweak for "Advanced"
                                                        style={{
                                                            background: 'rgba(255,255,255,0.05)',
                                                            borderRadius: 12,
                                                            cursor: 'pointer',
                                                            border: '1px solid transparent',
                                                            transition: 'all 0.2s',
                                                            textAlign: 'center'
                                                        }}
                                                    >
                                                        <Dumbbell size={24} color="#f472b6" style={{ marginBottom: 8 }} />
                                                        <Text size="xs" fw={700} c="white">STRENGTH</Text>
                                                        <Text size="xs" c="dimmed" lh={1.2} mt={4}>Lift heavier</Text>
                                                    </Paper>
                                                </Grid.Col>
                                            </>
                                        )}
                                        {goal === 'toning' && (
                                            <>
                                                <Grid.Col span={6}>
                                                    <Paper
                                                        p="xm"
                                                        onClick={() => handleNextGoal('muscle-gain')}
                                                        style={{
                                                            background: 'rgba(255,255,255,0.05)',
                                                            borderRadius: 12,
                                                            cursor: 'pointer',
                                                            border: '1px solid transparent',
                                                            transition: 'all 0.2s',
                                                            textAlign: 'center'
                                                        }}
                                                    >
                                                        <TrendingUp size={24} color="#38bdf8" style={{ marginBottom: 8 }} />
                                                        <Text size="xs" fw={700} c="white">ADD MUSCLE</Text>
                                                        <Text size="xs" c="dimmed" lh={1.2} mt={4}>More volume</Text>
                                                    </Paper>
                                                </Grid.Col>
                                                <Grid.Col span={6}>
                                                    <Paper
                                                        p="xm"
                                                        onClick={() => handleNextGoal('weight-loss')}
                                                        style={{
                                                            background: 'rgba(255,255,255,0.05)',
                                                            borderRadius: 12,
                                                            cursor: 'pointer',
                                                            border: '1px solid transparent',
                                                            transition: 'all 0.2s',
                                                            textAlign: 'center'
                                                        }}
                                                    >
                                                        <TrendingDown size={24} color="#fb923c" style={{ marginBottom: 8 }} />
                                                        <Text size="xs" fw={700} c="white">LEAN OUT</Text>
                                                        <Text size="xs" c="dimmed" lh={1.2} mt={4}>Max shreds</Text>
                                                    </Paper>
                                                </Grid.Col>
                                            </>
                                        )}
                                    </Grid>
                                </Box>
                            </Stack>
                        </Grid.Col>
                    </Grid>
                )}
            </Modal>
        </Container >
    )
}

