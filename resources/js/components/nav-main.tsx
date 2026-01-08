import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { resolveUrl } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-4">
            <SidebarGroupLabel className="text-white/40 uppercase tracking-widest text-xs font-bold mb-2">
                Platform
            </SidebarGroupLabel>
            <SidebarMenu className="space-y-1">
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={page.url.startsWith(
                                resolveUrl(item.href),
                            )}
                            tooltip={{ children: item.title }}
                            className="text-white/70 hover:text-white hover:bg-white/5 data-[active=true]:bg-[#B5F482]/10 data-[active=true]:text-[#B5F482] data-[active=true]:border-l-2 data-[active=true]:border-[#B5F482] transition-all"
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon className="w-5 h-5" />}
                                <span className="font-medium">{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
