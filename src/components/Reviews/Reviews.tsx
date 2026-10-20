import { reviews, reviewsBlock, reviewsSummary } from "@/content/site";
import { SectionHead } from "../SectionHead";
import { ArrowUpRight, Star } from "../icons";
import styles from "./Reviews.module.css";

export function Reviews() {
  return (
    <section id="reviews" className="section" aria-labelledby="reviews-title">
      <div className="container">
        <SectionHead id="reviews-title" title={reviewsBlock.title} />
      </div>

      <ul className={`reveal-stagger ${styles.list}`}>
        {reviews.map((r) => (
          <li key={r.id} className={styles.card}>
            <figure>
              <p className={styles.cardStars} aria-label={reviewsBlock.ratingLabel(r.rating)}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} filled={i < r.rating} />
                ))}
              </p>
              <blockquote className={styles.quote}>
                <p>«{r.text}»</p>
              </blockquote>
              <figcaption className={styles.author}>
                <span className={styles.avatar} aria-hidden="true">
                  {r.name.charAt(0)}
                </span>
                <span>
                  <strong>{r.name}</strong>
                  <span className="muted">
                    {r.store} · {r.date}
                  </span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className={`container ${styles.more}`}>
        <a href={reviewsSummary.href} className="link-arrow" target="_blank" rel="noopener noreferrer">
          {reviewsBlock.allLink}
          <ArrowUpRight />
        </a>
      </div>
    </section>
  );
}
