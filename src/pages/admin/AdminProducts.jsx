import { useState, useRef } from 'react'
import {
    Title, Paper, Text, Stack, Button, Group, Table, Badge, ActionIcon,
    TextInput, Select, Modal, Image, FileButton
} from '@mantine/core'
import { Plus, Search, Pencil, Trash, Filter, Download, Upload } from 'lucide-react'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { equipment } from '../../data/data'
import * as XLSX from 'xlsx'

export default function AdminProducts() {
    const [opened, { open, close }] = useDisclosure(false)
    const [products, setProducts] = useState(equipment)
    const [searchTerm, setSearchTerm] = useState('')
    const resetRef = useRef(null)

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== id))
            notifications.show({ title: 'Product Deleted', color: 'red' })
        }
    }

    // --- EXPORT TO EXCEL ---
    const handleExport = () => {
        // Prepare data for Excel
        const exportData = products.map(p => ({
            ID: p.id,
            Name: p.name,
            Category: p.category,
            Price: p.price,
            Description: p.description || '',
            Image: p.image || ''
        }))

        // Create worksheet and workbook
        const ws = XLSX.utils.json_to_sheet(exportData)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Products')

        // Download file
        XLSX.writeFile(wb, 'fitvision_products.xlsx')
        notifications.show({
            title: 'Export Successful',
            message: 'Products downloaded as Excel file',
            color: 'green'
        })
    }

    // --- IMPORT FROM EXCEL ---
    const handleImport = (file) => {
        if (!file) return

        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result)
                const workbook = XLSX.read(data, { type: 'array' })

                // Get first sheet
                const sheetName = workbook.SheetNames[0]
                const worksheet = workbook.Sheets[sheetName]

                // Convert to JSON
                const jsonData = XLSX.utils.sheet_to_json(worksheet)

                // Map to product format
                const importedProducts = jsonData.map((row, index) => ({
                    id: row.ID || products.length + index + 1,
                    name: row.Name || 'Unnamed Product',
                    category: row.Category || 'accessories',
                    price: row.Price || '$0.00',
                    description: row.Description || '',
                    image: row.Image || 'https://placehold.co/400x300'
                }))

                // Merge with existing products (replace if same ID, add if new)
                const existingIds = new Set(products.map(p => p.id))
                const newProducts = importedProducts.filter(p => !existingIds.has(p.id))
                const updatedProducts = products.map(p => {
                    const imported = importedProducts.find(ip => ip.id === p.id)
                    return imported || p
                })

                setProducts([...updatedProducts, ...newProducts])
                notifications.show({
                    title: 'Import Successful',
                    message: `Imported ${importedProducts.length} products from Excel`,
                    color: 'green'
                })
            } catch (error) {
                notifications.show({
                    title: 'Import Failed',
                    message: 'Invalid Excel file format. Please use the correct template.',
                    color: 'red'
                })
            }
        }
        reader.readAsArrayBuffer(file)
        resetRef.current?.()
    }

    return (
        <Stack gap="lg">
            <Group justify="space-between">
                <div>
                    <Title order={2}>Product Management</Title>
                    <Text c="dimmed">Manage your store inventory and catalog</Text>
                </div>
                <Group>
                    <Button
                        variant="light"
                        color="green"
                        leftSection={<Download size={18} />}
                        onClick={handleExport}
                    >
                        Export Excel
                    </Button>
                    <FileButton
                        resetRef={resetRef}
                        onChange={handleImport}
                        accept=".xlsx,.xls,.csv"
                    >
                        {(props) => (
                            <Button
                                variant="light"
                                color="blue"
                                leftSection={<Upload size={18} />}
                                {...props}
                            >
                                Import Excel
                            </Button>
                        )}
                    </FileButton>
                    <Button leftSection={<Plus size={18} />} color="orange" onClick={open}>
                        Add Product
                    </Button>
                </Group>
            </Group>

            <Paper className="glass-card" p="md" radius="md">
                <Group mb="md">
                    <TextInput
                        placeholder="Search products..."
                        leftSection={<Search size={16} />}
                        style={{ flex: 1 }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.currentTarget.value)}
                    />
                    <Button variant="light" color="gray" leftSection={<Filter size={16} />}>Filter</Button>
                </Group>

                <Table verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Product</Table.Th>
                            <Table.Th>Category</Table.Th>
                            <Table.Th>Price</Table.Th>
                            <Table.Th>Stock Status</Table.Th>
                            <Table.Th>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {filteredProducts.map((item) => (
                            <Table.Tr key={item.id}>
                                <Table.Td>
                                    <Group gap="sm">
                                        <Image
                                            src={item.image}
                                            w={40}
                                            h={40}
                                            radius="sm"
                                            fallbackSrc="https://placehold.co/40x40"
                                        />
                                        <Text size="sm" fw={500}>{item.name}</Text>
                                    </Group>
                                </Table.Td>
                                <Table.Td>
                                    <Badge variant="dot" color="blue">{item.category}</Badge>
                                </Table.Td>
                                <Table.Td fw={700}>{item.price}</Table.Td>
                                <Table.Td>
                                    <Badge color="green" variant="light">In Stock</Badge>
                                </Table.Td>
                                <Table.Td>
                                    <Group gap={4}>
                                        <ActionIcon variant="subtle" color="blue">
                                            <Pencil size={16} />
                                        </ActionIcon>
                                        <ActionIcon variant="subtle" color="red" onClick={() => handleDelete(item.id)}>
                                            <Trash size={16} />
                                        </ActionIcon>
                                    </Group>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Paper>

            {/* Add Product Modal */}
            <Modal opened={opened} onClose={close} title="Add New Product" centered>
                <Stack>
                    <TextInput label="Product Name" placeholder="e.g., Pro Dumbbells" />
                    <Group grow>
                        <Select label="Category" data={['Weights', 'Cardio', 'Accessories']} defaultValue="Weights" />
                        <TextInput label="Price" placeholder="$0.00" />
                    </Group>
                    <Text size="sm" fw={500}>Item Image URL</Text>
                    <TextInput placeholder="https://..." />
                    <Button fullWidth mt="md" color="orange" onClick={() => {
                        notifications.show({ title: 'Success', message: 'Product created successfully', color: 'green' })
                        close()
                    }}>
                        Create Product
                    </Button>
                </Stack>
            </Modal>
        </Stack>
    )
}
