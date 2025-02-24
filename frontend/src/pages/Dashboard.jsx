import { Outlet, useSearchParams } from 'react-router'
import Header from '../components/Header'

const Dashboard = () => {
  return (
    <>
      <div className='mb-4'>
        <Header dashboard={true} />
      </div>
      <Outlet />
    </>
  )
}

export default Dashboard
