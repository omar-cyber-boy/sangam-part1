const express = require('express');
const router = express.Router();

const adminMiddlewar = require('../middleware/isAdmin-middleware');
const authMiddleware = require('../middleware/auth-middleware');
const uploadMiddleware = require('../middleware/upload-middleware');
const { uploadImageController, fetchImagesController, deleteImageController } = require('../controllers/image-controller')


//upload image
router.post('/upload',
    authMiddleware, 
    adminMiddlewar, 
    uploadMiddleware.single('image'), 
    uploadImageController
);


//get all images
router.get('/all', authMiddleware, fetchImagesController);

//delet Image
router.delete('/delete/:id', authMiddleware, adminMiddlewar, deleteImageController)


module.exports = router;