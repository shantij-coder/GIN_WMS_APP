import { MoreVertical, Package, CheckCircle } from "lucide-react";
import CapacityBar from "./CapacityBar";
import InlineAlert from "./InlineAlert";

export interface ItemData {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  imageUrl?: string;
  assortment?: string;
  status: "pending" | "confirmed" | "error";
  binCode?: string;
  binCapacity?: number;
  alert?: {
    type: "info" | "warn" | "error";
    message: string;
    itemOverride?: boolean;
  };
}

interface ItemCardProps {
  item: ItemData;
  onProceed?: () => void;
  onDismissAlert?: () => void;
}

const ItemCard = ({ item, onProceed, onDismissAlert }: ItemCardProps) => {
  const isConfirmed = item.status === "confirmed";

  return (
    <div className={`animate-card-enter rounded-xl border border-border/50 bg-card shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98] ${isConfirmed ? "opacity-80" : ""}`}>
      <div className="flex gap-3 p-4">
        {/* Item Image 64x64 */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-muted/50 border border-border/50">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
          ) : (
            <Package className="h-8 w-8 text-muted-foreground/50" />
          )}
        </div>

        {/* Item Details */}
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-start justify-between">
            <p className="text-card-name text-card-foreground font-semibold tracking-tight leading-tight">{item.name}</p>
            <div className="flex items-center gap-2">
              {/* Quantity Badge */}
              <span className="flex h-7 min-w-[1.75rem] items-center justify-center rounded-full bg-primary px-1.5 text-badge font-bold text-primary-foreground shadow-sm">
                {item.quantity}
              </span>
              {!isConfirmed && (
                <button className="min-h-0 min-w-0 p-1 text-muted-foreground hover:text-foreground transition-colors">
                  <MoreVertical className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          <p className="font-mono text-card-code text-muted-foreground">{item.sku}</p>

          {item.assortment && (
            <span className="inline-flex w-fit items-center rounded-md bg-secondary px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-secondary-foreground">
              {item.assortment}
            </span>
          )}

          {/* Bin info */}
          {item.binCode ? (
            <div className="mt-2 space-y-1.5">
              <p className="text-card-code text-muted-foreground">
                Bin: <span className="font-mono font-medium text-card-foreground">{item.binCode}</span>
              </p>
              {item.binCapacity !== undefined && (
                <CapacityBar percentage={item.binCapacity} />
              )}
            </div>
          ) : (
            <p className="mt-2 text-card-code text-muted-foreground italic">Not assigned</p>
          )}
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center justify-between border-t border-border/50 px-4 py-2.5 bg-muted/20">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide ${
          isConfirmed ? "bg-success/15 text-success" :
          item.status === "error" ? "bg-destructive/15 text-destructive" :
          "bg-muted text-muted-foreground"
        }`}>
          {isConfirmed && <CheckCircle className="h-3 w-3" />}
          {item.status === "pending" ? "Pending" : item.status === "confirmed" ? "Confirmed" : "Error"}
        </span>
      </div>

      {/* Inline Alert */}
      {item.alert && (
        <div className="border-t px-4 py-3">
          <InlineAlert
            type={item.alert.type}
            message={item.alert.message}
            itemOverride={item.alert.itemOverride}
            onProceed={item.alert.type === "warn" ? onProceed : undefined}
            onDismiss={onDismissAlert}
            dismissable={item.alert.type !== "error"}
          />
        </div>
      )}
    </div>
  );
};

export default ItemCard;
