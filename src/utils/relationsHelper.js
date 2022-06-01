const relations = {
    user(req = {}) {
        return {
            product: true
        };
    },
    productCategory(req = {}) {
        return {
            product: true,
            child: true,
        };
    },
    product(req = {}) {
        return {
            productCategory: true,
            user : true,
            media : true,
            bids : true,
            isBid : {
                where: {
                    userId: req.userId ? req.userId : 0,
                },
            },
        };
    },
    chatRoom(req = {}) {
        return {
            roomMember: {
                include : {
                    user : true,
                }
            },
            conversion: {
                include : {
                    chatRoom : true,
                    sender : true,

                }
            },

        };
    },
    roomMember(req = {}) {
        return {
            user : true,
        }
    },
    conversion(req = {}) {
        return {
            chatRoom : true,
            sender : true,
        }
    },
};


module.exports = {
    relations,
};