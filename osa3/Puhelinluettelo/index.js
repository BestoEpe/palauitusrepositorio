// Express app setup
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const Contact = require('./models/contact');

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

// API routes
app.get('/api/persons', async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/persons/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (contact) {
            res.json(contact);
        } else {
            res.status(404).json({ error: 'Contact not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Invalid ID format' });
    }
});

// Additional routes like POST, DELETE, PUT can be added here

// Error handling middleware
app.use((error, req, res, next) => {
    // Custom error handling logic
    res.status(500).send('Something broke!');
});

// Server setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});