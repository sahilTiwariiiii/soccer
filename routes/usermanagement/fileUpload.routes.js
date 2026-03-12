import express from 'express';
import upload from '../../config/s3.js';

const router = express.Router();

const singleUpload = upload.single('image');

router.post('/upload', function(req, res) {
  singleUpload(req, res, function(err) {
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
    }

    return res.json({'imageUrl': req.file.location});
  });
});

export default router;
