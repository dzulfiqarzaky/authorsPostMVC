const authorDetail = `select a.id, a."fullName", a.gender, 
count(p.title)::integer as "totalPost", 
coalesce(sum(p."totalVote"), 0)::integer as "totalVote",
coalesce(avg(p."estimatedTime"),0)::integer as "averageTime"
from "Authors" a 
left join "Posts" p ON a.id = p."AuthorId" 
group by a.id
order by a.id`

const postDetail = `SELECT p.*, a."fullName" AS "authorName"  FROM "Posts" p 
JOIN "Authors" a ON p."AuthorId" = a.id `

module.exports = {
    authorDetail,
    postDetail
}