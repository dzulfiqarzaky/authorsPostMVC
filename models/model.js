const pool = require('../config/connection')
const Factory = require('./class')
const {authorDetail, postDetail} = require('./query')
class Model {

    static getAuthor( cb ){
        pool.query('SELECT * from "Authors"', (err, res) => {
           if(err) return cb(err)
           const authors = Factory.createAuthor(res.rows)
            cb(err, authors)
        })
    }

    static getPost( cb){
        pool.query('SELECT * from "Posts"', (err, res) => {
           if(err) return cb(err)
           const posts = Factory.createPost(res.rows)
            cb(err, posts)
        })
    }

    static author(cb){
        this.getAuthor((err, res) => {
            if(err) return cb(err)
            cb(err, res)
        })
    }

    static post({search},cb){
        this.getPost((err,res) => {
            if(err) return cb(err)
            if(!search) return cb(err, res)
            
            let query = `select * from "Posts" 
            where lower(title) LIKE '%${search.toLowerCase()}%'`

            pool.query(query, (err, result) => {
                if(err) cb(err)
                cb(err, result.rows)
            })   
        })
    }

    static authorDetail(cb){
        pool.query(authorDetail, (err, res) => {
            if(err) return cb(err)
            const authorDetails = Factory.createAuthorDetail(res.rows)
            cb(err, authorDetails)         
        })
    }

    static postById(id, cb){

        pool.query(postDetail, (err, res) => {
            if(err) return cb(err)
            const postsDetail = Factory.createdPostDetail(res.rows)
            const found = postsDetail.find(post => post.id === +id)
            cb(err, found)
        })
    }

    static addPostView(cb){
        this.getAuthor((err, res) => {
            if(err) return cb(err)
            cb(err, res)
        })
    }

    static addPost(postData, cb){
        this.getPost((err, res) => {
            if(err) return cb(err)
            const post = postData.body
            let query = `insert into "Posts" (title, difficulty, "estimatedTime", description, "totalVote", "imageUrl", "createdDate", "AuthorId") values`
            query += `('${post.title}', '${post.difficulty}', '${post.eTime}', '${post.desc}', '0', '${post.imgUrl}', '${post.cDate}', '${post.authorId}')`
            pool.query(query, (err,res) => {
                if(err) return cb(err)
                console.log(`berhasil input data ke db`)
            })
            cb(err, query)
        })
    }
    
    static editPostView(id, cb) {
        this.getPost((err, res) => {
            if(err) return cb(err)
            pool.query(postDetail, (err, res) => {
                if(err) return cb(err)
                this.getAuthor((err, authors) => {
                    if(err) return cb(err)
                    const postsDetail = Factory.createdPostDetail(res.rows)
                    const post = postsDetail.find(post => post.id === +id)
                    cb(err, [post , authors])
                })
            })
        })
    }

    static editPost(postData, cb){
        this.getPost((err, res) => {
            if(err) return cb(err)
            const post = postData.body
            const id = postData.params.id
            let query = `update "Posts" set`
            query += ` "title" = '${post.title}', "AuthorId" = '${post.authorId}', "difficulty" = '${post.difficulty}', "estimatedTime" = '${post.eTime}', "imageUrl" = '${post.imgUrl}', "createdDate" = '${post.cDate}', "description" = '${post.description}'`
            query += ` where id = ${id}`
            pool.query(query, (err, res) => {
                if(err) return cb(err)
                console.log(`added into table`)
                cb(null, null)
            })
        })
    }

    static deletePostById(id, cb){
        this.getPost((err, res) => {
            let query = `delete from "Posts" where id = ${id}`

            pool.query(query, (err, res) => {
                if(err) return cb(err)
                console.log(`deleted from table`)
                cb(null, null)
            })

        })
    }

    static votePostById(id, cb){
        let query = `update "Posts" set "totalVote" = "totalVote" + 1 where id = ${id}`
        pool.query(query, (err, res) => {
            if(err) return cb(err)
            console.log(`vote increased!`)
            cb(null, res)
        })
    }
}

module.exports = Model