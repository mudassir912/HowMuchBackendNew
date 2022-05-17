const {prisma} = require("../database");
const { relations } = require("../utils/relationsHelper.js");
const _ = require("lodash")
const {createError} = require("./helperFunctions");
const userInfo = {
    async getDetails(id){


        try {
            let  user = await prisma.user.findUnique({
                where: { id: id},
                include : relations.user()
            });
       return user
        } catch (error) {
            return createError(401, error);
        }

    },

    async getFollowing(id){



        let user = await this.getDetails(id);

            console.log(user);

        following  =  user.following

        followingIds =  _.map(following, 'businessId'); // → [1, 2]



        business = await prisma.business.findMany({
            where: {
                id: { in: followingIds},
            }
        });

        console.log(business);
        return _.map(business, 'userId'); // → [1, 2]
    },

    async getBookmarks(id){


        let  user = await prisma.user.findUnique({
            where: { id: id},
            include : relations.user()
        });


        bookmark  =  user.postBookmark

        return _.map(bookmark, 'postId'); // → [1, 2]

    },

    async getFollower(id){



        let  user = await prisma.user.findUnique({
            where: { id: id},
            include : {
                business: {
                    include: {
                        followers: {
                            include: { user: true },
                        },
                    },
                }
            }
        });


        followers  =  user.business.followers

        return  _.map(followers, 'userId'); // → [1, 2]

    },

}


module.exports= {
    userInfo
}
  