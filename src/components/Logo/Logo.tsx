import { common, site } from "@/content/site";

type Props = {
  className?: string;
  /** "#top" on the home page, "/" on other pages */
  href?: string;
};

export function Logo({ className, href = "#top" }: Props) {
  return (
    <a href={href} className={className} aria-label={common.logoLabel}>
      <span aria-hidden="true">{site.name.replace(" ", "\u00a0")}</span>
    </a>
  );
}
