import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <div className="flex items-center justify-center min-h-screen bg-black text-white relative overflow-hidden selection:bg-[#B5F482] selection:text-black">
                {/* Background Noise/Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                <div className="relative z-10 text-center space-y-8 px-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-mono text-[#B5F482] uppercase tracking-widest">
                        <span className="w-2 h-2 bg-[#B5F482] rounded-full animate-pulse" />
                        System Secure
                    </div>

                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter font-serif">
                        OPERATIONS.<span className="text-white/20">CORE</span>
                    </h1>

                    <p className="text-white/40 max-w-md mx-auto text-sm font-mono leading-relaxed uppercase tracking-wider">
                        Authorized personnel only.<br />Access relies on strict authentication protocols.
                    </p>

                    <div className="pt-8">
                        <Link
                            href="/login"
                            className="inline-flex h-14 items-center justify-center rounded-none bg-white px-10 text-sm font-bold text-black transition-all hover:bg-[#B5F482] hover:px-12 uppercase tracking-[0.2em]"
                        >
                            Enter System
                        </Link>
                    </div>
                </div>

                {/* Footer simple */}
                <div className="absolute bottom-8 left-0 right-0 text-center text-[10px] text-white/20 uppercase tracking-[0.2em] font-mono">
                    Restricted Access Area // {new Date().getFullYear()}
                </div>
            </div>
        </>
    );
}
