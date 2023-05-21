import { Router } from "express";
import { signup, signin, profile, addContact, deleteContact } from '../controllers/auth.controller';
const router: Router = Router();

import { TokenValidation } from '../libs/verifyToken';



router.get('/profile', TokenValidation, profile);

router.post('/signup', signup);
router.post('/signin', signin);

router.put('/add-contact', TokenValidation, addContact);

router.delete('/delete-contact', TokenValidation, deleteContact);


export default router;