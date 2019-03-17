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
    const {userId,productId} = req.body;

    console.log(userId,productId);

    CartItem.findOne({where:{productId}})
        .then(catItem => {
            // console.log(catItem);
            if(catItem){
                catItem.increment("amount")
                .then(data => {
                        res.json({
                            data: data.get(),
                            status: "add to cart"
                        });
                    })

            }
        });
};
