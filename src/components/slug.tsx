import { Badge, BadgeButton } from "@/components/badge";

interface SlugProps {
  href: string;
  children: string;
}

export const Slug = (props: SlugProps) => {
  return (
    <BadgeButton color="zinc" href={props.href}>
      /{props.children}
    </BadgeButton>
  );
};
