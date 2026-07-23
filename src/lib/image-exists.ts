import fs from "fs";
import path from "path";

/**
 * Resolves whether a real asset exists under /public for a given site-root path.
 * Server-only — the only fs call site in the image-placeholder system. Client
 * components (Work, CaseStudy) never call this directly; they receive the
 * resolved boolean as a prop from a Server Component.
 */
export function imageExists(publicPath: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", publicPath));
}
