import usePacientes from "../hooks/usePacientes";

const Paciente = ({paciente}) => {

   const { setEdicion, eliminarPaciente } = usePacientes();

   const { nombre, propietario, email, telefono, fecha, sintomas, _id } = paciente;

   const formaterFecha = fecha => {
      const nuevaFecha = new Date(fecha);
      return new Intl.DateTimeFormat('es-ES', {dateStyle: 'long'}).format(nuevaFecha)
   }

   return (
      <div className="mx-5 my-10 bg-white px-5 py-10 rounded-xl shadow-md">
         <p className="font-bold uppercase text-indigo-800 my-2">Nombre: {''}
            <span className="font-normal normal-case text-black">{nombre}</span>
         </p>
         <p className="font-bold uppercase text-indigo-800 my-2">Propietario: {''}
            <span className="font-normal normal-case text-black">{propietario}</span>
         </p>
         <p className="font-bold uppercase text-indigo-800 my-2">Correo de Contacto: {''}
            <span className="font-normal normal-case text-black">{email}</span>
         </p>
         <p className="font-bold uppercase text-indigo-800 my-2">Telefono: {''}
            <span className="font-normal normal-case text-black">{telefono}</span>
         </p>
         <p className="font-bold uppercase text-indigo-800 my-2">Fecha de Alta: {''}
            <span className="font-normal normal-case text-black">{formaterFecha(fecha)}</span>
         </p>
         <p className="font-bold uppercase text-indigo-800 my-2">Síntomas: {''}
            <span className="font-normal normal-case text-black">{sintomas}</span>
         </p>
         <div className="flex justify-between mt-6">
            <button 
               type="button"
               className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
               onClick={() => setEdicion(paciente)}
            >Editar</button>
            <button 
               type="button"
               className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg"
               onClick={() => eliminarPaciente(_id)}
            >Eliminar</button>
         </div>
      </div>
   );
}

export default Paciente;