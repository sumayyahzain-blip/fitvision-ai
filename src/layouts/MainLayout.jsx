import { useState } from 'react'
import { AppShell, Burger, Group, NavLink, ActionIcon, Text, useMantineColorScheme, Box, Button, Avatar, Menu } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
    Home, Sparkles, Dumbbell, ShoppingBag, Calendar, Apple, Moon, Sun, Zap, User, LogOut, Settings
} from 'lucide-react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Sparkles, label: 'AI Simulator', path: '/simulator' },
    { icon: Dumbbell, label: 'Workouts', path: '/workouts' },
    { icon: ShoppingBag, label: 'Equipment', path: '/equipment' },
    { icon: Calendar, label: 'Schedule', path: '/schedule' },
    { icon: Apple, label: 'Nutrition', path: '/nutrition' },
]

export default function MainLayout() {
    const [opened, { toggle }] = useDisclosure()
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const navigate = useNavigate()
    const location = useLocation()
    const { user, logout } = useAuth()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <>
            {/* Background Effects */}
            <div className="bg-gradient"></div>
            <div className="bg-grid"></div>
            <div className="floating-orbs">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>
            </div>

            <AppShell
                header={{ height: 70 }}
                navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
                padding="md"
                styles={{
                    main: {
                        background: 'transparent',
                    },
                    header: {
                        background: 'rgba(10, 10, 15, 0.8)',
                        backdropFilter: 'blur(20px)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    },
                    navbar: {
                        background: 'rgba(10, 10, 15, 0.9)',
                        backdropFilter: 'blur(20px)',
                        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                    }
                }}
            >
                <AppShell.Header>
                    <Group h="100%" px="md" justify="space-between">
                        <Group>
                            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color="white" />
                            <Group gap="xs" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                                <Box
                                    style={{
                                        width: 40,
                                        height: 40,
                                        background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #ec4899 100%)',
                                        borderRadius: 12,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Zap size={22} color="white" />
                                </Box>
                                <Text size="xl" fw={700} style={{ fontFamily: 'Outfit, sans-serif' }}>
                                    FitVision<span className="gradient-text">AI</span>
                                </Text>
                            </Group>
                        </Group>
                        <Group>
                            <ActionIcon
                                variant="subtle"
                                size="lg"
                                onClick={() => toggleColorScheme()}
                                color="gray"
                            >
                                {colorScheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </ActionIcon>

                            {user ? (
                                <Menu shadow="md" width={200}>
                                    <Menu.Target>
                                        <Avatar
                                            src={user.avatar}
                                            radius="xl"
                                            style={{ cursor: 'pointer', border: '2px solid #8b5cf6' }}
                                        />
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Label>{user.name}</Menu.Label>
                                        <Menu.Item
                                            leftSection={<User size={14} />}
                                            onClick={() => navigate('/account')}
                                        >
                                            My Account
                                        </Menu.Item>
                                        <Menu.Item
                                            leftSection={<Settings size={14} />}
                                            onClick={() => navigate('/admin')}
                                        >
                                            Admin Panel
                                        </Menu.Item>
                                        <Menu.Divider />
                                        <Menu.Item
                                            color="red"
                                            leftSection={<LogOut size={14} />}
                                            onClick={handleLogout}
                                        >
                                            Sign Out
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            ) : (
                                <Button
                                    variant="filled"
                                    color="dark"
                                    radius="md"
                                    onClick={() => navigate('/login')}
                                    style={{
                                        backgroundColor: '#1a1a1a',
                                        border: '1px solid #333',
                                        fontWeight: 600
                                    }}
                                >
                                    LOG IN
                                </Button>
                            )}
                        </Group>
                    </Group>
                </AppShell.Header>

                <AppShell.Navbar p="md">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            label={item.label}
                            leftSection={<item.icon size={20} />}
                            active={location.pathname === item.path}
                            onClick={() => {
                                navigate(item.path)
                                toggle()
                            }}
                            style={{ borderRadius: 12, marginBottom: 4 }}
                            styles={{
                                root: {
                                    '&[data-active]': {
                                        backgroundColor: 'rgba(139, 92, 246, 0.15)',
                                        color: '#8b5cf6',
                                    }
                                }
                            }}
                        />
                    ))}
                </AppShell.Navbar>

                <AppShell.Main>
                    <Outlet />
                </AppShell.Main>
            </AppShell>
        </>
    )
}
