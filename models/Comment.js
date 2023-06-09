const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        User: { type: mongoose.Schema.Types.Mixed,ref:"User"},
        Description: { type: String ,require:true },
        Book: { type: mongoose.Schema.Types.ObjectId,ref:"Book" },
        Star: {type : Number},
    },
    {
        timestamps: true,
    },
);

// Add plugins
Comment.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Comment', Comment);