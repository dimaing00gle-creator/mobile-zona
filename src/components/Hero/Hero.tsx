import { common, hero } from "@/content/site";
import { HeroMedia } from "./HeroMedia";
import { LeadButton } from "../LeadButton";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      {/* Фото — фоном усього першого екрана, з анімацією появи, відблиском і паралаксом */}
      <HeroMedia src={hero.image.src} alt={hero.image.alt} />

      <div className={`container ${styles.inner}`}>
        <h1 className={`h1 ${styles.title}`} id="hero-title">
          {hero.title.map((line, i) => (
            <span key={line}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
          <br />
          <em className={styles.accent}>{hero.titleAccent}</em>
        </h1>
        <p className={styles.lead}>{hero.lead}</p>
        <div className={styles.ctas}>
          <LeadButton topic={hero.ctaTopic}>{common.cta}</LeadButton>
        </div>
      </div>
    </section>
  );
}
