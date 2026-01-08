import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    Activity, ArrowRight, ArrowUpRight, BarChart3, Bell, Briefcase, Calendar,
    ChevronRight, Clock, Eye, Folder, Globe, Mail, MessageSquare, Plus,
    RefreshCw, TrendingUp, Users, Zap
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
];

interface Project {
    id: number;
    title: string;
    category: string | null;
    created_at: string;
    thumbnail: string | null;
}

interface Message {
    id: number;
    name: string;
    email: string;
    subject: string | null;
    created_at: string;
}

interface VisitorStats {
    views: number;
    unique: number;
    top_regions: { country_code: string; count: number }[];
}

interface DashboardProps {
    stats: {
        projects: number;
        skills: number;
        experience: number;
        messages: number;
    };
    recent_projects: Project[];
    recent_messages: Message[];
    last_update: string;
    visitor_stats: VisitorStats;
}

export default function Dashboard({ stats, recent_projects, recent_messages, last_update, visitor_stats }: DashboardProps) {
    const lastUpdateDate = new Date(last_update).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-8 p-6 md:p-8 bg-black text-white min-h-screen">

                {/* Header */}
                <div className="border-b border-white/10 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <p className="text-sm font-medium text-white/40 uppercase tracking-widest mb-3">{today}</p>
                            <h1 className="font-serif text-5xl md:text-6xl font-medium tracking-tight mb-3">
                                Dashboard
                            </h1>
                            <p className="text-white/60 text-lg max-w-2xl">
                                Monitor your portfolio performance and manage content
                            </p>
                        </div>
                        <Link
                            href="/projects/create"
                            className="inline-flex items-center gap-2 bg-[#B5F482] text-black px-6 py-3 font-bold hover:bg-[#a3e070] transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            New Project
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Projects"
                        value={stats.projects}
                        icon={Folder}
                        trend="+2 this month"
                    />
                    <StatCard
                        title="Skills Mastered"
                        value={stats.skills}
                        icon={Zap}
                        trend="Growing stack"
                    />
                    <StatCard
                        title="Page Views"
                        value={visitor_stats.views || 0}
                        icon={Eye}
                        trend={`${visitor_stats.unique || 0} unique`}
                    />
                    <StatCard
                        title="New Messages"
                        value={stats.messages}
                        icon={Mail}
                        trend="Unread inquiries"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Analytics Chart */}
                        <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="font-serif text-2xl font-medium mb-2">Performance Analytics</h3>
                                    <p className="text-sm text-white/50">Portfolio engagement over time</p>
                                </div>
                                <div className="flex items-center gap-2 bg-[#B5F482]/10 border border-[#B5F482]/20 px-3 py-1.5">
                                    <div className="w-2 h-2 bg-[#B5F482] rounded-full animate-pulse"></div>
                                    <span className="text-xs font-bold text-[#B5F482]">LIVE</span>
                                </div>
                            </div>

                            {/* Chart */}
                            <div className="h-80 relative">
                                <svg viewBox="0 0 800 200" className="w-full h-full">
                                    <defs>
                                        <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#B5F482" stopOpacity="0.3" />
                                            <stop offset="100%" stopColor="#B5F482" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>

                                    {/* Grid */}
                                    {[0, 50, 100, 150, 200].map((y) => (
                                        <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                                    ))}

                                    {/* Area */}
                                    <path
                                        d="M0,150 Q100,140 200,120 T400,80 T600,100 T800,60 V200 H0 Z"
                                        fill="url(#lineGradient)"
                                    />

                                    {/* Line */}
                                    <path
                                        d="M0,150 Q100,140 200,120 T400,80 T600,100 T800,60"
                                        fill="none"
                                        stroke="#B5F482"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />

                                    {/* Data Points */}
                                    {[
                                        { x: 200, y: 120 },
                                        { x: 400, y: 80 },
                                        { x: 600, y: 100 },
                                        { x: 800, y: 60 }
                                    ].map((point, i) => (
                                        <circle
                                            key={i}
                                            cx={point.x}
                                            cy={point.y}
                                            r="4"
                                            fill="#B5F482"
                                            className="hover:r-6 transition-all cursor-pointer"
                                        />
                                    ))}
                                </svg>

                                {/* Y-axis labels */}
                                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-white/30 -ml-12">
                                    <span>1000</span>
                                    <span>750</span>
                                    <span>500</span>
                                    <span>250</span>
                                    <span>0</span>
                                </div>
                            </div>
                        </div>

                        {/* Recent Projects */}
                        {recent_projects.length > 0 && (
                            <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-serif text-2xl font-medium">Recent Projects</h3>
                                    <Link
                                        href="/projects"
                                        className="text-sm font-bold text-[#B5F482] hover:text-[#a3e070] flex items-center gap-1 transition-colors"
                                    >
                                        View All <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                                <div className="space-y-4">
                                    {recent_projects.slice(0, 3).map((project) => (
                                        <Link
                                            key={project.id}
                                            href={`/projects/${project.id}/edit`}
                                            className="flex items-center gap-4 p-4 border border-white/10 hover:border-[#B5F482]/30 hover:bg-white/5 transition-all group"
                                        >
                                            <div className="w-16 h-16 bg-white/10 flex-shrink-0 overflow-hidden">
                                                {project.thumbnail ? (
                                                    <img src={`/storage/${project.thumbnail}`} className="w-full h-full object-cover" alt="" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-white/30">
                                                        <Folder className="w-6 h-6" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-white group-hover:text-[#B5F482] transition-colors truncate mb-1">
                                                    {project.title}
                                                </h4>
                                                <p className="text-sm text-white/50">
                                                    {project.category || 'Uncategorized'} • {new Date(project.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-[#B5F482] group-hover:translate-x-1 transition-all" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-8">

                        {/* Quick Actions */}
                        <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <h3 className="font-serif text-xl font-medium mb-6">Quick Actions</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <QuickAction href="/projects/create" icon={Plus} label="Add Project" />
                                <QuickAction href="/skills" icon={Zap} label="Add Skill" />
                                <QuickAction href="/experiences" icon={Briefcase} label="Add Job" />
                                <QuickAction href="/profile" icon={Users} label="Profile" />
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                            <div className="p-6 border-b border-white/10">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-serif text-xl font-medium">Messages</h3>
                                    <span className="bg-[#B5F482]/10 text-[#B5F482] text-xs font-bold px-2 py-1 border border-[#B5F482]/20">
                                        {stats.messages}
                                    </span>
                                </div>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                {recent_messages.length > 0 ? (
                                    <div className="divide-y divide-white/5">
                                        {recent_messages.map((msg) => (
                                            <div key={msg.id} className="p-4 hover:bg-white/5 transition-colors cursor-pointer group">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-10 h-10 bg-[#B5F482]/10 border border-[#B5F482]/20 flex items-center justify-center text-[#B5F482] font-bold flex-shrink-0">
                                                        {msg.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <h4 className="font-medium text-white text-sm truncate">{msg.name}</h4>
                                                            <span className="text-xs text-white/30">{new Date(msg.created_at).toLocaleDateString()}</span>
                                                        </div>
                                                        <p className="text-xs text-white/60 truncate mb-1">{msg.subject || 'No subject'}</p>
                                                        <p className="text-xs text-white/40">{msg.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                                        <div className="w-16 h-16 border border-white/10 flex items-center justify-center mb-4">
                                            <MessageSquare className="w-8 h-8 text-white/20" />
                                        </div>
                                        <h4 className="font-medium text-white mb-1">No messages yet</h4>
                                        <p className="text-sm text-white/50">Messages from your contact form will appear here</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* System Info */}
                        <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <h3 className="font-serif text-xl font-medium mb-6">System Status</h3>
                            <div className="space-y-4">
                                <StatusRow label="Last Update" value={lastUpdateDate} />
                                <StatusRow label="Total Experience" value={`${stats.experience} positions`} />
                                <StatusRow label="API Status" value="Operational" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

// Components
function StatCard({ title, value, icon: Icon, trend }: any) {
    return (
        <div className="group border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:border-[#B5F482]/30 transition-all">
            <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-[#B5F482]/30 group-hover:bg-[#B5F482]/10 transition-all">
                    <Icon className="w-6 h-6 text-white/60 group-hover:text-[#B5F482] transition-colors" />
                </div>
                <div className="flex items-center gap-1 text-[#B5F482] text-xs font-bold">
                    <TrendingUp className="w-3 h-3" />
                </div>
            </div>
            <div>
                <p className="text-sm font-medium text-white/50 mb-2 uppercase tracking-wider">{title}</p>
                <h3 className="font-serif text-5xl font-medium text-white tracking-tight mb-2">{value}</h3>
                <p className="text-xs text-white/40">{trend}</p>
            </div>
        </div>
    );
}

function QuickAction({ href, icon: Icon, label }: any) {
    return (
        <Link
            href={href}
            className="flex flex-col items-center justify-center gap-3 p-6 border border-white/10 hover:border-[#B5F482]/30 hover:bg-white/5 transition-all group text-center"
        >
            <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-[#B5F482]/30 group-hover:bg-[#B5F482]/10 transition-all">
                <Icon className="w-6 h-6 text-white/60 group-hover:text-[#B5F482] transition-colors" />
            </div>
            <span className="text-xs font-medium text-white/70 group-hover:text-white transition-colors uppercase tracking-wider">{label}</span>
        </Link>
    );
}

function StatusRow({ label, value }: any) {
    return (
        <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
            <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#B5F482]"></div>
                <span className="text-sm font-medium text-white/60">{label}</span>
            </div>
            <span className="text-sm font-medium text-white">{value}</span>
        </div>
    );
}
