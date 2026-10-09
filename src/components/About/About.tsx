import { about } from "@/content/site";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className="section theme-dark" aria-labelledby="about-title">
      {/* Десктоп: доріжка прокрутки, вміст «прилипає», а переваги змінюють одна одну */}
      <div className={styles.track}>
        <div className={`container ${styles.pin}`}>
          {/* заголовок прихований візуально, але лишається для SEO і скрінрідерів */}
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
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
