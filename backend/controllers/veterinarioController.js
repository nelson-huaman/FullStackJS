import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvide.js";

const registrar = async (req, res) => {
   const { nombre, email } = req.body;

   // Prevenir usuarios Duplicados
   const existeUsuario = await Veterinario.findOne({email});
   if(existeUsuario) {
      const error = new Error('Usuario ya registrado');
      return res.status(400).json({msg: error.message});
   }

   try {
      // Guardar un nuevo Veterinario
      const veterinario = new Veterinario(req.body);
      const veterinarioGuardo = await veterinario.save();

      // Enviar Email
      emailRegistro({
         email,
         nombre,
         token: veterinarioGuardo.token
      });

      res.json(veterinarioGuardo);
   } catch (error) {
      console.log(error);
   }
}

const perfil = (req, res) => {
   const { veterinario } = req;
   res.json(veterinario);
}

const confirmar = async (req, res) => {

   const { token } = req.params;
   const usuarioConfirmar = await Veterinario.findOne({token});
   if(!usuarioConfirmar) {
      const error = new Error('Token no válido');
      return res.status(404).json({msg: error.message});
   }

   try {

      usuarioConfirmar.token = null;
      usuarioConfirmar.confirmado = true;
      await usuarioConfirmar.save();
      
      res.json({msg: 'Usuario confirmado correctamente'});
   } catch (error) {
      console.log(error)
   }
}

const autenticar = async (req, res) => {

   const { email, password } = req.body;
   
   // Si el Usuario existe
   const usuario = await Veterinario.findOne({email});
   if(!usuario) {
      const error = new Error('El usuario no existe');
      return res.status(403).json({msg: error.message});
   }

   // Cuenta confirmado
   if(!usuario.confirmado) {
      const error = new Error('Tu cuenta no a sigo confirmado');
      return res.status(403).json({msg: error.message});
   }

   // Autenticar usuatio
   if( await usuario.comprobarPassword(password)) {
      // Autenticar
      res.json({
         _id: usuario._id,
         nombre: usuario.nombre,
         email: usuario.email,
         token: generarJWT(usuario.id)
      })
   } else {
      const error = new Error('La contraseña es incorrecto');
      return res.status(403).json({msg: error.message});
   }
   
}

const olvide = async (req, res) => {

   const { email } = req.body;
   const existeVeterinario = await Veterinario.findOne({email});
   if(!existeVeterinario) {
      const error = new Error('El usuario no existe');
      return res.status(400).json({msg: error.message})
   }

   try {
      existeVeterinario.token = generarId();
      await existeVeterinario.save();
      emailOlvidePassword({
         email,
         nombre: existeVeterinario.nombre,
         token: existeVeterinario.token
      });
      res.json({msg: 'Hemos enviado Email con las instrucciones'});
   } catch (error) {
      console.log(error)
   }
}

const comprobarToken = async (req, res) => {

   const { token } = req.params;

   const tokenValido = await Veterinario.findOne({token});
   if(tokenValido) {
      res.json({msg: 'Token válido y el usuario existe'});
   } else {
      const error = new Error('Token no válido');
      return res.status(400).json({msg: error.message});
   }

}

const nuevoPassword = async (req, res) => {

   const { token } = req.params;
   const { password } = req.body;

   const veterinario = await Veterinario.findOne({token});
   if(!veterinario) {
      const error = new Error('Hubo un error');
      return res.status(400).json({msg: error.message});
   }

   try {

      veterinario.token = null;
      veterinario.password = password;
      await veterinario.save();
      res.json({msg: 'Contraseña modificado correctamente'});
      
   } catch (error) {
      console.log(error);
   }

}

const actualizarPerfil = async (req, res) => {
   const veterinario = await Veterinario.findById(req.params.id)
   if(!veterinario) {
      const error = new Error('Hubo un error');
      return res.status(400).json({msg: error.message});
   }
   
   const { email } = req.body;
   if(veterinario.email !== email) {
      const existeEmail = await Veterinario.findOne({email});
      if(existeEmail) {
         const error = new Error('El Correo ya esta en uso');
         return res.status(400).json({msg: error.message});
      }
   }

   try {
      veterinario.nombre = req.body.nombre;
      veterinario.email = req.body.email;
      veterinario.web = req.body.web;
      veterinario.telefono = req.body.telefono;

      const vertinarioActualizado = await veterinario.save();
      res.json(vertinarioActualizado);
   } catch (error) {
      console.log(error)
   }
   
}

const actualizarPassword = async (req, res) => {
   // leer los datos
   const { _id } = req.veterinario;
   const { password_actual, password_nuevo } = req.body;

   // Comprobar el Veterinario existe
   const veterinario = await Veterinario.findById(_id)
   if(!veterinario) {
      const error = new Error('Hubo un error');
      return res.status(400).json({msg: error.message});
   }

   // Comprobar su Contraseña
   if(await veterinario.comprobarPassword(password_actual)) {
      veterinario.password = password_nuevo;
      await veterinario.save();
      res.json({msg: 'Contraseña actualizado correctamente'});
   } else {
      const error = new Error('La contraseña actual es incorrecto');
      return res.status(400).json({msg: error.message});
   }

   // Guardar la nueva Contraseña

}

export {
   registrar,
   perfil,
   confirmar,
   autenticar,
   olvide,
   comprobarToken,
   nuevoPassword,
   actualizarPerfil,
   actualizarPassword
}