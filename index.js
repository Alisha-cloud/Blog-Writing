//in views folder we can store all ejs files
//in public folder we can store css files

const express = require("express");
const app = express();
const port = 8080;
const path = require("path");     //to use this folders in index.js, we need to require path
const { title } = require("process");
const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override");


app.use(express.urlencoded({extended : true}));      //when form is submitted by client, to understand the data by express.js 
app.use(methodOverride("_method"));
app.set("view engine", "ejs");                                //set view engine
app.set("views", path.join(__dirname, "views"));              

app.use(express.static(path.join(__dirname, "public")));

let posts = [{   
        id : uuidv4(),                  //not making const bcoz if we made we cannot delete the post
        title : "Why Regular Exercise Is Crucial for Your Health",
        content : "Regular exercise is not only important for weight management but also for overall health and well-being. In this blog post, we’ll discuss the many benefits of regular exercise and how you can incorporate it into your daily routine"
},
            {
        id : uuidv4(),        
        title : "Exploring the Future of Education",
        content :"Among interesting education blog topics could be how schools might look in the future. You could explore new tech and learning gadget ideas that might change how we learn. Thinking about the future could help students get ready for a world that’s always changing."
},
];

app.get("/posts", (req,res) => {
    res.render("index.ejs",{posts});
});

app.get("/posts/new", (req,res) => {     //in get request, info is coming in req parameters
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {       //in post request, info is coming in req body
    let {title, content} = req.body;
    let id = uuidv4();
    posts.push({id, title, content});
     res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {       //in post request, info is coming in req body
    let {id}= req.params;
    console.log(id);
    let post = posts.find((p) => id ==p.id);
    res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req, res) => {
    let {id}= req.params;
    let {title, content} = req.body;
    let post = posts.find((p) => id ==p.id);
    if(post){
        post.title=title;
        post.content=content;
    }
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let {id}= req.params;
     let post = posts.find((p) => id ==p.id);
     res.render("edit.ejs", {post});
});

app.delete("/posts/:id", (req, res) => {
     let {id}= req.params;
     posts = posts.filter((p) => id !==p.id);
     res.redirect("/posts");
});

app.listen(port, () => {
    console.log("Server is listening to 8080");
});

