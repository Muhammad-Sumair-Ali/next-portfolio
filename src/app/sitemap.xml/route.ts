import { Project } from "@/hooks/useApi";

function xmlEscape(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function fetchProjectSlugs(): Promise<Project[]> {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/project/get`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function GET() {
  const base =
    (process.env.BASE_URL || "https://muhammad-sumair.vercel.app").replace(/\/$/, "");

  const staticRoutes = [
    "/",
    "/about",
    "/projects",
    "/contact",
    "/guestbook",
  ];

  const projectSlugs = await fetchProjectSlugs();
 const projectRoutes = projectSlugs.map((slug) => `/project/${slug._id}`);


  const urls = [...staticRoutes, ...projectRoutes];
  const lastmod = new Date().toISOString();

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map((path) => {
        const loc = xmlEscape(`${base}${path}`);
        const priority = path === "/" ? "1.0" : "0.8";
        return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>${priority}</priority></url>`;
      })
      .join("\n") +
    `\n</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
