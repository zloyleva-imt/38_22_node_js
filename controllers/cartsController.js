const CartItem = require('../models').CartItem;
const Product = require('../models').Product;


exports.cart_show = (req, res) => {
    const {params: {userId}} = req;

    CartItem.findAll({
        where:{
            userId: userId
        },
        include: [{
            model: Product,
        }]
    })
        .then(data => {
            console.log(JSON.stringify(data));
            res.json({
                data: data,
                status: "ok"
            });
    });
};

exports.cart_add_item = (req, res) => {
    console.log(req.body);

    Cart.create({...req.body})
        .then(data => {
            console.log(data);
            res.json({
                data: data,
                status: "ok"
            });
        })
};
