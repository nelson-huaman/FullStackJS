import { useEffect, useState } from "react";
import Alerta from './Alerta';
import usePacientes from '../hooks/usePacientes';

const Formulario = () => {

   const [ nombre, setNombre ] = useState('');
   const [ propietario, setPropietario ] = useState('');
   const [ email, setEmail ] = useState('');
   const [ telefono, setTelefono ] = useState('');
   const [ fecha, setFecha ] = useState('');
   const [ sintomas, setSintomas ] = useState('');
   const [ id, setId ] = useState(null);

   const [ alerta, setAlerta ] = useState({});

   const { guardarPaciente, paciente } = usePacientes();

   useEffect( () => {
      if(paciente?.nombre) {
         setNombre(paciente.nombre);
         setPropietario(paciente.propietario);
         setEmail(paciente.email);
         setTelefono(paciente.telefono);
         setFecha(new Date(paciente.fecha).toISOString());
         setSintomas(paciente.sintomas);
         setId(paciente._id);
      }
   }, [paciente]);

   const handleSubmit = e => {
      e.preventDefault();

      if([nombre, propietario, email, telefono, fecha, sintomas].includes('')) {
         setAlerta({
            msg: 'Todos los campos son onligatorios',
            error: true
         })
         return;
      }

      guardarPaciente({nombre, propietario, email, telefono, fecha, sintomas, id});
      setAlerta({
         msg: 'Cuardado correctamente'
      });
      setNombre('');
      setPropietario('');
      setEmail('');
      setTelefono('');
      setFecha('');
      setSintomas('');
      setId('');
      
   }

   const { msg } = alerta;

   return (
      <>
         <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>

         <p className="text-xl mt-5 mb-10 text-center">
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
               value={ id ? 'Guardar Cambios' : 'Agregar Paciente'}
               className="bg-indigo-600 w-full py-3 rounded text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 transition-colors"
            />
         </form>

         {msg && <Alerta alerta={alerta} />}
      </>
   );
}

export default Formulario;