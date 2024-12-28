import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from '../hooks/useAuth';
import Alerta from '../components/Alerta';

const EditarPerfil = () => {

   const { auth, actualizarPerfil } = useAuth();
   const [ perfil, setPerfil ] = useState({});
   const [ alerta, setAlerta ] = useState({});

   useEffect( () => {
      setPerfil(auth);
   }, [auth]);

   const handleSubmit = async e => {
      e.preventDefault();

      const { nombre, email } = perfil;
      if([nombre, email].includes('')) {
         setAlerta({
            msg: 'Email y Nombre son obligarorios',
            error: true
         });
         return;
      }

      const resultado = await actualizarPerfil(perfil);
      setAlerta(resultado);
   }

   const { msg } = alerta;

   return (
      <>
         <AdminNav />
         <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
         <p className="text-xl mt-5 mb-10 text-center">
            Modifica tu {''}
            <span className="text-indigo-600 font-bold">Información aquí</span>
         </p>

         <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
               { msg && <Alerta alerta={alerta} /> }
               <form
                  onSubmit={handleSubmit}
               >
                  <div className="my-3">
                     <label htmlFor="nombre" className="text-gray-600 font-bold">Nombre</label>
                     <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="Nombre"
                        className="border bg-gray-50 w-full p-2 mt-2 rounded-lg"
                        value={perfil.nombre || ''}
                        onChange={ e => setPerfil({
                           ...perfil,
                           [e.target.name]: e.target.value
                        })}
                     />
                  </div>
                  <div className="my-3">
                     <label htmlFor="web" className="text-gray-600 font-bold">Sitio Web</label>
                     <input
                        type="text"
                        id="web"
                        name="web"
                        placeholder="Sitio Web"
                        className="border bg-gray-50 w-full p-2 mt-2 rounded-lg"
                        value={perfil.web || ''}
                        onChange={ e => setPerfil({
                           ...perfil,
                           [e.target.name]: e.target.value
                        })}
                     />
                  </div>
                  <div className="my-3">
                     <label htmlFor="telefono" className="text-gray-600 font-bold">Telefono</label>
                     <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        placeholder="Telefono"
                        className="border bg-gray-50 w-full p-2 mt-2 rounded-lg"
                        value={perfil.telefono || ''}
                        onChange={ e => setPerfil({
                           ...perfil,
                           [e.target.name]: e.target.value
                        })}
                     />
                  </div>
                  <div className="my-3">
                     <label htmlFor="email" className="text-gray-600 font-bold">Correo</label>
                     <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Correo"
                        className="border bg-gray-50 w-full p-2 mt-2 rounded-lg"
                        value={perfil.email || ''}
                        onChange={ e => setPerfil({
                           ...perfil,
                           [e.target.name]: e.target.value
                        })}
                     />
                  </div>
                  <input
                     type="submit"
                     value="Guardar Cambios"
                     className="bg-indigo-600 w-full py-3 rounded text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 transition-colors"
                  />
               </form>
            </div>
         </div>
      </>
   );
}

export default EditarPerfil;