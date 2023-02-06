import {Db} from "./src/db.js"
import fs from 'fs';
import path from 'path';

const db = new Db()

const downloadPath = 'C:\\Users\\Administrator\\Downloads\\'
const newParh = 'C:\\Users\\Administrator\\Desktop\\zhao-shu\\'

var files = [
    // "pilimi-zlib-120000-419999",
    // "pilimi-zlib-5330000-5359999",
    // "pilimi-zlib-5380000-5449999",
    // "pilimi-zlib-2830000-5239999",
    // "pilimi-zlib-2380000-2829999",
    // "pilimi-zlib-420000-2379999",
    // "pilimi-zlib-5240000-5329999",
    // "pilimi-zlib-0-119999",
    // "pilimi-zlib-5360000-5379999",

    // "pilimi-zlib-5450000-5479999",
    // "pilimi-zlib-5480000-5499999",
    // "pilimi-zlib-5500000-5519999",
    // "pilimi-zlib-5520000-5549999",
    // "pilimi-zlib-5550000-5579999",
    // "pilimi-zlib-5580000-5609999",
    // "pilimi-zlib-5610000-5639999",
    // "pilimi-zlib-5640000-5659999",
    // "pilimi-zlib-5660000-5709999",
    // "pilimi-zlib-5710000-5729999",

    // "pilimi-zlib-5730000-5749999",
    // "pilimi-zlib-5750000-5769999",
    // "pilimi-zlib-5770000-5789999",
    "pilimi-zlib-5790000-5809999",
    // "pilimi-zlib-5810000-6039999",
    // "pilimi-zlib-6040000-6069999",
    // "pilimi-zlib-6070000-6129999",
    // "pilimi-zlib-6130000-6159999",
    // "pilimi-zlib-6160000-7229999",
    // "pilimi-zlib-7230000-9459999",
    // "pilimi-zlib-9460000-10999999",
]

var filesLen = files.length

for (var i=0; i<filesLen;i++){

    const files_dir = files[i]

    const pilimi_torrent = files_dir + ".torrent"
    const books = await db.syncQuery('select zlibrary_id, title, extension, pilimi_torrent from books where pilimi_torrent="'+pilimi_torrent+'"')

    // 新目录名称
    const new_dir_name = (files_dir).replace("pilimi-zlib-", "")
    
    const pro = (i+1)+"/"+filesLen

    console.log(pro + "开始处理", new_dir_name)

    // 没有书籍跳过处理
    if (books.length == 0) {
        console.log(pro + "没有书籍，处理完成", new_dir_name)
        continue
    }

    const sourceDir = downloadPath + files_dir

    // 新建目录
    await db.syncMkdir(new_dir_name)

    // 复制文件并重命名、标记已处理
    for (var j=0; j < books.length; j++){

        const book = books[j]

        // 复制文件并补充扩展名
        var sourceFile = sourceDir+"/"+book.zlibrary_id;
        var destPath = path.join(newParh, new_dir_name, book.zlibrary_id + "." + book.extension);
        var readStream = fs.createReadStream(sourceFile);
        var writeStream = fs.createWriteStream(destPath);
        readStream.pipe(writeStream);

        // 标记已处理
        console.log(pro + " " + book.title + " ["+ (j+1)+"/" + books.length +"] 处理完成")
    }
    console.log(pro + "所有处理完成", new_dir_name)
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