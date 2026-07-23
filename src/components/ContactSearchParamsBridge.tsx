"use client";

import { useSearchParams } from "next/navigation";
import Contact from "./Contact";

/**
 * The only useSearchParams() call site in the app. Isolated here so the
 * Suspense boundary Next requires around it (a hard `next build` failure
 * otherwise) wraps only this small island, not the whole homepage.
 */
export default function ContactSearchParamsBridge() {
  const project = useSearchParams().get("project");
  return <Contact initialProject={project ?? undefined} />;
}
