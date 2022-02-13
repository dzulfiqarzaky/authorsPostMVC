const res = require("express/lib/response")
const Model = require("../models/model")

class Controller {

    static home(req, res){
        res.render('index')
    }

    static author(req, res){
        Model.author((err, authors) => {
            if(err) return res.send(err)
            res.render('authors', { authors })
        })
    }

    static authorDetail(req, res){
        Model.authorDetail((err, authorsDetail) => {
            if(err) return res.send(err)
            res.render('authorsDetail', {authorsDetail})
        })
    }

    static post(req, res){
        Model.post(req.query, (err, posts) => {
            if(err) return console.log(err)
            res.render('posts', { posts })
        })
    }

    static postById(req, res){
        Model.postById(req.params.id, (err, post) => {
            if(err) return console.log(err)
            res.render('postDetail', {post})
        })
    }

    static addPostView(req, res){     
        Model.addPostView( (err, data) => {
            if(err) return console.log(err)
            res.render('postAdd', {data})
        })
    }

    static addPost(req, res){
        Model.addPost(req, (err, data2) => {
            if(err) return console.log(err)
            res.redirect('/posts')
        })
    }

    static editPostByIdView(req, res){
        Model.editPostView(req.params.id, (err, [data, authors]) => {
            if(err) return res.send(err)
            console.log(data.formatCreatedDate)
            const id = req.params.id
            res.render('postEdit', {data, authors, id})
        })
    }

    static editPostById(req, res) {
        Model.editPost(req, (err, data) => {
            if(err) return res.send(err)
            res.redirect('/posts')
        })
    }

    static deletePostById(req, res){
        Model.deletePostById(req.params.id, (err, data) => {
            if(err) return res.send(err)
            res.redirect('/posts')
        })
    }

    static votePostById(req, res){
        // console.log(req.body)
        Model.votePostById(req.params.id, (err, data) => {
            if(err) return res.send(err)
            res.redirect(`/posts/${req.params.id}`)
        })
    }
}

module.exports = Controller