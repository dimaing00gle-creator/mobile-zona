import type { ReactNode } from "react";
import styles from "./SectionHead.module.css";

type Props = {
  title: ReactNode;
  id?: string;
  aside?: ReactNode;
};

export function SectionHead({ title, id, aside }: Props) {
  return (
    <div className={styles.head}>
      <h2 className="h2" id={id}>
        {title}
      </h2>
      {aside && <div className={styles.aside}>{aside}</div>}
    </div>
  );
}
