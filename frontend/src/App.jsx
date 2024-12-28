import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import RutaProtegida from "./layout/RutaProtegida";

import Login from "./page/Login";
import Registrar from "./page/Registrar";
import Olvide from "./page/Olvide";
import Confirmar from "./page/Confirmar";
import NuevoPassword from "./page/NuevoPassword";
import AdministrarPacientes from "./page/AdministrarPacientes";
import EditarPerfil from "./page/EditarPerfil";
import CambiarPassword from "./page/CambiaPassword";

import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacienteProvider";

function App() {
   return (
      <BrowserRouter>
         <AuthProvider>
            <PacientesProvider>
               <Routes>
                  <Route path="/" element={ <AuthLayout /> }>
                     <Route index element={ <Login /> } />
                     <Route path="registrar" element={ <Registrar /> } />
                     <Route path="olvide" element={ <Olvide /> } />
                     <Route path="olvide/:token" element={ <NuevoPassword /> } />
                     <Route path="confirmar/:id" element={ <Confirmar /> } />
                  </Route>
            
                  <Route path="/admin" element={ <RutaProtegida /> }>
                     <Route index element={ <AdministrarPacientes /> } />
                     <Route path="perfil" element={ <EditarPerfil /> } />
                     <Route path="cambiar-password" element={ <CambiarPassword /> } />
                  </Route>
               </Routes>
            </PacientesProvider>
         </AuthProvider>
      </BrowserRouter>
   );
}

export default App;