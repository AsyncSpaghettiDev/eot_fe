// Components
import { NavBar } from '../../Components/NavBar';

// Imports
import { Outlet } from 'react-router-dom';

export const Dashboard = () => {
    // Render Section
    return (
        <main className="dashboard">
            <NavBar noBack />
            <Outlet />
        </main>
    )
}
