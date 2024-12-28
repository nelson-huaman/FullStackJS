import express from 'express';
import {
   registrar,
   perfil,
   confirmar,
   autenticar,
   olvide,
   comprobarToken,
   nuevoPassword,
   actualizarPerfil,
   actualizarPassword
} from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// Publica
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);
router.post('/olvide', olvide);
router.route('/olvide/:token').get(comprobarToken).post(nuevoPassword);

// Privada
router.get('/perfil', checkAuth, perfil);
router.put('/perfil/:id', checkAuth, actualizarPerfil);
router.put('/actualizar-password', checkAuth, actualizarPassword);

export default router;