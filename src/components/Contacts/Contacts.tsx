import { contacts } from "@/content/site";
import { LeadForm } from "../LeadForm";
import { SectionHead } from "../SectionHead";
import styles from "./Contacts.module.css";

export function Contacts() {
  return (
    <section id="contacts" className={`section theme-dark ${styles.section}`} aria-labelledby="contacts-title">
      <div className="container">
        <SectionHead id="contacts-title" title={contacts.title} />

        <div className={styles.body}>
          <p className={`lead reveal ${styles.lead}`}>{contacts.lead}</p>

          <div id="request" className={`reveal ${styles.formWrap}`}>
            <h3 className={`h3 ${styles.formTitle}`}>{contacts.formTitle}</h3>
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
