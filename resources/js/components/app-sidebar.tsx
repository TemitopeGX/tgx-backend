import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import * as experiences from '@/routes/experiences';
import * as projects from '@/routes/projects';
import * as skills from '@/routes/skills';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Briefcase, FileText, Folder, LayoutGrid, Zap } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Projects',
        href: projects.index(),
        icon: Folder,
    },
    {
        title: 'Skills',
        href: skills.index(),
        icon: Zap,
    },
    {
        title: 'Experience',
        href: experiences.index(),
        icon: Briefcase,
    },
    {
        title: 'Resources',
        href: '/resources',
        icon: FileText,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" className="border-r border-white/10 bg-black">
            <SidebarHeader className="border-b border-white/10">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-white/5">
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="bg-black">
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="border-t border-white/10 bg-black">
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
