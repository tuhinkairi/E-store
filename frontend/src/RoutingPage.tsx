import { Route, Routes } from 'react-router-dom'
import Home from './endpoints/home/Home'
import ProductListing from './endpoints/shop/product/ProductsListing'
import AboutUs from './endpoints/about/AboutUs'
import AtelierPage from './endpoints/about/Atelier'
import ContactUs from './endpoints/contact/ContactUs'
import UserDashboard from './endpoints/dashboard/user/UserDashboard'
import UserOnboarding from './endpoints/dashboard/useronboarding/UserOnboarding'
import LoginPage from './endpoints/dashboard/login/Login'
import NotFoundPage from './components/fallback/NotFoundPage'
import PlaceOrderSection from './endpoints/shop/placeorder/PlaceOrderSection'
import ProductDetail from './endpoints/shop/product-show/ProductDetail'

function RoutingPage() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about-us' element={<AboutUs />} />
      <Route path='/atelier' element={<AtelierPage />} />
      <Route path='/contact-us' element={<ContactUs />} />
      <Route path='/onboarding' element={<UserOnboarding />} />
      <Route path='/collections'>
        <Route index element={<ProductListing />} />
        <Route path=':id' element={<ProductDetail />} />
        <Route path=':id/place-order' element={<PlaceOrderSection />} />
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/dashboard' >
        <Route index element={<UserDashboard />} />
        <Route path="user" element={<UserDashboard />} />
      </Route>
      {/* <Route path="/404" element={<NotFoundPage />} /> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default RoutingPage
