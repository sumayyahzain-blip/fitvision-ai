import {
    Title, Paper, Text, Stack, TextInput, PasswordInput, Button, Group, Switch, Divider, Badge
} from '@mantine/core'
import { Save, Plug, Globe, DollarSign, ShoppingBag } from 'lucide-react'
import { notifications } from '@mantine/notifications'

export default function AdminSettings() {

    const handleSave = () => {
        notifications.show({
            title: 'Settings Saved',
            message: 'Your integration configurations have been updated.',
            color: 'green'
        })
    }

    return (
        <Stack gap="xl">
            <Title order={2}>Platform Settings</Title>

            <Group align="flex-start" grow>
                {/* E-commerce Integration */}
                <Paper className="glass-card" p="xl" radius="md">
                    <Group mb="md">
                        <ShoppingBag size={24} color="#8b5cf6" />
                        <Title order={4}>Shopify Integration</Title>
                        <Badge color="yellow">Beta</Badge>
                    </Group>
                    <Text c="dimmed" size="sm" mb="lg">
                        Connect your Shopify store to sync products and orders automatically.
                    </Text>

                    <Stack gap="md">
                        <TextInput
                            label="Store Domain"
                            placeholder="your-store.myshopify.com"
                            description="The URL of your Shopify store"
                        />
                        <PasswordInput
                            label="Storefront Access Token"
                            placeholder="shpat_..."
                            description="Found in Shopify Admin > Apps > Sales Channels"
                        />
                        <Switch
                            label="Sync Inventory Automatically"
                            defaultChecked
                            color="violet"
                        />
                    </Stack>
                </Paper>

                {/* Ads & Analytics */}
                <Paper className="glass-card" p="xl" radius="md">
                    <Group mb="md">
                        <DollarSign size={24} color="#10b981" />
                        <Title order={4}>Monetization & Ads</Title>
                    </Group>
                    <Text c="dimmed" size="sm" mb="lg">
                        Configure Google AdSense and Analytics tracking.
                    </Text>

                    <Stack gap="md">
                        <TextInput
                            label="Google AdSense Publisher ID"
                            placeholder="pub-xxxxxxxxxxxxxxxx"
                            leftSection={<Text size="xs" c="dimmed">ca-</Text>}
                        />
                        <TextInput
                            label="Google Analytics 4 ID"
                            placeholder="G-XXXXXXXXXX"
                        />
                        <Switch
                            label="Enable Auto-Ads"
                            description="Allow Google to place ads automatically"
                            color="green"
                        />
                    </Stack>
                </Paper>
            </Group>

            {/* General Settings */}
            <Paper className="glass-card" p="xl" radius="md">
                <Group mb="md">
                    <Globe size={24} color="#3b82f6" />
                    <Title order={4}>General Site Settings</Title>
                </Group>

                <Group grow>
                    <TextInput label="Site Name" defaultValue="FitVision AI" />
                    <TextInput label="Support Email" defaultValue="support@fitvision.ai" />
                </Group>
            </Paper>

            <Group justify="flex-end">
                <Button size="lg" leftSection={<Save size={18} />} color="orange" onClick={handleSave}>
                    Save Changes
                </Button>
            </Group>
        </Stack>
    )
}
