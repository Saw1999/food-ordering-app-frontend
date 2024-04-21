import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './layouts/Layout'
import { Home } from './pages/Home'
import { AuthZeroProvider } from './auth/AuthZeroProvider'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthCallBack } from './pages/AuthCallback'
import { UserProfile } from './pages/UserProfile'
import { Toaster } from 'sonner'
import { ProtectedRoute } from './auth/ProtectedRoute'
import { ManageRestaurant } from './pages/ManageRestaurant'
import { Search } from './pages/Search'
import { RestaurantDetails } from './pages/RestaurantDetails'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthZeroProvider>

          <Routes>
            <Route path='/' element={<Layout showHero><Home /></Layout>} />
            <Route path='/auth-callback' element={<AuthCallBack />} />
            <Route path='/search/:city' element={<Layout showHero={false}><Search /></Layout>} />
            <Route path='/details/:restaurantId' element={<Layout showHero={false}><RestaurantDetails /></Layout>} />
            
            <Route element={<ProtectedRoute />}>
              <Route path='/user-profile' element={<Layout><UserProfile /></Layout>} />
              <Route path='/manage-restaurant' element={<Layout><ManageRestaurant /></Layout>} />
            </Route>
           
          </Routes>

          <Toaster visibleToasts={1} position='top-right' richColors/>

        </AuthZeroProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
