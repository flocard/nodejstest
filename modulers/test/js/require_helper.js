// require_helper.js
module.exports = function (path) {
    return require((process.env.APP_DIR_FOR_CODE_COVERAGE || '../../app/') + path);
};
