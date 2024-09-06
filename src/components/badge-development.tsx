import { Badge } from "@/components/badge";
import clsx from "clsx";

export const BadgeDevelopment = ({ className }: { className?: string }) => {
  return (
    <Badge color="zinc" className={clsx("ml-2", className)}>
      <p className="text-xs">Still in Development</p>
    </Badge>
  );
};
