import express from 'express'
const router = express.Router()
import { getUser, updateUser,deleteUser} from "../controllers/user.js";


router.get('/:id',getUser);
router.patch('/:id',updateUser)
router.delete('/:id',deleteUser)


export default router;
    