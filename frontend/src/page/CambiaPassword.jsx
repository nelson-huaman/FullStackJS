import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from '../components/Alerta';
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {

   const { guardarPassword } = useAuth();

   const [ alerta, setAlerta ] = useState({});
   const [ password, setPassword ] = useState({
      password_actual: '',
      password_nuevo: ''
   });

   const handleSubmit = async e => {
      e.preventDefault();

      if(Object.values(password).some( campo => campo === '')) {
         setAlerta({
            msg: 'Todo los campos con oblogatorios',
            error: true
         });
         return;
      }
      if( password.password_nuevo.length < 6) {
         setAlerta({
            msg: 'La contraseña debe de tener minimo 6 caracteres',
            error: true
         });
         return;
      }

      const resultado = await guardarPassword(password);
      setAlerta(resultado);
   }

   const { msg } = alerta;

   return (
      <>
         <AdminNav />
         <h2 className="font-black text-3xl text-center mt-10">Cambiar Contraseña</h2>
         <p className="text-xl mt-5 mb-10 text-center">
            Modifica tu {''}
            <span className="text-indigo-600 font-bold">Contraseña aquí</span>
         </p>

         <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
               { msg && <Alerta alerta={alerta} /> }
               <form
                  onSubmit={handleSubmit}
               >
                  <div className="my-3">
                     <label htmlFor="password_actual" className="text-gray-600 font-bold">Contraseña Actual</label>
                     <input
                        type="password"
                        id="password_actual"
                        name="password_actual"
                        placeholder="Contraseña Actual"
                        className="border bg-gray-50 w-full p-2 mt-2 rounded-lg"
                        onChange={e => setPassword({
                           ...password,
                           [e.target.name]: e.target.value
                        })}
                     />
                  </div>
                  <div className="my-3">
                     <label htmlFor="password_nuevo" className="text-gray-600 font-bold">Contraseña Nueva</label>
                     <input
                        type="password"
                        id="password_nuevo"
                        name="password_nuevo"
                        placeholder="Contraseña Nueva"
                        className="border bg-gray-50 w-full p-2 mt-2 rounded-lg"
                        onChange={e => setPassword({
                           ...password,
                           [e.target.name]: e.target.value
                        })}
                     />
                  </div>
                  <input
                     type="submit"
                     value="Actualizar Contraseña"
                     className="bg-indigo-600 w-full py-3 rounded text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 transition-colors"
                  />
               </form>
            </div>
         </div>
      </>
   );
}

export default CambiarPassword;