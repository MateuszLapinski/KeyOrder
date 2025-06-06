import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IntranetLayout from './IntranetLayout';

import Dashboard from './Dashboard';
import Invoices from './Pages/Invoices';
import Orders from './Pages/Orders';
import Clients from './Pages/Clients';
import Products from './Pages/Products';
import CalendarPage from './Pages/Calendar';
import Users from './Pages/Users';
import 'react-big-calendar/lib/css/react-big-calendar.css';
/*import Reports from './Pages/Reports';*/

function App() {
    return (
        <Router>
            <IntranetLayout>
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/users" element={<Users />} />
                    
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/calendar" element={<CalendarPage />} />
                   
                </Routes>
            </IntranetLayout>
        </Router>
    );
}

export default App;
