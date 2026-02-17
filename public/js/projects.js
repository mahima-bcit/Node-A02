const grid = document.getElementById("projects-container");
const detailsSection = document.getElementById("project-details");
const detailsContent = document.getElementById("details-content");
const closeBtn = document.getElementById("close-details");

function chip(text) {
  return `<span class="tag">${escapeHtml(text)}</span>`;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showList() {
  grid.style.display = "grid";
  detailsSection.style.display = "none";
  detailsContent.innerHTML = "";
}

function showDetails() {
  grid.style.display = "none";
  detailsSection.style.display = "block";
}

async function loadProjects(q = "") {
  showList();
  grid.innerHTML = `<p>Loading projects...</p>`;

  try {
    const url = q ? `/api/projects?q=${encodeURIComponent(q)}` : "/api/projects";
    const res = await fetch(url);

    if (!res.ok) throw new Error("Failed to load projects");

    const projects = await res.json();

    if (!projects.length) {
      grid.innerHTML = `<p>No projects found.</p>`;
      return;
    }

    grid.innerHTML = projects
      .map(
        (p) => `
          <article class="project-card">
            <h3>${escapeHtml(p.title)}</h3>
            <p class="tagline">${escapeHtml(p.tagline)}</p>

            <div class="tags">
              ${(p.stack || []).map((s) => chip(s)).join("")}
            </div>

            <button data-project-id="${escapeHtml(p.id)}">Details</button>
          </article>
        `
      )
      .join("");
  } catch (err) {
    console.error(err);
    grid.innerHTML = `<p class="error-message">Could not load projects. Please try again.</p>`;
  }
}

async function loadDetails(id) {
  showDetails();
  detailsContent.innerHTML = `<p>Loading details...</p>`;

  try {
    const res = await fetch(`/api/projects/${encodeURIComponent(id)}`);

    if (!res.ok) {
      if (res.status === 404) {
        detailsContent.innerHTML = `<p class="error-message">Project not found.</p>`;
        return;
      }
      throw new Error("Failed to load project details");
    }

    const p = await res.json();

    const cover = p.images?.find((img) => img.type === "cover") || p.images?.[0];
    const screenshot =
      p.images?.find((img) => img.type === "screenshot") || p.images?.[1];

    detailsContent.innerHTML = `
      <div class="details">
        <h2>${escapeHtml(p.title)}</h2>
        <p class="tagline">${escapeHtml(p.tagline)}</p>
        <p>${escapeHtml(p.description)}</p>

        <h4>Tags</h4>
        <div class="tags">
          ${(p.tags || []).map((t) => chip(t)).join("")}
        </div>

        <div class="details-images">
          ${
            cover
              ? `<figure>
                  <img src="${escapeHtml(cover.path)}" alt="${escapeHtml(cover.alt)}" />
                </figure>`
              : ""
          }
          ${
            screenshot
              ? `<figure>
                  <img src="${escapeHtml(screenshot.path)}" alt="${escapeHtml(
                  screenshot.alt
                )}" />
                </figure>`
              : ""
          }
        </div>
      </div>
    `;
  } catch (err) {
    console.error(err);
    detailsContent.innerHTML = `<p class="error-message">Could not load details. Please try again.</p>`;
  }
}

grid.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-project-id]");
  if (!btn) return;
  loadDetails(btn.dataset.projectId);
});

closeBtn.addEventListener("click", showList);

loadProjects();
