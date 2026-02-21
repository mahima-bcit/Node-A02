const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const pageRouter = require("./src/routes/pages.routes");
const apiRouter = require("./src/routes/api.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// View Engine (EJS) + Layouts
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layouts/layout-full"); // Default layout for all views

// Routers
app.use("/", pageRouter);
app.use("/api", apiRouter);

// 404 Handling
// Unknown non-API routes
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  if (req.originalUrl.startsWith("/api")) {
    return res.status(500).json({ error: "Server error" });
  }
  res
    .status(500)
    .render("500", { title: "Server Error", path: req.originalUrl });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
