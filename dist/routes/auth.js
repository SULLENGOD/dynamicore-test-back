"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
const verifyToken_1 = require("../libs/verifyToken");
router.get('/profile', verifyToken_1.TokenValidation, auth_controller_1.profile);
router.post('/signup', auth_controller_1.signup);
router.post('/signin', auth_controller_1.signin);
router.put('/add-contact', verifyToken_1.TokenValidation, auth_controller_1.addContact);
router.delete('/delete-contact', auth_controller_1.deleteContact);
exports.default = router;
//# sourceMappingURL=auth.js.map