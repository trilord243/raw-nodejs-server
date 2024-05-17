import http from 'http';
import fs from "fs"

const server =http.createServer( (req,res)=>{

if(req.url === '/'){
    console.log(req.method)
    res.setHeader('Content-Type','text/html')
    res.write('<html>')
    res.write('<head><title>My first page</title></head>')
    res.write('<body>  <form action="/message" method="POST"  > <input type="text" name="message"/> <button> Message</button>   </form>      </body>')
    res.write('<html>')
    return res.end()


}

else if (req.url==="/message" && req.method === 'POST'){
    const body=[]
    req.on("data",(chunk)=>{
        console.log(chunk)
        body.push(chunk)


    } )
    return req.on("end", () => {
        const parsedBody = Buffer.concat(body).toString();
        const message= parsedBody.split('=')[1];
        console.log(message);

    fs.writeFile('message.txt',message, (err)=>{  res.statusCode = 302
        res.setHeader("Location","/")
        return res.end()})


    });


}


    res.write('<html>')
    res.write('<head><title>My first page</title></head>')
    res.write('<body><h1>Message</h1></body>')
    res.write('<html>')
    res.end()

} )

server.listen(3000)
