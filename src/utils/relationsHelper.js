const relations = {
    user(req = {}) {
        return {
            products: true
        };
    },
    productCategory(req = {}) {
        return {
            product: true,
            child: true,
        };
    },
    serviceCategory(req = {}) {
        return {
            service: true,
            child: true,
        };
    },
    product(req = {}) {
        return {
            productCategory: true,
            user : true,
            media : true,
            bids : {
                include : {
                    user : true
                }
            },
            isBid : {
                where: {
                    userId: req.userId ? req.userId : 0,
                },
            include : {
                user : true
            }

            },
        };
    },
    service(req = {}) {
        return {
            serviceCategory: true,
            user : true,
            media : true,
            bids : {
                include : {
                    user : true
                }
            },
            isBid : {
                where: {
                    userId: req.userId ? req.userId : 0,
                },
                include : {
                    user : true
                }
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