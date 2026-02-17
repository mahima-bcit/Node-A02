const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const DATA_PATH = path.join(__dirname, '..', 'data', 'projects.json');

function readProjectsFile() {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    const parsed = JSON.parse(raw);

    if (!parsed || !Array.isArray(parsed.projects)) {
        throw new Error('Invalid projects.json format (expected { projects: [] })');
    }
    return parsed.projects;
}

// 1) List Projects
router.get('/projects', (req, res) => {
    try {
        const q = (req.query.q || '').toString().trim().toLowerCase();
        const allProjects = readProjectsFile();

        // active only for list
        let activeProjects = allProjects.filter((p) => p.active === true);

        if (q) {
            activeProjects = activeProjects.filter((p) => {
                const hayStack = [
                    p.title,
                    p.tagline,
                    p.description,
                    ...(p.stack || []),
                    ...(p.tags || []),
                ]
                .join(' ')
                .toLowerCase();

                return hayStack.includes(q);
            });
        }

        return res.status(200).json(activeProjects);
    } catch(err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error'});
    }
});

// 2) Project Details
router.get('/projects/:id', (req, res) => {
    try {
        const id = req.params.id;
        const allProjects = readProjectsFile();

        const project = allProjects.find((p) => p.id === id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        return res.status(200).json(project);
    } catch(err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

// 404 Handling for unknown API routes
router.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

module.exports = router;