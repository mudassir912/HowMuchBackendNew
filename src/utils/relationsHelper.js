const relations = {
    user(req = {}) {
        return {}
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