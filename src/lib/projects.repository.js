const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', '..', 'data', 'projects.json');

function loadProjects() {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    const parsed = JSON.parse(raw);

    if (!parsed || !Array.isArray(parsed.projects)) return [];
    return parsed.projects;
}

function getActiveProjects() {
    return loadProjects().filter((p) => p && p.status === true);
}

function findById(id) {
    if (!id) return null;
    const all = loadProjects();
    return all.find((p) => p.id === id) || null;
}

function findBySlug(slug) {
    if (!slug) return null;
    const all = loadProjects();
    return all.find((p) => p.slug === slug) || null;
}

function normalizeTerm(q) {
    return String(q || '').trim().toLowerCase();
}

function includesCI(haystack, needle) {
    if (!haystack) return false;
    return String(haystack).toLowerCase().includes(needle);
}

function arrayIncludesCI(arr, needle) {
    if (!Array.isArray(arr)) return false;
    return arr.some((item) => includesCI(item, needle));
}

function matchesTerm(project, q) {
    const term = normalizeTerm(q);
    if (!term) return true;

    return (
        includesCI(project.title, term) ||
        includesCI(project.tagline, term) ||
        includesCI(project.description, term) ||
        arrayIncludesCI(project.stack, term) ||
        arrayIncludesCI(project.tags, term)
    );
}

function searchActive(q) {
    const term = normalizeTerm(q);
    const active = getActiveProjects();
    if (!term) return active;
    return active.filter((p) => matchesTerm(p, term));
}

module.exports = {
    loadProjects,
    getActiveProjects,
    findById,
    findBySlug,
    searchActive
};