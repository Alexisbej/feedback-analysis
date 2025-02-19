"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BarChart2,
  ChevronUp,
  Home,
  MessageSquare,
  PlusIcon,
  User2,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Template } from "@prisma/client";

export interface Business {
  id: string;
  name: string;
}

interface AppSidebarProps {
  businesses: Business[];
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
  };
  children: React.ReactNode;
}

export function AppSidebar({ businesses, user, children }: AppSidebarProps) {
  const activeBusinessId = useSearchParams().get("businessId");
  const {
    data: templates,
    isLoading,
    error,
  } = useSWR(
    activeBusinessId ? `/api/templates?businessId=${activeBusinessId}` : null,
    (url) => fetch(url).then((res) => res.json()),
  );
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarContent>
        {/* Group: My Businesses */}
        <SidebarGroup>
          <SidebarGroupLabel>My Businesses</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {businesses.map((business) => (
                <SidebarMenuItem key={business.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeBusinessId === business.id}
                  >
                    <Link href={`/dashboard?businessId=${business.id}`}>
                      <Home size={16} />
                      <span className="ml-2">{business.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={`/business/register`}>
                    <PlusIcon /> Add a new business
                    <span className="ml-2"></span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {activeBusinessId && (
          <SidebarGroup>
            <SidebarGroupLabel>Templates</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {isLoading && (
                  <SidebarMenuItem>
                    <div className="text-sm text-muted-foreground px-4">
                      Loading templates...
                    </div>
                  </SidebarMenuItem>
                )}

                {error && (
                  <SidebarMenuItem>
                    <div className="text-sm text-destructive px-4">
                      Error loading templates
                    </div>
                  </SidebarMenuItem>
                )}

                {templates?.map((template: Template) => (
                  <SidebarMenuItem key={template.id}>
                    <SidebarMenuButton asChild>
                      <Link href={`/dashboard/campaigns/${template.id}`}>
                        <span>{template.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      href={`/dashboard/create-campaign?tenantId=${activeBusinessId}`}
                    >
                      <PlusIcon size={16} />
                      <span className="ml-2">Create Template</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Group: Dashboard Sections */}
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard Sections</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/metrics">
                    <BarChart2 size={16} />
                    <span className="ml-2">Metrics Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/feedback">
                    <MessageSquare size={16} />
                    <span className="ml-2">Feedback Responses</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/sentiment">
                    <BarChart2 size={16} />
                    <span className="ml-2">Sentiment Analysis</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer with User Dropdown */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 size={16} />
                  <span className="ml-2">{user.name}</span>
                  <ChevronUp size={16} className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start">
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                {/* Render the logout button passed from the parent */}
                {children}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
