import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from '../components/Alerta';
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";


const Login = () => {

   const [ email, setEmail ] = useState('');
   const [ password, setPassword ] = useState('');
   const [ alerta, setAlerta ] = useState({});

   const { setAuth } = useAuth();

   const navigate = useNavigate();

   const handleSubmit = async e => {
      e.preventDefault();
      
      if([email, password].includes('')) {
         setAlerta({
            msg: 'Todos los campos son obligatorios',
            error: true
         });
         return;
      }

      try {
         const { data } = await clienteAxios.post('/veterinarios/login', { email, password });
         localStorage.setItem('token', data.token);
         setAuth(data);
         navigate('/admin');       
      } catch (error) {
         setAlerta({
            msg: error.response.data.msg,
            error: true
         });
      }
   }

   const { msg } = alerta;

   return (
      <>
         <div>
            <h1 className="text-indigo-600 font-extrabold text-4xl">
               Iniciar Sesión y Administra tus {""}
               <span className="text-black">Pacientes</span>
            </h1>
         </div>
         <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

            {msg && <Alerta
               alerta={alerta}
            />}

            <form onSubmit={handleSubmit}>
               <div className="my-5">
                  <label
                     className="uppercase text-gray-600 block text-xl"
                  >Correo</label>
                  <input
                     type="email"
                     placeholder="Tu Correo"
                     className="border w-full p-3 mt-3 bg-gray-100 rounded"
                     value={email}
                     onChange={e => setEmail(e.target.value)}
                  />
               </div>
               <div className="my-5">
                  <label
                     className="uppercase text-gray-600 block text-xl"
                  >Contraseña</label>
                  <input
                     type="password"
                     placeholder="Tu contraseña"
                     className="border w-full p-3 mt-3 bg-gray-100 rounded"
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                  />
               </div>
               <input
                  type="submit"
                  value="Iniciar Sesión"
                  className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
               />
            </form>
            <nav className="mt-10 lg:flex lg:justify-between">
               <Link
                  className="block my-5 text-center text-gray-500"
               to="/registrar">¿No tienes una cuenta? Regístare</Link>
               <Link
                  className="block my-5 text-center text-gray-500"
               to="/olvide">Olvide mi Contraseña</Link>
            </nav>
         </div>
      </>
   );
}

export default Login;