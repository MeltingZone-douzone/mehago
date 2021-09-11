const fs = require('fs');
const path = require('path');

const fileModel = require("../models/file");

module.exports = {
    addFile: function (participantNo, roomNo, files) {
        // if (!file) {
        //     throw new Error('error: no file attached');
        // }

        // const content = fs.readFileSync(file.path);
        // const storeDirectory = path.join(path.dirname(require.main.filename), process.env.STATIC_RESOURCES_DIRECTORY, process.env.UPLOADIMAGE_STORE_LOCATION);
        // const storePath = path.join(storeDirectory, file.filename) + path.extname(file.originalname);
        // const url = path.join(process.env.UPLOADIMAGE_STORE_LOCATION, file.filename) + path.extname(file.originalname);

        // fs.existsSync(storeDirectory) || fs.mkdirSync(storeDirectory);
        // fs.writeFileSync(storePath, content, { flag: 'w+' });
        // fs.unlinkSync(file.path);
        // }


        // return fileObjcet;
    }
}