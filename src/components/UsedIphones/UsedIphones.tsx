import Image from "next/image";
import { usedIphones, usedIphonesBlock as block } from "@/content/site";
import { LeadButton } from "../LeadButton";
import { SectionHead } from "../SectionHead";
import styles from "./UsedIphones.module.css";

export function UsedIphones() {
  return (
    <section id="used-iphones" className="section" aria-labelledby="used-iphones-title">
      <div className="container">
        <SectionHead id="used-iphones-title" title={block.title} />

        <ul className={styles.grid} aria-label={block.listLabel}>
          {usedIphones.map((p) => (
            <li key={p.id} className={styles.card}>
              <div className={styles.media}>
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 1199px) 46vw, 310px"
                  className={styles.img}
                />
              </div>
              <div className={styles.body}>
                <h3 className={styles.title}>{p.model}</h3>
                <p className={styles.price}>{p.price}</p>
              </div>
              {/* Lead CTA keeps the model as context; aria-label names it for screen readers */}
              <LeadButton
                variant="ghost"
                size="sm"
                topic={block.ctaTopic}
                interest={block.interest(p.model)}
                ariaLabel={block.ctaLabel(p.model)}
                className={styles.cta}
              >
                {block.cta}
              </LeadButton>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
