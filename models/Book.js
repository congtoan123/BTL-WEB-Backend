const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const BookSchema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String ,require:true },
        image: { type: String },
        category: { type: String, required: true },
        description: { type: String },
        page_number:{type: String },
        price:{type: String},
        release:{type :String},
        slug: { type: String, slug: 'title', unique: true },
    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.plugin(slug);
BookSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
const Book = mongoose.model('Book', BookSchema);
module.exports = Book;

