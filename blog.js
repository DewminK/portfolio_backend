const mongoose = require('./db'); //this is one of end point that connect in index.js

const blogSchema = new mongoose.Schema({ //describes about project schema
    User_id: String,
    User_name: String,
    
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;