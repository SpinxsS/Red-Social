const path = require('path');
const ctrl = {};
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');
const md5 =  require('md5');
const { Image, Comment } = require('../models');
const sidebar = require('../helpers/sidebar');

ctrl.index = async (req, res) => {
    let viewModel = { image: {}, comments: {} };


   const image = await Image.findOne({filename: {$regex: req.params.image_id}});
   if(image){
       image.views = image.views + 1;
       viewModel.image = image;
       await image.save();
       const comments = await Comment.find({image_id: image._id});
       viewModel.comments = comments;
       viewModel = await sidebar(viewModel);
        res.render('image', viewModel);
    }
    else{
        res.redirect('/');
    }
};

ctrl.create =  (req, res) => {
    console.log(req.file);

    const saveImage =  async () => {
    const imgURL = randomNumber();
    const images = await Image.find({ filename: imgURL });
    if(images.length > 0){
        saveImage();
    }
    else{
    console.log(imgURL);
    const imageTempPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.resolve(`/Users/Spinxs/Desktop/MEVN/src/public/upload/${imgURL}${ext}`);
    console.log(targetPath);

    if( ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
        //rename mueve un archivo de un directorio a otro
        await fs.rename( imageTempPath, targetPath);

        const newimg = new Image({
            title: req.body.title,
            filename: imgURL + ext,
            description: req.body.description
        });
        const imageSave = await newimg.save();
        res.redirect('/images/' + imageSave.uniqueId );
        console.log(newimg);

    }
    else{
        await fs.unlink(imageTempPath);
        res.status(500).json({error: 'Solo imágenes estan permitidas'});
    }
}
    }; 
    
    saveImage();
};

ctrl.like = async (req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    console.log(image)
    if (image) {
    image.likes = image.likes + 1;
    await image.save();
    res.json({likes: image.likes})
    } else {
    res.status(500).json({error: 'Internal Error'});
     }
};

ctrl.comment = async (req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if( image ){
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        await newComment.save();
        console.log(newComment.name);
        res.redirect('/images/' + image.uniqueId );
    }
    else{
        res.redirect('/');
    }
    
};

ctrl.remove = async (req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if (image) {
        //unlink remueve un dato a partir de una direccion que yo le de
         fs.unlink(path.resolve('/Users/Spinxs/Desktop/MEVN/src/public/upload/' + image.filename));
         await console.log('EXISTE LA IMAGEN');
         await Comment.deleteMany({image_id: image._id});
         await image.remove();
    res.json(true);
    } else {
    res.json({response: 'Bad Request.'})
  }
};

module.exports = ctrl;