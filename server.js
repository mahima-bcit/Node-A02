const express = require('express');
const morgan = require('morgan');
const path = require('path');

const pageRouter = require('./routers/pageRouter');
const apiRouter = require('./routers/apiRouter');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Routers
app.use('/', pageRouter);
app.use('/api', apiRouter);

// 404 Handling
// Unknown non-API routes
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// Basic error handler
app.use ((err, req, res, next) => {
    console.error(err);
    if (req.path.startsWith('/api')) {
        return res.status(500).json({
            error: 'Server error'
        });
    }
    res.status(500).send('Server error');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});