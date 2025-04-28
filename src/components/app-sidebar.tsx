import { FlameIcon, HomeIcon, Minus, Plus, TrendingUpIcon } from "lucide-react";
import * as React from "react";

import { SearchForm } from "@/components/search-form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getSubechos } from "@/sanity/lib/subechos/getSubechos";
import Image from "next/image";
import Link from "next/link";
import RedEchoLogo from "../../public/images/RedEcho_full_logo.png";
import CreateCommunityButton from "./header/CreateCommunityButton";

interface Sidebar {
  navMain: {
    title: string;
    url: string;
    items?: {
      title: string;
      url: string;
      isActive?: boolean;
    }[];
  }[];
}

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const subechos = await getSubechos();

  // This is sample data.
  const sidebarData = {
    navMain: [
      {
        title: "Communities",
        url: "#",
        items: subechos?.map((subecho) => ({
          title: subecho.title || "Unknown",
          url: `/community/${subecho.slug}`,
          isActive: false,
        })),
      },
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <Image
                  src={RedEchoLogo}
                  alt="Red Echo Logo"
                  width={150}
                  height={150}
                  className="object-contain"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <CreateCommunityButton />
              </SidebarMenuButton>

              <SidebarMenuButton asChild>
                <Link href="/">
                  <HomeIcon className="w-6 h-6 mr-2" />
                  Home
                </Link>
              </SidebarMenuButton>

              <SidebarMenuButton asChild>
                <Link href="/">
                  <TrendingUpIcon className="w-6 h-6 mr-2" />
                  Popular
                </Link>
              </SidebarMenuButton>

              <SidebarMenuButton asChild>
                <Link href="/">
                  <FlameIcon className="w-6 h-6 mr-2" />
                  Hot/Controversial
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarMenu>
            {sidebarData.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 1}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}{" "}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={item.isActive}
                            >
                              <Link href={item.url}>{item.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
