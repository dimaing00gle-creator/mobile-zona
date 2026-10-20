import Image from "next/image";
import { OffscreenPause } from "../OffscreenPause";
import styles from "./Hero.module.css";

type Props = { src: string; alt: string };

/** First-screen background photo: a soft zoom-in, slow "breathing" and a single sheen (all in CSS) */
export function HeroMedia({ src, alt }: Props) {
  return (
    <OffscreenPause className={styles.media}>
      <div className={styles.layer}>
        <Image src={src} alt={alt} fill priority sizes="100vw" className={styles.img} />
        <span className={styles.sheen} aria-hidden="true" />
      </div>
    </OffscreenPause>
  );
}
