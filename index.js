const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());//This needs to be above any routes that will use req.body

require('dotenv').config();
const Project = require('./Project');
const Blog = require('./index'); // Import the Blog model

app.get('/', (req, res) => {
    res.send('Hello, World! I am Dewmin Kasmitha');
});

app.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//create the endpoint for updating a project by id
app.patch('/projects/:id', async (req, res) => {
   
    const { id } = req.params;
    try {
        const project = await Project.findById(req.params.id);
        if(project){
            project.set(req.body);
            const updatedProject = await project.save();
            res.json(updatedProject);

        }else{
            res.status(404).json({message: 'Project not found'});
        
        }
    }catch(err){
            res.status(500).json({message: err.message});
        
        }
    });


//Delete a project by id
app.delete('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            await Project.deleteOne({ _id: project._id }); // Using deleteOne method
            res.json({ message: 'Project deleted' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
 //Delete request dont have a body   

 //this is a crud application (C=Create, R=Read, U=Update, D=Delete)

app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//create an endpoint for creating a project
app.post('/projects', async (req, res) => {
    console.log(req);
    console.log(req.body);
    //res.send('Creating a project');
    
    const project = new Project(req.body);
    try {
        const newProject = await project.save();
        res.status(201).json(newProject);//201 status code means created
    } catch (err) {
        res.status(400).json({ message: err.message });//400 status code means bad request
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
