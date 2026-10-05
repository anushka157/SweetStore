import Footer from './lib/components/sections/Footer'
import Header from './lib/components/sections/Header/Header'
import Products from './lib/components/sections/products'
import Filter from './lib/components/sections/Filters'
import Pagination from './lib/components/buttons/Pagination'
import { Outlet } from 'react-router-dom'
export default function App() {
    return(
        <div className='font-sans  bg-background border'>

            <Outlet></Outlet>
            
        </div>
    )
}