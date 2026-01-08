import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            {/* Left Column: Form */}
            <div className="flex flex-col gap-4 p-6 md:p-10 bg-black text-white relative">
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                <div className="flex justify-center gap-2 md:justify-start relative z-10 mb-8">
                    <Link href={home()} className="flex items-center gap-2 font-medium font-serif text-xl tracking-tight">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#B5F482] text-black">
                            <AppLogoIcon className="size-4 fill-current" />
                        </div>
                        OPERATIONS.
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-center relative z-10">
                    <div className="w-full max-w-xs">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold font-serif mb-2 tracking-tight text-white">{title}</h1>
                            <p className="text-white/50 text-sm">{description}</p>
                        </div>

                        {children}

                        <div className="mt-8 text-center text-xs text-white/20 font-mono uppercase tracking-widest">
                            Secure Access Terminal
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Visuals */}
            <div className="relative hidden bg-neutral-950 lg:block overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

                <div className="absolute bottom-10 left-10 right-10 z-10">
                    <div className="border border-white/10 bg-black/50 backdrop-blur-md p-6 rounded-sm">
                        <p className="font-mono text-xs text-[#B5F482] mb-2 uppercase tracking-widest">System Status</p>
                        <h2 className="text-2xl font-serif text-white mb-2">Operational Command Center</h2>
                        <p className="text-white/40 text-sm leading-relaxed">
                            Authorized access only. Monitor systems, manage resources, and deploy updates from a central node.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
