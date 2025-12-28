import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { theme } from './theme'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/charts/styles.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <MantineProvider theme={theme} defaultColorScheme="dark">
                <AuthProvider>
                    <Notifications position="top-right" />
                    <App />
                </AuthProvider>
            </MantineProvider>
        </BrowserRouter>
    </React.StrictMode>
)
