const noticeModel = require("../models/notice");

module.exports = {
    addNotice: async function (noticeObjcet) {
        const result = await noticeModel.addNotice(noticeObjcet);
        if (result.affectedRows == 1) {
            noticeObjcet.no = result.insertId;
        }
        return noticeObjcet;
    }
}