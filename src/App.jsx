import { Routes, Route } from 'react-router-dom'

// Layouts
import MainLayout from './layouts/MainLayout'
import AdminLayout from './pages/admin/AdminLayout'

// Pages
import HomePage from './pages/Home'
import SimulatorPage from './pages/Simulator'
import WorkoutsPage from './pages/Workouts'
import EquipmentPage from './pages/Equipment'
import NutritionPage from './pages/Nutrition'
import SchedulePage from './pages/Schedule'
import LoginPage from './pages/Login'
import AccountPage from './pages/Account'
import OrderDetailsPage from './pages/OrderDetails'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminCustomers from './pages/admin/AdminCustomers'
import AdminOrders from './pages/admin/AdminOrders'
import AdminSettings from './pages/admin/AdminSettings'

export default function App() {
    return (
        <Routes>
            {/* Admin Routes - Nested under /admin */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="customers" element={<AdminCustomers />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Main Application Routes - Wrapped in MainLayout */}
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="simulator" element={<SimulatorPage />} />
                <Route path="workouts" element={<WorkoutsPage />} />
                <Route path="equipment" element={<EquipmentPage />} />
                <Route path="nutrition" element={<NutritionPage />} />
                <Route path="schedule" element={<SchedulePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="account" element={<AccountPage />} />
                <Route path="order/:orderId" element={<OrderDetailsPage />} />
            </Route>
        </Routes>
    )
}
