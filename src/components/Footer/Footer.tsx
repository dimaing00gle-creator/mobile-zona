import { footer, nav, site, stores } from "@/content/site";
import { telHref } from "@/lib/format";
import { Logo } from "../Logo";
import styles from "./Footer.module.css";

type Props = {
  /** Anchor prefix: empty on the home page, "/" on other pages so links lead back home */
  anchorBase?: "" | "/";
};

export function Footer({ anchorBase = "" }: Props) {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo className={styles.logo} href={anchorBase || "#top"} />
          <p className="muted">{footer.tagline}</p>
        </div>

        <nav aria-label={footer.navLabel}>
          <p className={`caps ${styles.title}`}>{footer.sections}</p>
          <ul className={styles.links}>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={anchorBase + item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className={`caps ${styles.title}`}>{footer.stores}</p>
          <ul className={styles.links}>
            {stores.map((s) => (
              <li key={s.id}>
                <a href={`${anchorBase}#stores`}>
                  {s.city}, {s.address}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={`caps ${styles.title}`}>{footer.contacts}</p>
          <ul className={styles.links}>
            <li>
              <a href={telHref(site.phone)}>{site.phone}</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={`caps ${styles.motto}`}>
          <span className={styles.dash} aria-hidden="true" />
          {footer.motto}
        </p>
        <p className={styles.legal}>
          <span>© {new Date().getFullYear()} {site.name}</span>
          <a href="/privacy">{footer.privacy}</a>
        </p>
      </div>
    </footer>
  );
}
