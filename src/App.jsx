import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './utility.css';
import './components.css';

// Components
import AuthContext from './Utils/AuthContext'
import { RequireAuth } from './Components/RequireAuth';

// Pages
import { Menu } from './Pages/Menu';
import { Home } from './Pages/Home';
import { Login } from './Pages/Login';
import { Orders } from './Pages/Orders';
import { Creators } from './Pages/Creators';
import { NotFound } from './Pages/NotFound';
import { Order } from './Pages/Order';
import { Employees } from './Pages/Employees';
import { Dashboard } from './Pages/Dashboard';
import { TableDetail } from './Pages/TableDetail';
import { TableDashboard } from './Pages/TableDashboard';

const App = () => {
    // Hooks
    const [authContextApi, setAuthContextApi] = useState({
        auth: false,
        username: null,
        role: null
    });

    // On reload
    useEffect(() => {
        fetch('https://eotapp.alwaysdata.net/api/auth/', {
            credentials: 'include'
        }).then(res => res.json()).then(data => {
            setAuthContextApi({
                auth: data.auth,
                username: data.user,
                role: data.role
            })
        })
    }, [])

    return (
        <AuthContext.Provider value={{ authContextApi, setAuthContextApi }} >
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/dashboard' element={<Dashboard />} >
                        <Route index element={
                            <RequireAuth requiredRole={['ADMIN', 'EMPLOYEE']}>
                                <TableDashboard />
                            </RequireAuth>
                        } />
                        <Route path='details/:tableID' element={<TableDetail />} />
                    </Route>
                    <Route path='/order' element={<Order />} />
                    <Route path='/menu' element={<Menu />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/employees' element={
                        <RequireAuth requiredRole={['ADMIN']}>
                            <Employees />
                        </RequireAuth>}
                    />
                    <Route path='/orders' element={
                        <RequireAuth requiredRole={['ADMIN', 'CHEF']}>
                            <Orders />
                        </RequireAuth>}
                    />
                    <Route path='/about' element={<Creators />} />
                    <Route path='/error' element={<NotFound />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter >
        </AuthContext.Provider>
    )
}

export default App;