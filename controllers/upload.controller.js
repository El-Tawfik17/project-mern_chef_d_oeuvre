const UserModel = require('../models/user.model');
const {uploadProfilErrors} =require('../utils/errors.utils');
const { promisify } = require('util');
const fs = require('fs');
const pipeline = promisify(require('stream').pipeline);
const multer = require('multer');

module.exports.uploadProfil = async (req, res) => {
     try {
        await UserModel.findByIdAndUpdate(
          req.body.userId,
          { $set : {picture: req.file.path}},
          { new: true, upsert: true, setDefaultsOnInsert: true},
          (err, docs) => {
            if (!err) return res.send(docs);
            else return res.status(500).send({ message: err });
          }
        );
      } catch (err) {
        return res.status(500).send({ message: err });
      }
     
}