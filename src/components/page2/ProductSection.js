import Card from '../supporting/Card'

export default function ProductSection(props) {
  return (
    <div>
      <Card url="https://images.squarespace-cdn.com/content/v1/624b503ba3713919d9f4256c/1649102909887-XSUGAML3DBL2LFBU7H8L/2015-07-31-leather-model-03-0090-v2-FINAL-copy.jpg?format=1000w" product="/"/>
      <div className='grid justify-center items-center space-y-3 text-center text-sm mt-5'>
        <h1 className='bold font-serif text-xl'>{props.product_name}</h1>
        <h1>{props.price}$</h1>
        <h1  className='status'>Sold Out</h1>
      </div>
    </div>
  )
}
