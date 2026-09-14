/**
 * PROJECTS DATA
 * ---------------------------------------------------------------------------
 * Add a project by adding an object to this array — the grid on the page
 * lays itself out automatically no matter how many you add.
 *
 * Fields:
 *   title       string   required
 *   description string   required — one or two sentences
 *   status      string   optional — e.g. "Live", "In progress", "Archived"
 *   tags        string[] optional — short tech/topic labels
 *   liveUrl     string   optional — link to the live site/demo
 *   codeUrl     string   optional — link to the source/repo
 *   image       string   optional — path to a screenshot, e.g. "assets/projects/foo.png"
 *
 * Leave liveUrl or codeUrl out entirely if a project doesn't have one —
 * the corresponding link just won't render.
 */
const PROJECTS = [
  {
    title: "Project One",
    description:
      "Replace this with a short, punchy description of what the project does and why you built it.",
    status: "In progress",
    tags: ["React", "Node.js"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Project Two",
    description:
      "Another placeholder — swap in your real project details in js/projects-data.js.",
    status: "Live",
    tags: ["Python", "FastAPI"],
    liveUrl: "#",
    codeUrl: "#",
  },
];
