module.exports = function(err, res){
    console.log('from handle_error ' + err);
    res.status(500).json({msg: 'oops! server error.'});
};
