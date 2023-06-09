const Book = require('../models/Book.js')
const {mutipleMongooseToObject} = require('../util/mongoose')
class BookController{
    index(req,res,next){
        Book.find({})
            .then((book)=>{
                res.json({book : mutipleMongooseToObject(book)})
            })
            .catch(next);

    }
    show(req,res,next){
        Book.findOne({slug:req.params.slug})
            .then((book)=>{
                res.json(book)
            })
            .catch(next);
    }
    getone(req,res,next){
        Book.findById({_id: req.params.id})
            .then((book)=>{
                res.json(book)
            })
            .catch(next)
    }
    create(req,res,next){
        const book = new Book(req.body);
        book.save()
            .then(()=>res.redirect('/book/'))
            .catch(next);
    }
    update(req,res,next){
        Book.updateOne({_id: req.params.id},req.body)
            .then(()=>res.sendStatus(200))
            .catch(next);
    }
    delete(req,res,next){
        Book.delete({_id: req.params.id})
            .then(()=>res.sendStatus(200))
            .catch(next);
    }
}
module.exports= new BookController()