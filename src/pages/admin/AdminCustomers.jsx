import {
    Title, Paper, Text, Stack, Group, Table, Badge, ActionIcon, Avatar,
    TextInput, Button, Pagination
} from '@mantine/core'
import { Search, Mail, Phone, MoreVertical, UserPlus } from 'lucide-react'

const mockCustomers = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', joined: 'Oct 24, 2024', spent: '$1,240', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob.smith@test.com', joined: 'Nov 02, 2024', spent: '$850', status: 'Active' },
    { id: 3, name: 'Charlie Brown', email: 'charlie.b@domain.com', joined: 'Dec 15, 2024', spent: '$45', status: 'Inactive' },
    { id: 4, name: 'Diana Prince', email: 'diana@themyscira.net', joined: 'Jan 05, 2025', spent: '$3,500', status: 'VIP' },
    { id: 5, name: 'Evan Wright', email: 'evan.w@example.com', joined: 'Feb 10, 2025', spent: '$120', status: 'Active' },
]

export default function AdminCustomers() {
    return (
        <Stack gap="lg">
            <Group justify="space-between">
                <div>
                    <Title order={2}>Customer Management</Title>
                    <Text c="dimmed">View and manage your registered users</Text>
                </div>
                <Button leftSection={<UserPlus size={18} />} color="orange" variant="light">
                    Add Customer
                </Button>
            </Group>

            <Paper className="glass-card" p="md" radius="md">
                <Group mb="md">
                    <TextInput
                        placeholder="Search by name or email..."
                        leftSection={<Search size={16} />}
                        style={{ flex: 1 }}
                    />
                </Group>

                <Table verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Customer</Table.Th>
                            <Table.Th>Contact</Table.Th>
                            <Table.Th>Joined Date</Table.Th>
                            <Table.Th>Total Spent</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th></Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {mockCustomers.map((user) => (
                            <Table.Tr key={user.id}>
                                <Table.Td>
                                    <Group gap="sm">
                                        <Avatar color="initials" name={user.name} radius="xl">{user.name.charAt(0)}</Avatar>
                                        <Text size="sm" fw={500}>{user.name}</Text>
                                    </Group>
                                </Table.Td>
                                <Table.Td>
                                    <Group gap="xs">
                                        <Mail size={14} color="gray" />
                                        <Text size="sm" c="dimmed">{user.email}</Text>
                                    </Group>
                                </Table.Td>
                                <Table.Td>{user.joined}</Table.Td>
                                <Table.Td fw={700}>{user.spent}</Table.Td>
                                <Table.Td>
                                    <Badge
                                        color={user.status === 'VIP' ? 'grape' : user.status === 'Active' ? 'green' : 'gray'}
                                        variant="light"
                                    >
                                        {user.status}
                                    </Badge>
                                </Table.Td>
                                <Table.Td>
                                    <ActionIcon variant="subtle" color="gray">
                                        <MoreVertical size={16} />
                                    </ActionIcon>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>

                <Group justify="center" mt="xl">
                    <Pagination total={5} color="orange" />
                </Group>
            </Paper>
        </Stack>
    )
}
