import {createBrowserRouter} from 'react-router-dom'
import Home from '../pages/home'
import MainLayout from '../layouts/main'
import Login from '../pages/login'
import Sign from '../pages/signup'
import Error404 from '../pages/error404'
import About from '../pages/about'
import Attribute from '../pages/attribute'
import Recommends from "../pages/recommends"
import Logout from "../pages/logout"
import Me from "../pages/me";


const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'login',
                element: <Login/>,
            },
            {
                path: 'sign',
                element: <Sign/>,
            },
            {
                path: 'me',
                element: <Me/>
            },
            {
                path: 'home',
                element: <Home />,
            },
            {
                path: 'about',
                element: <About/>,
            },
            {
                path: 'logout',
                element: <Logout/>,
            },
            {
                path: 'attribute',
                element: <Attribute/>
            },
            {
                path: 'recommends',
                element: <Recommends></Recommends>
            },
            
        ] 
    },
    {
        path: '*',
        element: <Error404/>
    }    
])


export default routes