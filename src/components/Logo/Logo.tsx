import { common, site } from "@/content/site";

type Props = {
  className?: string;
  /** На головній — «#top», на інших сторінках — «/» */
  href?: string;
};

export function Logo({ className, href = "#top" }: Props) {
  return (
    <a href={href} className={className} aria-label={common.logoLabel}>
      <span aria-hidden="true">{site.name.replace(" ", " ")}</span>
    </a>
  );
}
