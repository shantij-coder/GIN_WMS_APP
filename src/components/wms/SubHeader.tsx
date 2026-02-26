import { format } from "date-fns";
import { User, Clock } from "lucide-react";

interface SubHeaderProps {
  username?: string;
}

const SubHeader = ({ username = "SBJ" }: SubHeaderProps) => {
  const now = format(new Date(), "dd MMM yyyy · hh:mm a");

  return (
    <div className="border-b bg-card/80 px-4 py-2 backdrop-blur-sm transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
            <User className="h-3 w-3 text-primary" />
          </div>
          <span className="text-card-code font-semibold tracking-tight text-card-foreground">{username}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-3 w-3 text-muted-foreground/70" />
          <span className="text-badge font-medium text-muted-foreground/80 tabular-nums tracking-wide">{now}</span>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
