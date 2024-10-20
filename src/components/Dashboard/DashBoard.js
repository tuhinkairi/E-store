import React from 'react'
import ProfileInfo from './dashboard/ProfileInfo'
import Options from './dashboard/Options'

export default function Dashboard() {
  return (
    <div className='px-10  grid grid-cols-4 items-start justify-center gap-5'>
      <aside className='options grid gap-5'>

      <ProfileInfo/>
      <Options/>
      </aside>
      <div className='deatiled_options col-span-3'>

      </div>
    </div>
  )
}
