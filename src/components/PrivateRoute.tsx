import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../store';

const PrivateRoute: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth); // Verifica si hay usuario autenticado
  
    return user ? <Outlet /> : <Navigate to="/" />; // Redirige si no está autenticado
  };
  
  export default PrivateRoute;