import React from 'react'
import Card from './Card'

export default function CardShow() {
  return (
    <div className='grid grid-cols-2  justify-around items-start p-2 md:p-6 lg:p-16 gap-2 md:gap-6 lg:gap-16 mb-8 md:mb-0'>
      <div className='flex flex-wrap gap-2 md:gap-6 lg:gap-16'>

      <Card url="https://images.squarespace-cdn.com/content/v1/624b503ba3713919d9f4256c/1649102909821-XEKAJ0UNGX6IIN26KM74/2015-07-31-leather-model-06-0041-v3-FINAL-copy.jpg?format=1000w"/>
      <Card url="https://images.squarespace-cdn.com/content/v1/624b503ba3713919d9f4256c/1649102909887-XSUGAML3DBL2LFBU7H8L/2015-07-31-leather-model-03-0090-v2-FINAL-copy.jpg?format=1000w"/>
      </div>
      <div className='flex flex-wrap gap-2 md:gap-6 lg:gap-16'>

      <Card url="https://images.squarespace-cdn.com/content/v1/624b503ba3713919d9f4256c/1649102909876-2NI1BC894GBWIXD3I2MJ/2015-07-31-leather-model-06-0127-v3-FINAL.jpg?format=1000w"/>
      <Card url="https://images.squarespace-cdn.com/content/v1/624b503ba3713919d9f4256c/1649102909898-9NAYDGMPRDBMGYY13VUT/2015-07-31-leather-model-02-0046-v3-FINAL-copy.jpg?format=1000w"/>
      <Card url="https://images.squarespace-cdn.com/content/v1/624b503ba3713919d9f4256c/1649102909832-Z1S1ZQPEJVFMVR9JTJFN/2015-07-31-leather-model-01-0081-v3-FINAL-copy.jpg?format=1000w"/>

      </div>
    </div>
  )
}
