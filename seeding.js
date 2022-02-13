const pool = require('./config/connection')
const fs = require('fs')

const dataAuthors = JSON.parse(fs.readFileSync('./authors.json', 'utf-8'))
const dataPosts = JSON.parse(fs.readFileSync('./posts.json', 'utf-8'))

let queryAuthors = `INSERT INTO "Authors" ("fullName", gender) values`
let queryPosts = `INSERT INTO "Posts" ( title, difficulty, "estimatedTime", description, "totalVote", "imageUrl", "createdDate", "AuthorId") values`

dataAuthors.forEach((author, i) => {
    if(i === dataAuthors.length -1)  queryAuthors += `( '${author.fullName}', '${author.gender}')`
    else queryAuthors += `( '${author.fullName}', '${author.gender}'),`
})
dataPosts.forEach((posts, i) => {
    if(i === dataPosts.length -1)  queryPosts += `('${posts.title}', '${posts.difficulty}', '${posts.estimatedTime}', '${posts.description}', '${posts.totalVote}', '${posts.imageUrl}', '${posts.createdDate}', '${posts.authorId}')`
    else queryPosts += `('${posts.title}', '${posts.difficulty}', '${posts.estimatedTime}', '${posts.description}', '${posts.totalVote}', '${posts.imageUrl}', '${posts.createdDate}', '${posts.authorId}'),`
})

console.log(queryAuthors)

pool.query(queryAuthors, err => {
    if(err) return console.log(err)
    console.log(`updated Authors table`)

    pool.query(queryPosts, err => {
        if(err) return console.log(err)
        console.log(`updated Posts table`)
    })
})