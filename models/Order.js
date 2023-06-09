const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Order = new Schema(
    {
        User: { type: mongoose.Schema.Types.Mixed,ref:"User"},
        Book: { type: mongoose.Schema.Types.Mixed,ref:"Book"},
        Name: {type:String},
        Address: {type : String},
        Phone: {type : String},
        Email: {type : String},
        Payment: {type : String},
        Country: {type : String},
        City: {type : String},
        Zipcode: {type:String},
        Shipping: {type: String},
        Quantity :{type : Number},
    },
    {
        timestamps: true,
    },
);

// Add plugins
Order.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Order', Order);