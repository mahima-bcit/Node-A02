const express = require('express');
const path = require('path');

const router = express.Router();

const PAGES_DIR = path.join(__dirname, '..', 'pages');

function sendPage(res, fileName) {
    return res.sendFile(path.join(PAGES_DIR, fileName));
}

// Page Routes
router.get('/', (req, res) => sendPage(res, 'index.html'));
router.get('/about', (req, res) => sendPage(res, 'about.html'));
router.get('/projects', (req, res) => sendPage(res, 'projects.html'));
router.get('/contact', (req, res) => sendPage(res, 'contact.html'));

// Contact Route
router.post('/contact', (req, res) => {
    const name = (req.body.name || '').trim();
    const email = (req.body.email || '').trim();
    const message = (req.body.message || '').trim();

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: 'Please provide name, email, and message.',
        });
    }

    // Log Submission
    console.log('CONTACT SUBMISSION: ', { name, email, message });

    return res.status(200).json ({
        success: true,
        message: `Thank you, ${name}! We have received your message.`,
    });
});

module.exports = router;