const pool = require('./config/connection')


const author = `create table if not exists "Authors"(
	id serial primary key,
	"fullName" varchar(120) not null,
	gender varchar(6) not null
);`

const posts = `create table if not exists "Posts" (
	id serial primary key,
	title varchar(100),
	difficulty varchar(6),
	"estimatedTime" integer,
	description text,
	"totalVote" integer,
	"imageUrl" varchar(100),
	"createdDate" date,
	"AuthorId" integer ,
	foreign key ("AuthorId") references "Authors"(id)
);`


pool.query(author, (err, res) => {
    if(err) return console.log(err)

    console.log(`berhasil buat table author`)

    pool.query(posts, (err, res) => {
        if(err) return console.log(err)

        console.log(`berhasil buat table posts`)
    })
})
