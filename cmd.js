import {Db} from "./src/db.js"
import fs from 'fs';
import path from 'path';

const db = new Db()

const downloadPath = 'C:\\Users\\cuizi\\Documents\\'
const newParh = 'C:\\Users\\cuizi\\Documents\\zhao-shu'

// const downloadPath = 'D:\\'
// const newParh = 'D:\\zhao-shu'

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
    // "pilimi-zlib-5790000-5809999",
    // "pilimi-zlib-5810000-6039999",
    // "pilimi-zlib-6040000-6069999",
    // "pilimi-zlib-6070000-6129999",
    // "pilimi-zlib-6130000-6159999",
    // "pilimi-zlib-6160000-7229999",
    // "pilimi-zlib-7230000-9459999",
    // "pilimi-zlib-9460000-10999999",

    // "pilimi-zlib-11000000-11039999",
    // "pilimi-zlib-11040000-11079999",
    // "pilimi-zlib-11080000-11129999",
    // "pilimi-zlib-11130000-11169999",
    // "pilimi-zlib-11170000-11209999",
    // "pilimi-zlib-11210000-11269999",
    // "pilimi-zlib-11270000-11299999",
    // "pilimi-zlib-11300000-11329999",
    // "pilimi-zlib-11330000-11359999",
    // "pilimi-zlib-11360000-11399999",

    // "pilimi-zlib-11400000-11449999",
    // "pilimi-zlib-11500000-11549999",
    // "pilimi-zlib-11660000-11699999",
    // "pilimi-zlib-11700000-11729999",
    //"pilimi-zlib-11760000-11799999",
    // "pilimi-zlib-11970000-11999999",
    // "pilimi-zlib-11950000-11969999",
    // "pilimi-zlib-11930000-11949999",
    // "pilimi-zlib-11900000-11929999",
    // "pilimi-zlib-11860000-11899999",
    // "pilimi-zlib-11830000-11859999",
    // "pilimi-zlib-11800000-11829999",
    // "pilimi-zlib-11730000-11759999",
    // "pilimi-zlib-11600000-11659999",
    // "pilimi-zlib-11580000-11599999",
    // "pilimi-zlib-11550000-11579999",
    // "pilimi-zlib-11450000-11499999",

    // "pilimi-zlib-12000000-12039999",
    // "pilimi-zlib-12040000-12099999",
    // "pilimi-zlib-12100000-12159999",
    // "pilimi-zlib-12160000-12229999",
    // "pilimi-zlib-12230000-12349999",
    // "pilimi-zlib-12350000-12619999",
    // "pilimi-zlib-12620000-12769999",
    // "pilimi-zlib-12770000-12809999",
    // "pilimi-zlib-12810000-13229999",
    // "pilimi-zlib-13230000-13529999",
    // "pilimi-zlib-13530000-13849999",
    // "pilimi-zlib-13850000-13959999",
    // "pilimi-zlib-13960000-14029999",
    // "pilimi-zlib-14030000-14379999",
    // "pilimi-zlib-14380000-14679999",

    // "pilimi-zlib2-0-14679999-extra",
    // "pilimi-zlib2-14680000-14999999",
    // "pilimi-zlib2-15000000-15679999",


    // "pilimi-zlib2-15680000-16179999",
    // "pilimi-zlib2-16380000-16469999",
    // "pilimi-zlib2-16860000-16959999",
    // "pilimi-zlib2-17060000-17149999",
    // "pilimi-zlib2-17690000-17779999",
    // "pilimi-zlib2-17600000-17689999",
    // "pilimi-zlib2-16180000-16379999",

    // "pilimi-zlib2-21940000-22019999",
    // "pilimi-zlib2-22400000-22433982",

    // "pilimi-zlib2-16580000-16669999",
    // "pilimi-zlib2-21590000-21689999",
    // "pilimi-zlib2-22200000-22299999",
    // "pilimi-zlib2-22300000-22399999",

    // "pilimi-zlib2-22120000-22199999",

    // "pilimi-zlib2-17860000-17949999",
    // "pilimi-zlib2-16960000-17059999",
    // "pilimi-zlib2-16670000-16759999",
    // "pilimi-zlib2-21230000-21319999",

    // "pilimi-zlib2-16760000-16859999"
    // "pilimi-zlib2-17150000-17249999",

    // "pilimi-zlib2-16470000-16579999",
    // "pilimi-zlib2-17250000-17339999"

    // "pilimi-zlib2-17340000-17469999",
    // "pilimi-zlib2-19330000-21079999",
    
    // 正在处理
    // "pilimi-zlib2-17470000-17599999",
    // "pilimi-zlib2-17950000-18039999",

    "pilimi-zlib2-18810000-19019999"
    
]

var filesLen = files.length

for (var i=0; i<filesLen;i++){

    const files_dir = files[i]

    const pilimi_torrent = files_dir + ".torrent"
    const books = await db.syncQuery('select zlibrary_id, title, extension, pilimi_torrent from books where pilimi_torrent="'+pilimi_torrent+'"')

    // 新目录名称
    const new_dir_name = (files_dir).replace("pilimi-zlib", "")
    
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
        
        // 检测文件是否存在
        // if (!fs.existsSync(destPath)) {
        //     fs.copyFileSync(sourceFile, destPath)
        // }

        fs.copyFileSync(sourceFile, destPath)

        // var readStream = fs.createReadStream(sourceFile);
        // var writeStream = fs.createWriteStream(destPath);
        // readStream.pipe(writeStream);

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