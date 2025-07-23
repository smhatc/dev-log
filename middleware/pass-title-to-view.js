const passTitleToView = (req, res, next) => {
    res.locals.title = "/dev/log";
    next();
};

module.exports = passTitleToView;