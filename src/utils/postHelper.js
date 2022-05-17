const {prisma} = require("../database");
const { relations } = require("../utils/relationsHelper.js");
const _ = require("lodash")
const {createResponse, createError} = require("./helperFunctions");
const PostHelper = {
    async setUtilized(subscriptionId) {

        let hasSubscription = await prisma.subscription.findUnique({
            where: {
                id: subscriptionId,
            },
            include : relations.subscription()
        });
        hasPostLimit =  await this.hasPostLimit(subscriptionId);
        hasStoryLimit =  await this.hasStoryLimit(subscriptionId);

        if(hasPostLimit || hasStoryLimit){

        }
        else{

            let setUtilized = await prisma.subscription.update({
                where: {
                    id: subscriptionId,
                },
                data: {
                    utilized: 1,
                },

            });

        }

    },

    async hasPostLimit(subscriptionId) {

        let hasSubscription = await prisma.subscription.findUnique({
            where : { id : subscriptionId },
            include : relations.subscription()
        });


        if(hasSubscription){
            usedPost   = await prisma.post.findMany({
                where : {subscriptionId : hasSubscription.id},
            });


            if(usedPost.length)
            {
                return false;
            }else
            {
                return true;
            }
        }

    },
    async hasStoryLimit(subscriptionId) {

        let hasSubscription = await prisma.subscription.findUnique({
            where: {
                id: subscriptionId,
            },
            include : relations.subscription()
        });


        if(hasSubscription){
            usedStory   = await prisma.story.findMany({
                where : {subscriptionId : hasSubscription.id},
            });

            if(usedStory.length <  hasSubscription.package.story)
            {
                return true;
            }
            else
            {
                return false;
            }
        }


    },

    async makeData(posts, req, single = false){

        if(single)
        {

            post = posts

            const isLike = _.findIndex(post.likes, function(like) {
                return like.userId == req.userId;
            });


            const isBookmark = _.findIndex(post.bookmark, function(bookmark) {
                return bookmark.userId == req.userId;
            });

            const isFollow = _.findIndex(post.following, function(following) {
                return following.userId == req.userId;
            });


            post.isLike = isLike == -1  ? false : true;
            post.isBookmark = isBookmark == -1  ? false : true;
            post.isFollow = isFollow == -1  ? false : true;



            return post
        }
        else
        {
            for (let [index, post] of Object.entries(posts)) {

                const isLike = _.findIndex(post.likes, function(like) {
                    return like.userId == req.userId;
                });


                const isBookmark = _.findIndex(post.bookmark, function(bookmark) {
                    return bookmark.userId == req.userId;
                });

                const isFollow = _.findIndex(post.following, function(following) {
                    return following.userId == req.userId;
                });

                post.isLike = isLike == -1  ? false : true;
                post.isBookmark = isBookmark == -1  ? false : true;
                post.isFollow = isFollow == -1  ? false : true;

            }
            return posts
        }



    },

    async makeFeedsData(posts, req){

        for (let [index, feed] of Object.entries(posts)) {

            const isLike = _.findIndex(feed.post.likes, function(like) {
                return like.userId == req.userId;
            });


            const isBookmark = _.findIndex(feed.post.bookmark, function(bookmark) {
                return bookmark.userId == req.userId;
            });

            const isFollow = _.findIndex(feed.post.following, function(following) {
                return following.userId == req.userId;
            });

            feed.post.isLike = isLike == -1  ? false : true;
            feed.post.isBookmark = isBookmark == -1  ? false : true;
            feed.post.isFollow = isFollow == -1  ? false : true;

        }

        return posts
    },
    async getPost(id, req){

        postData = await prisma.post.findUnique({
            where: { id: id},
        });

        return postData
    },

    async getFollower(id, req){



        let  post = await prisma.post.findUnique({
            where: { id: id},
            include : {
                following: true ,
            }
        });

        followers  =  post.following
        return  _.map(followers, 'userId'); // → [1, 2]

    },


}


module.exports= {
    PostHelper
}
  