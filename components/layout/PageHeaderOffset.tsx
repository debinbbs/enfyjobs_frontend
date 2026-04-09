import { cn } from "@/lib/utils";

interface PageHeaderOffsetProps {
  children: React.ReactNode;
  className?: string;
  desktopOnly?: boolean;
}

export function PageHeaderOffset({
  children,
  className,
  desktopOnly = false,
}: PageHeaderOffsetProps) {
  return (
    <div
      className={cn(
        desktopOnly ? "md:pt-10 lg:pt-12" : "pt-24 md:pt-10 lg:pt-12",
        className,
      )}
    >
      {children}
    </div>
  );
}
