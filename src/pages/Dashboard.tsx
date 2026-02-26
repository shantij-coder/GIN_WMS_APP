import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, PackagePlus, PackageMinus, ClipboardList, ScanLine, Moon, Sun } from "lucide-react";
import NavigationDrawer from "@/components/wms/NavigationDrawer";
import SubHeader from "@/components/wms/SubHeader";
import gerpIcon from "@/assets/gerp-icon.png";

const modules = [
  { id: "putaway", label: "Put Away", desc: "Scan & place items", icon: PackagePlus, gradient: "from-primary/15 to-primary/5", iconColor: "text-primary", path: "/bin-scan" },
  { id: "takeaway", label: "Take Away", desc: "Remove from bins", icon: PackageMinus, gradient: "from-info/15 to-info/5", iconColor: "text-info", path: "/takeaway" },
  { id: "picklist", label: "Pick List", desc: "Fulfil pick orders", icon: ClipboardList, gradient: "from-warn/15 to-warn/5", iconColor: "text-warn", path: "/picklist" },
  { id: "bincount", label: "Bin Count", desc: "Audit inventory", icon: ScanLine, gradient: "from-accent/15 to-accent/5", iconColor: "text-accent", path: "/bincount" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDark = () => document.documentElement.classList.toggle("dark");

  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-primary/95 backdrop-blur-md px-4 py-3 shadow-sm transition-all supports-[backdrop-filter]:bg-primary/85">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />
        <div className="relative flex items-center gap-2">
          <button onClick={() => setDrawerOpen(true)} className="min-h-0 min-w-0 flex h-10 w-10 items-center justify-center rounded-full text-primary-foreground/90 hover:bg-primary-foreground/10 active:bg-primary-foreground/20 transition-all duration-150 active:scale-95">
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2.5 ml-1">
            <img src={gerpIcon} alt="Ginesys" className="h-7 w-7 rounded-lg shadow-sm" />
            <h1 className="text-[1.0625rem] font-semibold text-primary-foreground tracking-tight">Dashboard</h1>
          </div>
        </div>
        <button onClick={toggleDark} className="min-h-0 min-w-0 flex h-10 w-10 items-center justify-center rounded-full text-primary-foreground/80 hover:bg-primary-foreground/10 active:bg-primary-foreground/20 transition-all duration-150 active:scale-95">
          <Sun className="h-[1.125rem] w-[1.125rem] hidden dark:block" />
          <Moon className="h-[1.125rem] w-[1.125rem] block dark:hidden" />
        </button>
      </header>

      <SubHeader />

      {/* Site Context */}
      <div className="border-b bg-card/60 px-4 py-2.5 backdrop-blur-sm">
        <p className="text-badge text-muted-foreground">
          Site: <span className="font-medium text-card-foreground">Warehouse Main — Mumbai [24]</span>
        </p>
      </div>

      {/* Module Tiles */}
      <div className="flex-1 p-4 relative z-10">
        <p className="text-badge font-bold text-muted-foreground uppercase tracking-wider mb-3 ml-1">Modules</p>
        <div className="grid grid-cols-2 gap-3">
          {modules.map((mod, i) => (
            <button
              key={mod.id}
              onClick={() => navigate(mod.path)}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:bg-card active:scale-[0.96] min-h-[140px]"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${mod.gradient} shadow-inner transition-transform duration-200 group-hover:scale-110 group-active:scale-95`}>
                <mod.icon className={`h-7 w-7 ${mod.iconColor}`} />
              </div>
              <div className="text-center">
                <span className="text-card-name font-semibold text-card-foreground block tracking-tight">{mod.label}</span>
                <span className="text-badge text-muted-foreground mt-0.5 block">{mod.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <NavigationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default Dashboard;
