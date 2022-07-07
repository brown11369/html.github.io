const http = require("http");
const fs = require("fs");
const url = require("url");

// fs read and write

fs.writeFileSync("./data.txt","Hello World");

fs.writeFileSync("./data2.txt","Namaste Javascript");

fs.appendFileSync("./data.txt"," -----Hello World Second time ------- ");

let data=fs.readFileSync("./data2.txt",{encoding:"utf-8"});

fs.appendFileSync("./data.txt",data);

fs.unlinkSync("./data.txt");

// ***************************************


let server = http.createServer((req, res) => {

    let parsedurl = url.parse(req.url, true);
    let id = parsedurl.query.id;
    let products = fs.readFileSync("./products.json", { encoding: "utf-8" })
    let pro = JSON.parse(products)
    if (req.method === "GET" && parsedurl.pathname === "/products") {
        if (id === undefined) {
            res.write(products);
            res.end();
        }
        else {

            // let pro = JSON.parse(products)
            let product = pro.find((ele, ind) => {
                return Number(ele.id) === Number(id)
            })
            if (product !== undefined) {
                res.write(JSON.stringify(product));
                res.end();
            }
            else {
                res.write(JSON.stringify({ Message: `product id ${Number(id)} not found` }));
                res.end();
            }


        }

    }
    else if (req.method === "POST" && parsedurl.pathname === "/products") {
        let data = "";
        req.on("data", (chunck) => {
            data += chunck
        });
        req.on("end", () => {
            let dt = JSON.parse(data)
            pro.push(dt);
            fs.writeFile("./products.json", JSON.stringify(pro), (err) => {
                if (err === null) {
                    res.write(JSON.stringify({ Message: "Product has been created" }));
                    res.end();
                }
                else {
                    res.write(JSON.stringify({ Message: "some problem facing while creating product" }));
                    res.end();
                }
            })
        })
        res.write(JSON.stringify({ Message: "post request incoming" }));
        res.end();

    }
    else if (req.method === "DELETE" && parsedurl.pathname === "/products") {

        let delepro = pro.findIndex((ele, ind) => {
            return Number(ele.id) === Number(id)
        })

        if (delepro !== -1) {
            pro.splice(delepro, 1);
            fs.writeFileSync("./products.json", JSON.stringify(pro))
            res.write(JSON.stringify({ Message: "product  deleted" }));
            res.end();

        }
        else {
            res.write(JSON.stringify({ Message: "product not found" }));
            res.end();
        }


    }
    res.end();


})



server.listen(8000, () => {
    console.log("server up and running")
})