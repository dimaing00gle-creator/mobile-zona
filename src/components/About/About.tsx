import Image from "next/image";
import { about } from "@/content/site";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className="section theme-dark" aria-labelledby="about-title">
      {/* Photo opens the block; it scrolls normally, the text below sticks on desktop */}
      <div className="container">
        <div className={styles.photo}>
          <Image
            src={about.photo.src}
            alt={about.photo.alt}
            fill
            sizes="(max-width: 1320px) 100vw, 1320px"
            className={styles.photoImg}
          />
        </div>
      </div>

      {/* Desktop: scroll track, the content sticks and the values replace each other */}
      <div className={styles.track}>
        <div className={`container ${styles.pin}`}>
          {/* heading is visually hidden but kept for SEO and screen readers */}
          <h2 id="about-title" className="visually-hidden">
            {about.title}
          </h2>

          <div className={styles.copy}>
            {/* Desktop only: phone mockup, the content below is placed on its screen */}
            <Image
              src={about.phone}
              alt=""
              width={580}
              height={905}
              sizes="640px"
              className={styles.phoneImg}
            />

            <div className={styles.screen}>
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
      </div>
    </section>
  );
}
