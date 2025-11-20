"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { dateFormat } from "@/utils/dateFormet";
import { IconUserCircle } from "@tabler/icons-react";

export function SiteHeader() {
  const formatDate = dateFormat(new Date(), { day: true });

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-sm font-medium">{formatDate}</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => alert("준비중 입니다.")}>
            <IconUserCircle className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
