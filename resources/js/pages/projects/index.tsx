import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
    Plus, Search, MoreHorizontal, Edit, Trash, Eye,
    LayoutGrid, List, CheckCircle, Clock, FolderOpen, Image as ImageIcon
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Project {
    id: number;
    title: string;
    category?: string;
    slug: string;
    description: string;
    is_featured: boolean;
    thumbnail: string | null;
    year?: string;
    client?: string;
    live_url?: string;
    created_at?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects',
        href: '/projects',
    },
];

export default function ProjectsIndex({ projects }: { projects: Project[] }) {
    const [search, setSearch] = useState('');
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [filter, setFilter] = useState<'all' | 'featured'>('all');

    const filteredProjects = projects.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.client?.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'featured' ? p.is_featured : true;
        return matchesSearch && matchesFilter;
    });

    const toggleFeatured = (project: Project) => {
        router.put(`/projects/${project.id}`, {
            ...project,
            is_featured: !project.is_featured
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />

            <div className="flex h-full flex-col gap-8 p-6 md:p-8 bg-black text-white">

                {/* Header Section */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-white/10 pb-8">
                    <div>
                        <h1 className="font-serif text-4xl font-medium tracking-tight mb-2">Projects</h1>
                        <p className="text-white/60">Manage and organize your portfolio content.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                            <button
                                onClick={() => setView('grid')}
                                className={cn("p-2 rounded-md transition-all", view === 'grid' ? "bg-[#B5F482] text-black" : "text-white/50 hover:text-white")}
                                title="Grid View"
                            >
                                <LayoutGrid className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setView('list')}
                                className={cn("p-2 rounded-md transition-all", view === 'list' ? "bg-[#B5F482] text-black" : "text-white/50 hover:text-white")}
                                title="List View"
                            >
                                <List className="h-4 w-4" />
                            </button>
                        </div>
                        <Button asChild className="bg-[#B5F482] text-black hover:bg-[#a3e070] font-bold">
                            <Link href="/projects/create">
                                <Plus className="mr-2 h-4 w-4" />
                                New Project
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                        <Input
                            placeholder="Search projects..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all", filter === 'all' ? "bg-[#B5F482] text-black" : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10")}
                        >
                            All ({projects.length})
                        </button>
                        <button
                            onClick={() => setFilter('featured')}
                            className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all", filter === 'featured' ? "bg-[#B5F482] text-black" : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10")}
                        >
                            Featured ({projects.filter(p => p.is_featured).length})
                        </button>
                    </div>
                </div>

                {/* Content */}
                {view === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <div key={project.id} className="group border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#B5F482]/30 transition-all overflow-hidden">
                                <div className="aspect-video bg-white/10 relative overflow-hidden">
                                    {project.thumbnail ? (
                                        <img
                                            src={`/storage/${project.thumbnail}`}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white/20">
                                            <ImageIcon className="w-12 h-12" />
                                        </div>
                                    )}
                                    {project.is_featured && (
                                        <div className="absolute top-3 right-3 bg-[#B5F482] text-black px-2 py-1 text-xs font-bold">
                                            FEATURED
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-white truncate mb-1">{project.title}</h3>
                                            <div className="flex items-center gap-2 text-xs text-white/50">
                                                {project.category && <span className="bg-white/10 px-2 py-0.5 border border-white/10">{project.category}</span>}
                                                {project.year && <span>• {project.year}</span>}
                                            </div>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                                    <MoreHorizontal className="h-4 w-4 text-white/70" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-neutral-900 border-white/10 text-white">
                                                <DropdownMenuItem asChild className="hover:bg-white/10">
                                                    <Link href={`/projects/${project.id}/edit`}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => toggleFeatured(project)} className="hover:bg-white/10">
                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                    {project.is_featured ? 'Unfeature' : 'Feature'}
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-white/10" />
                                                <DropdownMenuItem
                                                    onClick={() => router.delete(`/projects/${project.id}`)}
                                                    className="text-red-400 hover:bg-red-500/10"
                                                >
                                                    <Trash className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <p className="text-sm text-white/60 line-clamp-2 mb-4">{project.description}</p>
                                    <Link
                                        href={`/projects/${project.id}/edit`}
                                        className="text-sm font-medium text-[#B5F482] hover:text-[#a3e070] inline-flex items-center gap-1"
                                    >
                                        Edit Project <Edit className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-white/10 hover:bg-white/5">
                                    <TableHead className="text-white/70">Project</TableHead>
                                    <TableHead className="text-white/70">Category</TableHead>
                                    <TableHead className="text-white/70">Client</TableHead>
                                    <TableHead className="text-white/70">Year</TableHead>
                                    <TableHead className="text-white/70">Status</TableHead>
                                    <TableHead className="text-right text-white/70">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProjects.map((project) => (
                                    <TableRow key={project.id} className="border-white/10 hover:bg-white/5">
                                        <TableCell className="font-medium text-white">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-white/10 border border-white/10 overflow-hidden flex-shrink-0">
                                                    {project.thumbnail ? (
                                                        <img src={`/storage/${project.thumbnail}`} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-white/20">
                                                            <FolderOpen className="w-5 h-5" />
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="truncate">{project.title}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-white/70">{project.category || '—'}</TableCell>
                                        <TableCell className="text-white/70">{project.client || '—'}</TableCell>
                                        <TableCell className="text-white/70">{project.year || '—'}</TableCell>
                                        <TableCell>
                                            {project.is_featured && (
                                                <Badge className="bg-[#B5F482]/10 text-[#B5F482] border-[#B5F482]/20 hover:bg-[#B5F482]/20">
                                                    Featured
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                                        <MoreHorizontal className="h-4 w-4 text-white/70" />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-neutral-900 border-white/10 text-white">
                                                    <DropdownMenuItem asChild className="hover:bg-white/10">
                                                        <Link href={`/projects/${project.id}/edit`}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => toggleFeatured(project)} className="hover:bg-white/10">
                                                        <CheckCircle className="mr-2 h-4 w-4" />
                                                        {project.is_featured ? 'Unfeature' : 'Feature'}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-white/10" />
                                                    <DropdownMenuItem
                                                        onClick={() => router.delete(`/projects/${project.id}`)}
                                                        className="text-red-400 hover:bg-red-500/10"
                                                    >
                                                        <Trash className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}

                {filteredProjects.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-center border border-white/10 bg-white/5 backdrop-blur-sm">
                        <FolderOpen className="w-12 h-12 text-white/20 mb-4" />
                        <h3 className="font-medium text-white mb-1">No projects found</h3>
                        <p className="text-sm text-white/50 mb-6">Get started by creating your first project</p>
                        <Button asChild className="bg-[#B5F482] text-black hover:bg-[#a3e070] font-bold">
                            <Link href="/projects/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Create Project
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
