import { useState } from "react";
import Alerta from './Alerta';

const Formulario = () => {

   const [ nombre, setNombre ] = useState('');
   const [ propietario, setPropietario ] = useState('');
   const [ email, setEmail ] = useState('');
   const [ telefono, setTelefono ] = useState('');
   const [ fecha, setFecha ] = useState(Date.now());
   const [ sintomas, setSintomas ] = useState('');

   const [ alerta, setAlerta ] = useState({});

   const handleSubmit = e => {
      e.preventDefault();

      if([nombre, propietario, email, telefono, fecha, sintomas].includes('')) {
         setAlerta({
            msg: 'Todos los campos son onligatorios',
            error: true
         })
         return;
      }
      
   }

   const { msg } = alerta;

   return (
      <>
         <p className="text-lg text-center mb-10">
            Añade tus pacientes y {''}
            <span className="text-indigo-600 font-bold">Administralos</span>
         </p>

         

         <form
            className="bg-white py-10 px-5 mb-5 lg:mb-0 shadow-md rounded-md"
            onSubmit={handleSubmit}
         >
            <div className="my-5">
               <label
                  htmlFor="nombre"
                  className="text-gray-700 block font-bold"
               >Nombre</label>
               <input
                  type="text"
                  id="nombre"
                  placeholder="Nombre"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
               />
            </div>
            <div className="my-5">
               <label
                  htmlFor="propietario"
                  className="text-gray-700 block font-bold"
               >Propietario</label>
               <input
                  type="text"
                  id="propietario"
                  placeholder="Nombre del Propietario"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  value={propietario}
                  onChange={e => setPropietario(e.target.value)}
               />
            </div>
            <div className="my-5">
               <label
                  htmlFor="email"
                  className="text-gray-700 block font-bold"
               >Correo</label>
               <input
                  type="email"
                  id="email"
                  placeholder="Correo"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
               />
            </div>
            <div className="my-5">
               <label
                  htmlFor="telefono"
                  className="text-gray-700 block font-bold"
               >Telefono</label>
               <input
                  type="tel"
                  id="telefono"
                  placeholder="Telefono"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  value={telefono}
                  onChange={e => setTelefono(e.target.value)}
               />
            </div>
            <div className="my-5">
               <label
                  htmlFor="fecha"
                  className="text-gray-700 block font-bold"
               >Fecha</label>
               <input
                  type="date"
                  id="fecha"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  value={fecha}
                  onChange={e => setFecha(e.target.value)}
               />
            </div>
            <div className="my-5">
               <label
                  htmlFor="sintomas"
                  className="text-gray-700 block font-bold"
               >Síntomas</label>
               <textarea
                  id="sintomas"
                  placeholder="Describe los síntomas"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  value={sintomas}
                  onChange={e => setSintomas(e.target.value)}
               />

            </div>
            <input
               type="submit"
               value="Agregar Paciente"
               className="bg-indigo-600 w-full py-3 rounded text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 transition-colors"
            />
         </form>

         {msg && <Alerta alerta={alerta} />}
      </>
   );
}

export default Formulario;