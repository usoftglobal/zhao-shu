import {Db} from "./src/db.js"
import fs from 'fs';
import path from 'path';

const db = new Db()

const downloadPath = 'C:\\Users\\Administrator\\Downloads\\'

var files = [
    "pilimi-zlib-120000-419999",
    "pilimi-zlib-5330000-5359999",
    // "pilimi-zlib-5380000-5449999",
    // "pilimi-zlib-2830000-5239999",
    // "pilimi-zlib-2380000-2829999",
    // "pilimi-zlib-420000-2379999",
    // "pilimi-zlib-5240000-5329999",
    // "pilimi-zlib-0-119999",
    // "pilimi-zlib-5360000-5379999",
]

for (var i=0; i<files.length;i++){

    const files_dir = files[i]

    const pilimi_torrent = files_dir + ".torrent"
    const books = await db.syncQuery('select zlibrary_id, title, extension, pilimi_torrent from books where pilimi_torrent="'+pilimi_torrent+'"')

    // 没有书籍跳过处理
    if (books.length == 0) {
        continue
    }

    const sourceDir = downloadPath + files_dir

    // 新目录名称
    const new_dir_name = (files_dir).replace("pilimi-zlib-", "")
    console.log("开始处理", new_dir_name)

    // 新建目录
    await db.syncMkdir(new_dir_name)

    // 移动文件并重命名、标记已处理
    for (var j=0; j < books.length; j++){

        const book = books[j]

        // 移动文件并补充扩展名
        var sourceFile = sourceDir+"/"+book.zlibrary_id;
        var destPath = path.join(new_dir_name, book.zlibrary_id + "." + book.extension);
        var readStream = fs.createReadStream(sourceFile);
        var writeStream = fs.createWriteStream(destPath);
        readStream.pipe(writeStream);

        // 标记已处理
    }
}

// const books = await db.syncQuery('select title, extension, author, count(zlibrary_id) as c from books group by title, extension,author having c >1 order by c desc')

// for(var i=0; i<books.length;i++) {
//     const element = books[i];

//     try {
        
//         // 单引号不支持
//         // const cond = "title='" + element.title + "' and author='" + element.author + "' and extension='" + element.extension + "'"
        
//         // 双引号不支持
//         const cond = 'title="' + element.title + '" and author="' + element.author + '" and extension="' + element.extension + '"'
        
//         const fin = await db.syncQuery(
//             //"select zlibrary_id from books where "+cond+" order by year desc, filesize desc limit 1"
//             'select zlibrary_id from books where '+cond+' order by year desc, filesize desc limit 1'
//         )

//         // const sql = "delete from books where "+ cond +" and zlibrary_id <>" + fin[0].zlibrary_id
//         const sql = 'delete from books where '+ cond +' and zlibrary_id <>' + fin[0].zlibrary_id

//         console.log("开始执行", element.title, sql)

//         await db.syncDelete(sql)
//     } catch (error) {
//         // 忽略报错
//     }
// }
process.exit()