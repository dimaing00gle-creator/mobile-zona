import { Fragment, type CSSProperties } from "react";
import Image from "next/image";
import { services, servicesAi, servicesBlock } from "@/content/site";
import { pad2 } from "@/lib/format";
import { AiStage } from "./AiStage";
import { LeadButton } from "../LeadButton";
import { SectionHead } from "../SectionHead";
import styles from "./Services.module.css";

const { image, robot, cta } = servicesBlock;

export function Services() {
  // Наскрізний номер слова — для поступової появи тексту «як пише ШІ»
  let word = 0;
  const lastWord = servicesAi.join(" ").split(" ").length - 1;

  return (
    <section id="services" className={`section ${styles.section}`} aria-labelledby="services-title">
      <div className="container">
        {/* На десктопі фото — фоном під заголовком на всю ширину екрана, з ШІ-анімацією */}
        <AiStage className={styles.stage}>
          <SectionHead
            id="services-title"
            title={<span className={styles.title}>{servicesBlock.title}</span>}
          />

          {/* Текст під заголовком, поверх фото — лише десктоп */}
          <p className={styles.note}>
            {servicesAi.map((line, k) => (
              <Fragment key={line}>
                {/* пробіл між реченнями — для пошуковиків і скрінрідерів */}
                {k > 0 && " "}
                <span>
                  {line.split(" ").map((w, j) => {
                    const i = word++;
                    return (
                      <Fragment key={j}>
                        {j > 0 && " "}
                        <span
                          className={styles.word}
                          data-last={i === lastWord || undefined}
                          style={{ "--i": i } as CSSProperties}
                        >
                          {w}
                        </span>
                      </Fragment>
                    );
                  })}
                </span>
              </Fragment>
            ))}
          </p>

          <div className={styles.media}>
            <div className={styles.bleed}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1200px) 100vw, (max-width: 860px) 100vw, 820px"
                className={styles.img}
              />

              {/* Шари анімації: вуаль, сітка точок, лінія сканера, імпульс у рукостисканні */}
              <div className={styles.fx} aria-hidden="true">
                <span className={styles.veil} />
                <span className={styles.dots} />
                <span className={styles.beam} />
                <span className={styles.pulse}>
                  <span className={styles.core} />
                  <span className={styles.ring} />
                  <span className={styles.ring} />
                  <span className={styles.ring} />
                </span>
              </div>
            </div>
          </div>
        </AiStage>

        <div className={styles.grid}>
          <div className={styles.listWrap}>
            {/* Робот-помічник ліворуч від списку — лише десктоп: тримається на місці й пурхає */}
            <div className={styles.robotRail} aria-hidden="true">
              <div className={styles.robot}>
                <Image
                  src={robot.src}
                  alt=""
                  width={robot.width}
                  height={robot.height}
                  sizes="88px"
                  className={styles.robotImg}
                />
                <span className={styles.robotShadow} />
              </div>
            </div>

            <ol className={styles.list}>
              {services.map((s, i) => (
                <li key={s.title} className={styles.item}>
                  <span className={styles.num}>{pad2(i + 1)}</span>
                  <h3 className="h3">{s.title}</h3>
                  <p className="muted">
                    {s.text.split("\n").map((part, k) => (
                      <Fragment key={k}>
                        {/* пробіл перед br — щоб без переносу (планшет, телефон) слова не злипались */}
                        {k > 0 && (
                          <>
                            {" "}
                            <br className={styles.br} />
                          </>
                        )}
                        {part}
                      </Fragment>
                    ))}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <aside className={styles.aside}>
            <p className="lead">{servicesBlock.asideText}</p>
            <LeadButton topic={cta.topic} interest={cta.interest}>
              {cta.label}
            </LeadButton>
          </aside>
        </div>
      </div>
    </section>
  );
}
