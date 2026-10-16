import Image from "next/image";
import { site, socials } from "@/content/site";
import styles from "./Socials.module.css";

export function Socials() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="socials-title">
      <div className="container">
        <div className={styles.media}>
          <Image
            className={styles.image}
            src={socials.image.src}
            alt={socials.image.alt}
            width={socials.image.width}
            height={socials.image.height}
            sizes="(max-width: 767px) 100vw, 360px"
          />
          {/* caption band sits between the photo and the statue cut-out, so the figure overlaps it */}
          <h2 id="socials-title" className={`caps ${styles.title}`}>
            {socials.title}
          </h2>
          <Image
            className={styles.cutout}
            src={socials.image.cutout}
            alt=""
            aria-hidden="true"
            width={socials.image.width}
            height={socials.image.height}
            sizes="(max-width: 767px) 100vw, 360px"
          />
          <ul className={styles.list}>
            {site.socials.map((s) => (
              <li key={s.label}>
                <a className="btn btn--ghost" href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
