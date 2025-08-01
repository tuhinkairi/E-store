import { Route, Routes } from 'react-router-dom'
import Home from './endpoints/home/Home'
import ProductListing from './endpoints/shop/product/ProductsListing'
import AboutUs from './endpoints/about/AboutUs'
import AtelierPage from './endpoints/about/Atelier'
import ContactUs from './endpoints/contact/ContactUs'
import UserDashboard from './endpoints/dashboard/user/UserDashboard'
import UserOnboarding from './endpoints/dashboard/useronboarding/UserOnboarding'
import LoginPage from './endpoints/dashboard/login/Login'

function RoutingPage() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/collections' element={<ProductListing/>}/>
      <Route path='/about-us' element={<AboutUs/>}/>
      <Route path='/atelier' element={<AtelierPage/>}/>
      <Route path='/contact-us' element={<ContactUs/>}/>
      <Route path='/onboarding' element={<UserOnboarding/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/dashboard' >
      <Route path="user" element={<UserDashboard/>}/>
      </Route>
    </Routes>
  )
}

export default RoutingPage
