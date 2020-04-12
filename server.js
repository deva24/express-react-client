const options = require('./webpack.config');
const webpack = require("webpack");
const compiler = webpack(options);
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

console.log("Compiling...");
compiler.run((err, stat) =>
{
    if (err)
        console.error("Error in compilation " + err);   
    else
    {
        console.log("Compilation complete.");
        app.listen(3001, (err) =>
        {
            if (err)
                console.error("Error in express listen : " + err);
            else
                console.log("Express listening on 3001");
        });
    }
})

app.use((req,res,nxt)=>
{
    console.log("Requested : " + req.url);

    if(req.url==='/dist/bundle.js')
    {
        let resolvedPath = path.resolve(__dirname, "dist/bundle.js")
        console.log("Sent : " + resolvedPath);
        res.sendFile(resolvedPath);
        return;
    }

    let url1 = 'public'+req.url;
    let resolvedPath = path.resolve(__dirname,url1);

    fs.stat(resolvedPath,(err,stat)=>
    {
        if(err)
        {
            // if no file then send the usual index.html
            resolvedPath = path.resolve(__dirname,'public/index.html');
            console.log('Sent : ' + resolvedPath);
            res.sendFile(resolvedPath);
            return;
        }
        
        if(stat.isDirectory())
        {
            resolvedPath = path.resolve(resolvedPath,"index.html");
            console.log("Sent : " + resolvedPath);
            res.sendFile(resolvedPath);
        }
        else if(stat.isFile())
        {
            console.log("Sent : " + resolvedPath);
            res.sendFile(resolvedPath);
        }

    });
});

app.use(express.static("./public"));


