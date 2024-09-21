import React from 'react'
import ProductSection from './ProductSection'

export default function ProductDisplay() {
  return (
    <section className='ProductDisplay grid justify-center items-center sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 lg:gap-16  px-5 sm:px-10 lg:px-20'>
        
        <ProductSection product_name="Anything" price={45} status={1}/>
        <ProductSection product_name="Anything" price={45} status={1}/>
        <ProductSection product_name="Anything" price={45} status={1}/>
        <ProductSection product_name="Anything" price={45} status={1}/>
        <ProductSection product_name="Anything" price={45} status={1}/>
        <ProductSection product_name="Anything" price={45} status={1}/>
        <ProductSection product_name="Anything" price={45} status={1}/>
        <ProductSection product_name="Anything" price={45} status={1}/>
        <ProductSection product_name="Anything" price={45} status={1}/>
        <ProductSection product_name="Anything" price={45} status={1}/>
        
    </section>

  )
}
