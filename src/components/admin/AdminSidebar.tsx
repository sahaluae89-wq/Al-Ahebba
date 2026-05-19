import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Store, LayoutDashboard, Package, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const navItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
];

export function AdminSidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="h-16 flex items-center px-6 border-b shrink-0">
        <Store className="h-6 w-6 text-primary mr-2" />
        <span className="font-bold text-lg tracking-tight">Admin Panel</span>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
              location.pathname.startsWith(item.href)
                ? "bg-primary/10 text-primary"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
            {item.title}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t shrink-0">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
}

export function AdminSidebar() {
  return (
    <div className="w-64 border-r min-h-screen hidden md:block shrink-0">
      <AdminSidebarContent />
    </div>
  );
}
