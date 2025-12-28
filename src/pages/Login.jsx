import { useState } from 'react'
import {
    Paper, Title, Text, TextInput, PasswordInput, Button, Stack, Group,
    Anchor, Divider, Center, Box, Tabs
} from '@mantine/core'
import { Mail, Lock, User, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { notifications } from '@mantine/notifications'

export default function Login() {
    const [activeTab, setActiveTab] = useState('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { login, signup } = useAuth()

    const handleLogin = async () => {
        if (!email || !password) {
            notifications.show({ title: 'Error', message: 'Please fill all fields', color: 'red' })
            return
        }
        setLoading(true)
        const result = login(email, password)
        setLoading(false)

        if (result.success) {
            notifications.show({ title: 'Welcome back!', message: 'Login successful', color: 'green' })
            navigate('/account')
        } else {
            notifications.show({ title: 'Login Failed', message: result.error, color: 'red' })
        }
    }

    const handleSignup = async () => {
        if (!name || !email || !password) {
            notifications.show({ title: 'Error', message: 'Please fill all fields', color: 'red' })
            return
        }
        setLoading(true)
        const result = signup(name, email, password)
        setLoading(false)

        if (result.success) {
            notifications.show({ title: 'Account Created!', message: 'Welcome to FitVision AI', color: 'green' })
            navigate('/account')
        } else {
            notifications.show({ title: 'Signup Failed', message: result.error, color: 'red' })
        }
    }

    return (
        <Center style={{ minHeight: 'calc(100vh - 120px)' }}>
            <Paper className="glass-card" p="xl" radius="lg" w={400}>
                <Center mb="lg">
                    <Group gap="xs">
                        <Box
                            style={{
                                width: 48,
                                height: 48,
                                background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #ec4899 100%)',
                                borderRadius: 12,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Zap size={28} color="white" />
                        </Box>
                    </Group>
                </Center>

                <Title order={2} ta="center" mb="xs">
                    Welcome to FitVision<span className="gradient-text">AI</span>
                </Title>
                <Text c="dimmed" ta="center" mb="lg">
                    Your AI-powered fitness journey starts here
                </Text>

                <Tabs value={activeTab} onChange={setActiveTab} color="violet">
                    <Tabs.List grow mb="md">
                        <Tabs.Tab value="login">Sign In</Tabs.Tab>
                        <Tabs.Tab value="signup">Sign Up</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="login">
                        <Stack>
                            <TextInput
                                label="Email"
                                placeholder="your@email.com"
                                leftSection={<Mail size={16} />}
                                value={email}
                                onChange={(e) => setEmail(e.currentTarget.value)}
                            />
                            <PasswordInput
                                label="Password"
                                placeholder="Your password"
                                leftSection={<Lock size={16} />}
                                value={password}
                                onChange={(e) => setPassword(e.currentTarget.value)}
                            />
                            <Group justify="space-between" mt="xs">
                                <Anchor size="sm" c="violet">Forgot password?</Anchor>
                            </Group>
                            <Button
                                fullWidth
                                mt="md"
                                color="violet"
                                loading={loading}
                                onClick={handleLogin}
                            >
                                Sign In
                            </Button>

                            <Text size="xs" c="dimmed" ta="center" mt="sm">
                                Demo: demo@fitvision.ai / demo123
                            </Text>
                        </Stack>
                    </Tabs.Panel>

                    <Tabs.Panel value="signup">
                        <Stack>
                            <TextInput
                                label="Full Name"
                                placeholder="John Doe"
                                leftSection={<User size={16} />}
                                value={name}
                                onChange={(e) => setName(e.currentTarget.value)}
                            />
                            <TextInput
                                label="Email"
                                placeholder="your@email.com"
                                leftSection={<Mail size={16} />}
                                value={email}
                                onChange={(e) => setEmail(e.currentTarget.value)}
                            />
                            <PasswordInput
                                label="Password"
                                placeholder="Create a password"
                                leftSection={<Lock size={16} />}
                                value={password}
                                onChange={(e) => setPassword(e.currentTarget.value)}
                            />
                            <Button
                                fullWidth
                                mt="md"
                                color="violet"
                                loading={loading}
                                onClick={handleSignup}
                            >
                                Create Account
                            </Button>
                        </Stack>
                    </Tabs.Panel>
                </Tabs>

                <Divider label="or continue with" labelPosition="center" my="lg" />

                <Group grow>
                    <Button variant="default" disabled>Google</Button>
                    <Button variant="default" disabled>Apple</Button>
                </Group>
            </Paper>
        </Center>
    )
}
