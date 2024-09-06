import '../assets/styles/Dasboard.css';
import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/img/dragones-blanco.png';
import menuIcon from '../assets/img/menuIcon.svg';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { logoutUser } from '../store/authActions';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();

  // Verificar si la ruta es la actual para asignar la clase active
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()) // Esperar el resultado del logout
      navigate('/'); // Navegar a la página de inicio si es exitoso
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="dashboard__container w-full">
      <div className="dashboard__container d-flex w-full">
        {/* Sidebar */}
        <div className="d-none d-md-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: '280px' }}>
          <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span className="fs-4"><img src={logo} alt="Dragones" width={100} /></span>
          </Link>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${isActive('/') ? 'active' : 'text-white'}`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="galeriapanel" className={`nav-link ${isActive('/dashboard/galeriapanel') ? 'active' : 'text-white'}`}>
                Galeria
              </Link>
            </li>
            <li>
              <Link to="eventospanel" className={`nav-link ${isActive('/dashboard/eventospanel') ? 'active' : 'text-white'}`}>
                Eventos
              </Link>
            </li>
            <li>
              <Link to="noticiaspanel" className={`nav-link ${isActive('/dashboard/noticiaspanel') ? 'active' : 'text-white'}`}>
                Noticias
              </Link>
            </li>
            <li>
              <Link to="organigramapanel" className={`nav-link ${isActive('/dashboard/organigramapanel') ? 'active' : 'text-white'}`}>
                Organigrama
              </Link>
            </li>
          </ul>
          <hr />
          <button className="btn bg-white" onClick={handleLogout}>Cerrar sesión</button>
        </div>

        {/* Main content */}
        <main className="flex-grow-1 ms-sm-auto px-md-4">
          <nav className="d-block d-md-none navbar navbar-expand-lg text-bg-dark ">
            <div className="container-fluid text-white">
              <Link className="navbar-brand" to="/"><img src={logo} alt="Dragones" width={70} /></Link>
              <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <img src={menuIcon} alt="menu" width={20} />
              </button>
              <div className="collapse navbar-collapse text-white" id="navbarNavAltMarkup">
                <div className="navbar-nav text-white">
                  <Link className={`nav-link ${isActive('/') ? 'active' : 'text-white'}`} to="/">Home</Link>
                  <Link className={`nav-link ${isActive('/dashboard/galeriapanel') ? 'active' : 'text-white'}`} to="galeriapanel">Galeria</Link>
                  <Link className={`nav-link ${isActive('/dashboard/eventospanel') ? 'active' : 'text-white'}`} to="eventospanel">Eventos</Link>
                  <Link className={`nav-link ${isActive('/dashboard/noticiaspanel') ? 'active' : 'text-white'}`} to="noticiaspanel">Noticias</Link>
                  <Link className={`nav-link ${isActive('/dashboard/organigramapanel') ? 'active' : 'text-white'}`} to="organigramapanel">Organigrama</Link>
                </div>
              </div>
            </div>
          </nav>

          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Panel administrador</h1>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
