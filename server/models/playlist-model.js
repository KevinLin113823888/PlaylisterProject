const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const playlistSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        songs: { type: [{
            title: String,
            artist: String,
            youTubeId: String
        }], required: true },
        published: {type: Boolean, required: true},
        userName:{type: String, required: true },
        comments: { type: [{
            comment: String,
            user: String
        }], required: true },
        likes: { type: [{
            userLiked: String
        }], required: true },
        dislikes: { type: [{
            userDisliked: String
        }], required: true },
        publishDate: { type: String, required: false },
        listens:{type:Number, required:false},
        likesNum:{type:Number, required:false},
        dislikesNum:{type:Number, required:false},
        actualPublishDate:{type:Date,required:false},
        copied:{type:Number, required:false},
    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)
