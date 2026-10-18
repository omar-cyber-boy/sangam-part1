const Image = require('../models/Image');
const { uploadToCloudinary } = require('../helpers/cloudinaryHelper');
const fs = require('fs')
const cloudinary = require('../config/cloudinary')


const uploadImageController = async (req, res) => {
    try {

        //check if file is missing in req object 
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'file is required, plz upload an imageee'
            })
        }

        //upload to cloudinary
        const { url, publicId } = await uploadToCloudinary(req.file.path)

        //store the image url and publicId and uploaded user id in DB
        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        })

        await newlyUploadedImage.save();

        //delete the file from local storage 
        fs.unlinkSync(req.file.path)


        res.status(201).json({
            success: true,
            message: 'image uploaded succerfyl',
            image: newlyUploadedImage
        })


    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'something went wrong. ' + error.message
        })
    }
}


const fetchImagesController = async(req, res)=> {
    try{
        const images = await Image.find({});

        if(images){
            res.status(200).json({
                success: true,
                data: images
            })
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'something went wrong. ' + error.message
        })
    }
}


const deleteImageController = async(req, res)=> {
    try{
        const getCurrentIdOfImageToBeDeleted = req.params.id;
        const userId = req.userInfo.userId;

        const image = await Image.findById(getCurrentIdOfImageToBeDeleted);

        if(!image){
            return res.status(404).json({
                success: false,
                message: 'image not foundddddd'
            })
        }
        console.log(image.uploadedBy);
        // check if image is uploaded by current user who is trying to delete this image
        if(image.uploadedBy.toString() !== userId.toString()){
            return res.status(403).json({
                success: false,
                message: 'you are not authorizzzz to delete this immmmmage'
            })
        }

        //delete this image first from cloudinary storage
        await cloudinary.uploader.destroy(image.publicId)

        //delete this image from mongoDB
        await Image.findByIdAndDelete(getCurrentIdOfImageToBeDeleted)

        res.status(200).json({
            success: true,
            message: 'image deleted succerfylyyy'
        })



    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'something went wrong. ' + error.message
        })
    }
}



module.exports = {
    uploadImageController,
    fetchImagesController,
    deleteImageController
}