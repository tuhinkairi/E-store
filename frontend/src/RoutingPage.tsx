import { Route, Routes } from 'react-router-dom'
import Home from './endpoints/home/Home'
import ProductListing from './endpoints/shop/product/ProductsListing'
import AboutUs from './endpoints/about/AboutUs'
import AtelierPage from './endpoints/about/Atelier'
import ContactUs from './endpoints/contact/ContactUs'

function RoutingPage() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/collections' element={<ProductListing/>}/>
      <Route path='/about-us' element={<AboutUs/>}/>
      <Route path='/atelier' element={<AtelierPage/>}/>
      <Route path='/contact-us' element={<ContactUs/>}/>
    </Routes>
  )
}

export default RoutingPage
