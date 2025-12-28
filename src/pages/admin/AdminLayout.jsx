import { useState } from 'react'
import {
    AppShell,
    Group,
    ActionIcon,
    useMantineColorScheme,
    Box,
    Text,
    NavLink,
    Title,
    Burger,
    Avatar,
    Menu,
    rem
} from '@mantine/core'
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    ShoppingCart,
    Settings,
    LogOut,
    Sun,
    Moon,
    Zap,
    Search,
    Bell
} from 'lucide-react'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { useDisclosure } from '@mantine/hooks'

const adminNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: ShoppingBag, label: 'Products', path: '/admin/products' },
    { icon: Users, label: 'Customers', path: '/admin/customers' },
    { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
]

export default function AdminLayout() {
    const [opened, { toggle }] = useDisclosure()
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <AppShell
            header={{ height: 70 }}
            navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
            styles={{
                main: {
                    background: '#0a0a0f', // Force dark background
                    color: 'white',
                    minHeight: '100vh',
                },
                header: {
                    background: 'rgba(15, 15, 20, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                },
                navbar: {
                    background: 'rgba(15, 15, 20, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                }
            }}
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    <Group>
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color="white" />
                        <Group gap="xs" style={{ cursor: 'pointer' }} onClick={() => navigate('/admin')}>
                            <Box
                                style={{
                                    width: 32,
                                    height: 32,
                                    background: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
                                    borderRadius: 8,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Zap size={18} color="white" />
                            </Box>
                            <Text size="lg" fw={700} style={{ fontFamily: 'Outfit, sans-serif' }}>
                                FitVision <span style={{ color: '#f97316' }}>Admin</span>
                            </Text>
                        </Group>
                    </Group>
                    <Group>
                        <ActionIcon variant="subtle" color="gray">
                            <Search size={20} />
                        </ActionIcon>
                        <ActionIcon variant="subtle" color="gray">
                            <Bell size={20} />
                        </ActionIcon>
                        <ActionIcon
                            variant="subtle"
                            onClick={() => toggleColorScheme()}
                            color="gray"
                        >
                            {colorScheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </ActionIcon>
                        <Menu shadow="md" width={200}>
                            <Menu.Target>
                                <Avatar
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                                    radius="xl"
                                    style={{ cursor: 'pointer', border: '2px solid #f97316' }}
                                />
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Label>Administrator</Menu.Label>
                                <Menu.Item leftSection={<Settings size={14} />}>Settings</Menu.Item>
                                <Menu.Item leftSection={<Users size={14} />}>Team</Menu.Item>
                                <Menu.Divider />
                                <Menu.Item color="red" leftSection={<LogOut size={14} />} onClick={() => navigate('/')}>
                                    Exit Admin
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <Text size="xs" fw={500} c="dimmed" mb="sm" tt="uppercase">Menu</Text>
                {adminNavItems.map((item) => (
                    <NavLink
                        key={item.path}
                        label={item.label}
                        leftSection={<item.icon size={20} />}
                        active={location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))}
                        onClick={() => {
                            navigate(item.path)
                            toggle()
                        }}
                        style={{ borderRadius: 8, marginBottom: 4 }}
                        color="orange"
                        variant="light"
                    />
                ))}
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    )
}
