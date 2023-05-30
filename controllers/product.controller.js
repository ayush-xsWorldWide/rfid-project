exports.showCreateProductPage = (req, res)=>{
    return res.render('admin/AddProduct',{
        user: req.user.id,
        status: ''
    });
}

exports.ActionCreateProductPage = (req, res)=>{

}