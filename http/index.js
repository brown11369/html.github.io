const http = require("http")
const fs = require("fs")
const url = require("url")
const { json } = require("stream/consumers")
ext = console.log



const server = http.createServer((req, res) => {

    const parsedurl = url.parse(req.url, true);
    let id = parsedurl.query.id;

    if (req.method === "GET" && parsedurl.pathname === "/products") {

        let phones = fs.readFileSync("./products.json", { encoding: "utf-8" })

        if (parsedurl.query.id === undefined) {
            res.write(phones)
            res.end()
        }
        else {
            let pro = JSON.parse(phones);
            pn = pro.find((product, ind) => {
                return Number(product.id) === Number(id)
            })
            if (pn !== undefined) {
                res.write(JSON.stringify(pn))
                res.end();
            }
            else {
                res.write(JSON.stringify({ message: "Invalid Product id" }))
                res.end();
            }

        }


    }
    else if (req.method === "DELETE") {
        res.write("I am Delete Method")
        res.end();
    }
    else if (req.method === "POST") {
        res.write("I am Post Method")
        res.end()
    }
    else if (req.method === "PUT") {
        res.write("I am Put Method")
        res.end();
    }
    else if (req.method === "PATCH") {
        res.write("I am Patch Method")
        res.end();
    }


    res.end();


})

server.listen(8000, () => {
    ext("server up and running")
})