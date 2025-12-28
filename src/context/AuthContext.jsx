import { createContext, useContext, useState, useEffect } from 'react'

// Mock user data
const mockUsers = [
    { id: 1, email: 'demo@fitvision.ai', password: 'demo123', name: 'Demo User', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    { id: 2, email: 'john@example.com', password: 'john123', name: 'John Wick', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
]

// Mock orders data
const mockOrders = [
    {
        id: 'ORD-001', userId: 1, date: '2024-10-24', status: 'Delivered', total: '$149.99', items: [
            { name: 'Resistance Bands Set', quantity: 1, price: '$29.00', image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=100' },
            { name: 'Yoga Mat Premium', quantity: 2, price: '$45.00', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=100' },
        ]
    },
    {
        id: 'ORD-002', userId: 1, date: '2024-10-20', status: 'Processing', total: '$299.00', items: [
            { name: 'Adjustable Dumbbells', quantity: 1, price: '$299.00', image: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=100' },
        ]
    },
    {
        id: 'ORD-003', userId: 1, date: '2024-10-15', status: 'Delivered', total: '$85.50', items: [
            { name: 'Foam Roller', quantity: 1, price: '$35.00', image: 'https://images.unsplash.com/photo-1647014774031-53e2c43f6dd2?w=100' },
            { name: 'Smart Jump Rope', quantity: 2, price: '$25.00', image: 'https://images.unsplash.com/photo-1515775054133-0a68214921d4?w=100' },
        ]
    },
]

// Mock cart data
const mockCart = [
    { id: 1, name: 'Kettlebell Set', price: '$149.00', quantity: 1, image: 'https://images.unsplash.com/photo-1517343985841-f8b2d66e010b?w=100' },
    { id: 2, name: 'Massage Gun Pro', price: '$199.00', quantity: 1, image: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=100' },
]

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [cart, setCart] = useState([])
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // Check for saved session on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('fitvision_user')
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser)
            setUser(parsedUser)
            setOrders(mockOrders.filter(o => o.userId === parsedUser.id))
            setCart(mockCart)
        }
        setIsLoading(false)
    }, [])

    const login = (email, password) => {
        const foundUser = mockUsers.find(u => u.email === email && u.password === password)
        if (foundUser) {
            const userData = { id: foundUser.id, email: foundUser.email, name: foundUser.name, avatar: foundUser.avatar }
            setUser(userData)
            setOrders(mockOrders.filter(o => o.userId === foundUser.id))
            setCart(mockCart)
            localStorage.setItem('fitvision_user', JSON.stringify(userData))
            return { success: true }
        }
        return { success: false, error: 'Invalid email or password' }
    }

    const signup = (name, email, password) => {
        const exists = mockUsers.find(u => u.email === email)
        if (exists) {
            return { success: false, error: 'Email already registered' }
        }
        const newUser = {
            id: mockUsers.length + 1,
            email,
            password,
            name,
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'
        }
        mockUsers.push(newUser)
        const userData = { id: newUser.id, email: newUser.email, name: newUser.name, avatar: newUser.avatar }
        setUser(userData)
        setOrders([])
        setCart([])
        localStorage.setItem('fitvision_user', JSON.stringify(userData))
        return { success: true }
    }

    const logout = () => {
        setUser(null)
        setOrders([])
        setCart([])
        localStorage.removeItem('fitvision_user')
    }

    const addToCart = (item) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id)
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
            }
            return [...prev, { ...item, quantity: 1 }]
        })
    }

    const removeFromCart = (itemId) => {
        setCart(prev => prev.filter(i => i.id !== itemId))
    }

    const updateCartQuantity = (itemId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(itemId)
        } else {
            setCart(prev => prev.map(i => i.id === itemId ? { ...i, quantity } : i))
        }
    }

    const getOrderById = (orderId) => {
        return orders.find(o => o.id === orderId)
    }

    return (
        <AuthContext.Provider value={{
            user,
            cart,
            orders,
            isLoading,
            login,
            signup,
            logout,
            addToCart,
            removeFromCart,
            updateCartQuantity,
            getOrderById
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
