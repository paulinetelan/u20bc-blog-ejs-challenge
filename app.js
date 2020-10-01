//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const posts = [];

const homeStartingContent = {
  title: "Home",
  content: "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
};
const aboutContent = {
  title: "About",
  content: "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui."
};
const contactContent = {
  title: "Contact",
  content: "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero."
};

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
})

app.get("/about", (req, res) => {
  res.render("about", {
    pageTitle: aboutContent.title,
    content: aboutContent.content
  });
})

app.get("/contact", (req, res) => {
  res.render("contact", {
    pageTitle: contactContent.title,
    content: contactContent.content
  });
})

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.titleText,
    content: req.body.contentText
  };
  posts.push(post);

  res.redirect("/");
});

app.get("/posts/:title", (req, res) => {
  const paramTitle = _.lowerCase(req.params.title);
  let postTitle = "";
  let postContent = "";

  let exists = false;
  posts.forEach((x) => {
    let title = _.lowerCase(x.title);
    if (title === paramTitle) {
      // save title and content for posts page
      postTitle = x.title;
      postContent = x.content;
      exists = true;
    }
  });

  if (exists) {
    res.render("post", {
      title: postTitle,
      content: postContent
    });
  } else {
    res.render("post", {
      title: "Post not found!",
      content: "Please enter a valid title."
    });
  }
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
