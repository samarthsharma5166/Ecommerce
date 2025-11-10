import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BadgeCheck,
  LayoutDashboard,
  ShoppingBasket,
  ChartNoAxesCombined,
  LocateFixed,
  Locate,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

// Sidebar menu items
const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket size={20} />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck size={20} />,
  },
  {
    id: "category",
    label: "Category",
    path: "/admin/category",
    icon: <Locate  size={20}/>,
  },
  {
    id: "subcategory",
    label: "SubCategory",
    path: "/admin/subcategory",
    icon: <LocateFixed size={20} />,
  },
];

// ✅ Pass setoPen to MenuItems so it can close sidebar
function MenuItems({ setoPen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path) => {
    navigate(path);
    if (setoPen) setoPen(false); // ✅ close sidebar on mobile
  };

  return (
    <nav className="flex flex-col mt-8 gap-2">
      {adminSidebarMenuItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <div
            key={item.id}
            onClick={() => handleNavClick(item.path)}
            className={`flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-200 ${
              isActive ? "bg-gray-300 font-bold" : ""
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        );
      })}
    </nav>
  );
}

function AdminSidebar({ open, setoPen }) {
  const navigate = useNavigate();

  return (
    <>
      {/* ✅ Mobile sidebar */}
      <Sheet open={open} onOpenChange={setoPen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex items-center gap-2">
                <ChartNoAxesCombined size={30} />
                Admin Panel
              </SheetTitle>
            </SheetHeader>
            {/* ✅ Pass setoPen to MenuItems */}
            <MenuItems setoPen={setoPen} />
          </div>
        </SheetContent>
      </Sheet>

      {/* ✅ Desktop sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-white p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center cursor-pointer gap-2 mb-8"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
        </div>
        {/* Desktop doesn’t need to close */}
        <MenuItems />
      </aside>
    </>
  );
}

export default AdminSidebar;
