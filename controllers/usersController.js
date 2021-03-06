const User = require('../models').User;

exports.user_list = (req, res) => {
    const {query} = req;
    let limitRows = 4;
    let offset = 0;
    let page = 1;

    if("page" in query && Number.isInteger(parseInt(query.page)) && parseInt(query.page) > 0){
        page = parseInt(query.page);
        offset = limitRows*(page - 1);
    }

    User.findAndCountAll({ offset: offset, limit: limitRows })
        .then(users => {
            res.json({
                data: users,
                page: page,
                // total: result[1][0].count,
                status: "ok"
            })
        })
};

exports.user_show = (req, res) => {
    const {params: {id}} = req;
    console.log(id);

    User.findById(id)
        .then(user => {
            console.log(user);
            res.json({
                data: user,
                status: "ok"
            });
        })
};

exports.user_update = (req, res) => {
    const {params: {id}} = req;
    console.log(id);

    User.findOne({ where: { id: id } })
        .then(user => {
            console.log('\x1b[31m',user);
            user.update({...req.body})
                .then(result => {
                    console.log(result);
                    res.json({
                        data: result,
                        status: "ok"
                    });
                })
        })
};

exports.user_delete = (req, res) => {
    const {params: {id}} = req;
    console.log(id);

    User.destroy({
        where: {
            id: id
        }
    })
        .then(result => {
            console.log(result);
            res.json({
                data: result,
                status: "ok"
            });
        })
};

exports.user_new = (req, res) => {
    console.log(req.body);

    User.create({...req.body})
        .then(user => {
            console.log(user);
            res.json({
                data: user,
                status: "ok"
            });
        })
};