import type { Metadata } from "next";
import { privacy, site } from "@/content/site";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: privacy.title,
  description: privacy.description,
  alternates: { canonical: "/privacy" },
};

// REPLACE: layout template — the final text must be approved by a lawyer (copy lives in site.ts)
export default function Privacy() {
  return (
    <>
      <header className="container" style={{ height: "var(--header-h)", display: "flex", alignItems: "center" }}>
        <a href="/" className="caps" style={{ fontSize: 15, letterSpacing: "0.28em" }}>
          ← {site.name.replace(" ", "\u00a0")}
        </a>
      </header>
      <main id="main" className="container section" style={{ maxWidth: 820 }}>
        <h1 className="h2">{privacy.title}</h1>
        <div style={{ display: "grid", gap: 20, marginTop: 40 }} className="lead">
          <p>{privacy.intro}</p>
          <p>
            {privacy.storage}{" "}
            <a href={`mailto:${site.email}`} style={{ textDecoration: "underline" }}>
              {site.email}
            </a>
            .
          </p>
          <p>{privacy.law}</p>
        </div>
      </main>
      <Footer anchorBase="/" />
    </>
  );
}
