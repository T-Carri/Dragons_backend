import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import DasboardInicio from './components/Dasboard';
import Galeria from './components/Dasboard/Galeria';
import Eventos from './components/Dasboard/Eventos';
import Noticias from './components/Dasboard/Noticias';
import Organigrama from './components/Dasboard/Organigrama';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route element={<PrivateRoute/>}>
        
        <Route path="/dashboard" element={<Dashboard />} >
       <Route index element={<DasboardInicio/>}/>
       <Route path="galeriapanel" element={<Galeria/>}/>
       <Route path="eventospanel" element={<Eventos/>}/>
       <Route path="noticiaspanel" element={<Noticias/>}/>
       <Route path="organigramapanel" element={<Organigrama/>}/>
       
        </Route>

        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;