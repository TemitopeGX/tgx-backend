import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn, isSameUrl, resolveUrl } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { show } from '@/routes/two-factor';
import { edit as editPassword } from '@/routes/user-password';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: edit(),
        icon: null,
    },
    {
        title: 'Password',
        href: editPassword(),
        icon: null,
    },
    {
        title: 'Two-Factor Auth',
        href: show(),
        icon: null,
    },
    {
        title: 'Appearance',
        href: editAppearance(),
        icon: null,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <div className="px-6 py-8 bg-black text-white">
            <div className="border-b border-white/10 pb-8 mb-8">
                <h1 className="font-serif text-4xl font-medium tracking-tight mb-2">Settings</h1>
                <p className="text-white/60">Manage your profile and account settings</p>
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-12">
                <aside className="w-full lg:w-56 mb-8 lg:mb-0">
                    <nav className="flex flex-col gap-1">
                        {sidebarNavItems.map((item, index) => (
                            <Link
                                key={`${resolveUrl(item.href)}-${index}`}
                                href={item.href}
                                className={cn(
                                    'px-4 py-3 text-sm font-medium transition-all border border-transparent',
                                    isSameUrl(currentPath, item.href)
                                        ? 'bg-[#B5F482]/10 text-[#B5F482] border-l-2 border-[#B5F482]'
                                        : 'text-white/70 hover:text-white hover:bg-white/5'
                                )}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 lg:hidden bg-white/10" />

                <div className="flex-1 max-w-2xl">
                    <section className="space-y-12">
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
}
