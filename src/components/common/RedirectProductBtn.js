import React from 'react'

export default function RedirectProductBtn(props) {
  return (
      <a href={props.product} className='font-serif text-lg hover:border-2 p-2 inline-block'>View Product </a>
  )
}
