import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const LoadingSpinner = ({ className }: { className?: string }) => (
  <Loader2 className={cn("my-28 h-16 w-16 text-primary/60 animate-spin", className)} />
);

export default LoadingSpinner;
