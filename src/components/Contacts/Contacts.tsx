import { contacts, site } from "@/content/site";
import { telHref } from "@/lib/format";
import { LeadForm } from "../LeadForm";
import { SectionHead } from "../SectionHead";
import { ArrowUpRight } from "../icons";
import styles from "./Contacts.module.css";

export function Contacts() {
  return (
    <section id="contacts" className={`section theme-dark ${styles.section}`} aria-labelledby="contacts-title">
      <div className="container">
        <SectionHead id="contacts-title" title={contacts.title} />

        <div className={styles.grid}>
          <div className={styles.info}>
            <p className="lead">{contacts.lead}</p>

            <dl className={styles.list}>
              <div>
                <dt className="caps">{contacts.hotline}</dt>
                <dd>
                  <a href={telHref(site.phone)} className={styles.big}>
                    {site.phone}
                  </a>
                  <span>{site.hotlineHours}</span>
                </dd>
              </div>
              <div>
                <dt className="caps">{contacts.email}</dt>
                <dd>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </dd>
              </div>
              <div>
                <dt className="caps">{contacts.socials}</dt>
                <dd className={styles.socials}>
                  {site.socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label}
                      <ArrowUpRight size={14} />
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          <div id="request" className={styles.formWrap}>
            <h3 className={`h3 ${styles.formTitle}`}>{contacts.formTitle}</h3>
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
