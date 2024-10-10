import { User, UserPlus, Graph } from "@/components/svg";
import { ScanFaceIcon } from "lucide-react";

export const menusConfig = {
  sidebarNav: {
    classic: [
      {
        isHeader: true,
        title: "menu",
      },
      {
        title: "Dashboard",
        icon: Graph,
        href: "/dashboard",
        permission: "analytics:read",
      },
      {
        title: "User Details",
        icon: ScanFaceIcon,
        href: "/user-details",
        permission: "bnyGeneral:read",
      },

      {
        title: "User",
        icon: User,
        href: "/users",
        permission: "users:read",
      },
      {
        title: "Roles",
        icon: UserPlus,
        href: "/roles",
        permission: "roles:read",
      },
    ],
  },
};
