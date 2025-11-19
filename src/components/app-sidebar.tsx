"use client";

import type * as React from "react";
import { IconDashboard, IconFolder, IconInnerShadowTop, IconListDetails, IconSettings } from "@tabler/icons-react";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "홈",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "거래내역",
      url: "/payment",
      icon: IconListDetails,
    },
    {
      title: "가맹점 리스트",
      url: "merchant",
      icon: IconFolder,
    },
    {
      title: "설정",
      url: "#",
      icon: IconSettings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="/">
                <IconInnerShadowTop className="size-5" />
                <span className="text-base font-semibold">DASHBOARD</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
