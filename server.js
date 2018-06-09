const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const mimeTypes = {
    "html" : "text/html",
    "jpeg" : "image/jpeg",
    "jpg" : "image/jpg",
    "png" : "image/png",
    "js": "text/javascript",
    "css": "text/css"
}

http.createServer(function(req, res){

    var uri = url.parse(req.url).pathname;
    var fileName = path.join(process.cwd(), unescape(uri));
    console.log("Loading  " + uri);

    var stats;

    try{

        stats = fs.lstatSync(fileName);

    }catch(e){
        res.statusCode = 404;
        res.setHeader("Content-type", "text/plain");
        res.end("404 Not Found! \n");

        return;

    }

    if(stats.isFile()){

        var mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
        //res.setHeader(200, {"Content-type": "mimeType"});
        res.statusCode = 200;
        res.setHeader("Content-type", "mimeType");
        res.end;

        var fileStream = fs.createReadStream(fileName);
        fileStream.pipe(res);
    } else if(stats.isDirectory){

        res.statusCode = 302;
        res.setHeader("location", "index.html");
        res.end("302 Not Found! \n");
        
    } else {
        res.statusCode = 500;
        res.setHeader("Content-type", "text/plain");
        res.end("500 Internal Error \n");

        
    }

}).listen(3000);
