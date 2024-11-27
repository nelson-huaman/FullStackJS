import express from 'express';
import {
   registrar,
   perfil,
   confirmar,
   autenticar,
   olvide,
   comprobarToken,
   nuevoPassword
} from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authmiddleware.js';


const router = express.Router();

// Publica
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);
router.post('/olvide', olvide);
router.route('/olvide/:token').get(comprobarToken).post(nuevoPassword);

// Privada
router.get('/perfil', checkAuth, perfil);

export default router;