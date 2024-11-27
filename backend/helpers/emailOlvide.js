import nodemailer from 'nodemailer';

const emailOlvidePassword = async datos => {

   const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASS
      }
   });

   const { nombre, email, token } = datos;

   const info = await transporter.sendMail({
      from: "APV - Adminstracióm de pacientes de Veterianrio",
      to: email,
      subject: 'Restable tu Contraseña en APV',
      text: 'Restable tu Contraseña en APV',
      html: `
         <p>Nombre: ${nombre}, has solicitado reestablecer tu contraseña</p>
         <p>Sigue el siguente enlace para generar nueva contraseña: <a href="${process.env.FRONTEND_URL}/olvide/${token}">Reestablecer Contraseña</a></p>
         <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
      `
   });

   console.log('Mensaje enviado %s', info.messageId);


}

export default emailOlvidePassword;