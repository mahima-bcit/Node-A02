const express = require("express");
const router = express.Router();

const repo = require("../lib/projects.repository");

// List Projects with optional search
router.get("/projects", (req, res) => {
  const q = (req.query.q || "").trim();
  const projects = q ? repo.searchActive(q) : repo.getActiveProjects();
  return res.json(projects);
});

// Project Details by ID
router.get("/projects/:id", (req, res) => {
  const project = repo.findById(req.params.id);

  if (!project || project.status !== true) {
    return res.status(404).json({ error: "Project not found" });
  }
  return res.json(project);
});

// JSON 404 for unknown API routes
router.use((req, res) => {
  res.status(404).json({ error: "API route not found" });
});

module.exports = router;
