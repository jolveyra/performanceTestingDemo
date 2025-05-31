const express = require('express');

const app = express();

app.use(express.json());

app.post('/tasks', (req, res) => {
    const { title, description } = req.body;

    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'Title is required and must be a string.' });
    }

    if (description && typeof description !== 'string') {
        return res.status(400).json({ error: 'Description must be a string if provided.' });
    }

    const newTask = {
        id: Date.now(), 
        title,
        description: description || '',
    };


    return res.status(201).json({ message: 'Task created successfully', task: newTask });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
