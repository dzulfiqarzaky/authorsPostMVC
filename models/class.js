
class Author{
    constructor(id, fullName, gender){
        this.id = id
        this.fullName = fullName
        this.gender = gender
    }

    get formatName(){
        if(this.gender === 'Male') return `Mr. ${this.fullName}`
        if(this.gender === 'Female') return `Mrs. ${this.fullName}`
    }
}

class AuthorDetail extends Author{
    constructor(id, fullName, gender, totalPost, totalVote, averageTime){
        super(id, fullName, gender)
        this.totalPost = totalPost,
        this.totalVote = totalVote,
        this.averageTime = averageTime
    }
}

class Post {
    constructor(id, title, difficulty, totalVote){
        this.id = id,
        this.title = title,
        this.difficulty = difficulty,
        this.totalVote = totalVote
    }
}

class PostDetail extends Post {
    constructor(id, title, difficulty, totalVote, estimatedDate, description, imageUrl, createdDate, AuthorId, authorName){
        super(id, title, difficulty, totalVote)
        this.estimatedDate = estimatedDate,
        this.description = description,
        this.imageUrl = imageUrl,
        this.createdDate = createdDate,
        this.AuthorId = AuthorId,
        this.authorName = authorName
    }

    get formatCreatedDate(){
        const date = new Date(this.createdDate)
        return date.toISOString().substring(0, 10)
    }
}

class Factory {

    static createAuthor(authors){
        return authors.map(author => {
            return new Author(author.id, author.fullName, author.gender)
        })
    }

    static createAuthorDetail(authors){
        return authors.map(author => {
            return new AuthorDetail(author.id, author.fullName, author.gender, author.totalPost, author.totalVote, author.averageTime)
        })
    }

    static createPost(posts){
        return posts.map(post => {
            return new Post(post.id, post.title, post.difficulty, post.totalVote)
        })
    }

    static createdPostDetail(posts){
        return posts.map(post => {
            return new PostDetail(post.id, post.title, post.difficulty, post.totalVote, post.estimatedTime, post.description, post.imageUrl, post.createdDate, post.AuthorId, post.authorName)
        })
    }
}

module.exports = Factory