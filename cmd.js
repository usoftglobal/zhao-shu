import {Db} from "./src/db.js"

const db = new Db()

const books = await db.syncQuery('select title, extension, author, count(zlibrary_id) as c from books group by title, extension,author having c >1 order by c desc')

for(var i=0; i<books.length;i++) {
    const element = books[i];

    try {
        
        // 单引号不支持
        // const cond = "title='" + element.title + "' and author='" + element.author + "' and extension='" + element.extension + "'"
        
        // 双引号不支持
        const cond = 'title="' + element.title + '" and author="' + element.author + '" and extension="' + element.extension + '"'
        
        const fin = await db.syncQuery(
            //"select zlibrary_id from books where "+cond+" order by year desc, filesize desc limit 1"
            'select zlibrary_id from books where '+cond+' order by year desc, filesize desc limit 1'
        )

        // const sql = "delete from books where "+ cond +" and zlibrary_id <>" + fin[0].zlibrary_id
        const sql = 'delete from books where '+ cond +' and zlibrary_id <>' + fin[0].zlibrary_id

        console.log("开始执行", element.title, sql)

        await db.syncDelete(sql)
    } catch (error) {
        // 忽略报错
    }
}
process.exit()