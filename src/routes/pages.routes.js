const express = require("express");
const router = express.Router();

const repo = require("../lib/projects.repository");

// GET /
router.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// GET /about
router.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// GET /projects?q=term
router.get("/projects", (req, res) => {
  const q = (req.query.q || "").trim();
  const projects = q ? repo.searchActive(q) : repo.getActiveProjects();
  res.render("projects", { title: "Projects", projects, q });
});

// GET /projects/:slug
router.get("/projects/:slug", (req, res) => {
  const slug = req.params.slug;
  const project = repo.findBySlug(slug);

  if (!project || project.status !== true) {
    return res
      .status(404)
      .render("404", { title: "Not Found", path: req.originalUrl });
  }

  const otherProjects = repo.getActiveProjects().filter((p) => p.slug !== slug);

  res.render("project-details", {
    title: project.title,
    project,
    otherProjects,
    layout: "layouts/layout-sidebar",
  });
});

// GET /contact
router.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact" });
});

// POST /contact
router.post("/contact", (req, res) => {
  console.log("CONTACT SUBMISSION: ", req.body);

  res.render("contact-success", {
    title: `Thank you, ${req.body.name}! We have received your message.`,
    data: req.body,
  });
});

router.get("/404", (req, res) => {
  res.status(404).render("404", { title: "Not Found", path: req.originalUrl });
});

module.exports = router;
