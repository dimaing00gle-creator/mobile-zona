import Image from "next/image";
import { about } from "@/content/site";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className="section theme-dark" aria-labelledby="about-title">
      {/* Desktop: scroll track, the content sticks and the values replace each other */}
      <div className={styles.track}>
        <div className={`container ${styles.pin}`}>
          {/* heading is visually hidden but kept for SEO and screen readers */}
          <h2 id="about-title" className="visually-hidden">
            {about.title}
          </h2>

          <div className={styles.copy}>
            {about.text.map((t) => (
              <p key={t} className={styles.text}>
                {t}
              </p>
            ))}

            <ul className={styles.values}>
              {about.values.map((v) => (
                <li key={v.title}>
                  <h3 className={`caps ${styles.valueTitle}`}>{v.title}</h3>
                  <p className={`muted ${styles.valueText}`}>{v.text}</p>
                </li>
              ))}
              <li>
                <Image
                  src={about.logo.src}
                  alt={about.logo.alt}
                  width={480}
                  height={480}
                  sizes="140px"
                  className={styles.logo}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
