import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {

   const [ nombre, setNombre ] = useState('');
   const [ email, setEmail ] = useState('');
   const [ password, setPassword ] = useState('');
   const [ repetirPassword, setRepetirPassword ] = useState('');
   const [ alerta, setAlerta ] = useState({msg: '', error: false});

   const handleSubmit = async e => {
      e.preventDefault();

      if([nombre, email, password, repetirPassword].includes('')) {
         setAlerta({msg: 'Hay campos vacios', error: true});
         return
      }

      if(password !== repetirPassword) {
         setAlerta({msg: 'Las contraseñas no son iguales', error: true});
         return
      }

      if(password.length < 6) {
         setAlerta({msg: 'La contraseña es muy corto, agrega minimo 6 caracteres', error: true});
         return;
      }

      setAlerta({});

      // Crear el Usuario en la API
      try {
         await clienteAxios.post('/veterinarios', { nombre, email, password});
         setAlerta({
            msg: 'Creado Correctamente, Revisa tu Email',
            error: false
         })
         
      } catch (error) {
         setAlerta({
            msg: error.response.data.msg,
            error: true
         })
      }

   }

   const {msg} = alerta;

   return (
      <>
         <div>
            <h1 className="text-indigo-600 font-extrabold text-4xl">
               Crea tu Cuenta y Administra {""}
               <span className="text-black">tus Pacientes</span>
            </h1>
         </div>
         <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

            {msg && <Alerta
               alerta={alerta}
            />}
            <form
               onSubmit={handleSubmit}
            >
               <div className="my-5">
                  <label
                     className="uppercase text-gray-600 block text-xl"
                  >Nombre</label>
                  <input
                     type="text"
                     placeholder="Tu Nombre"
                     className="border w-full p-3 mt-3 bg-gray-100 rounded"
                     value={nombre}
                     onChange={e => setNombre(e.target.value)}
                  />
               </div>
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
               <div className="my-5">
                  <label
                     className="uppercase text-gray-600 block text-xl"
                  >Repetir Contraseña</label>
                  <input
                     type="password"
                     placeholder="Repite tu contraseña"
                     className="border w-full p-3 mt-3 bg-gray-100 rounded"
                     value={repetirPassword}
                     onChange={e => setRepetirPassword(e.target.value)}
                  />
               </div>
               <input
                  type="submit"
                  value="Crear Cuenta"
                  className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
               />
            </form>
            <nav className="mt-10 lg:flex lg:justify-between">
               <Link
                  className="block my-5 text-center text-gray-500"
               to="/">¿Ya tienes una cuenta? Iniciar Sesión</Link>
               <Link
                  className="block my-5 text-center text-gray-500"
               to="/olvide">Olvide mi Contraseña</Link>
            </nav>
         </div>
      </>
   );
}

export default Registrar;