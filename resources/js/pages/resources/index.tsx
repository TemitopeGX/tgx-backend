import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
    Plus, Search, MoreHorizontal, Edit, Trash, Download, FileText, Image as ImageIcon
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Resource {
    id: number;
    title: string;
    slug: string;
    category: string;
    description: string;
    file_url: string | null;
    thumbnail: string | null;
    download_count: number;
    is_featured: boolean;
    created_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Resources',
        href: '/resources',
    },
];

export default function ResourcesIndex({ resources }: { resources: Resource[] }) {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<'all' | 'featured'>('all');

    const filteredResources = resources.filter(r => {
        const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
            r.category.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'featured' ? r.is_featured : true;
        return matchesSearch && matchesFilter;
    });

    const toggleFeatured = (resource: Resource) => {
        router.put(`/resources/${resource.id}`, {
            ...resource,
            is_featured: !resource.is_featured
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Resources" />

            <div className="flex h-full flex-col gap-8 p-6 md:p-8 bg-black text-white">

                {/* Header Section */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-white/10 pb-8">
                    <div>
                        <h1 className="font-serif text-4xl font-medium tracking-tight mb-2">Resources</h1>
                        <p className="text-white/60">Manage downloadable files and resources.</p>
                    </div>
                    <Button asChild className="bg-[#B5F482] text-black hover:bg-[#a3e070] font-bold">
                        <Link href="/resources/create">
                            <Plus className="mr-2 h-4 w-4" />
                            New Resource
                        </Link>
                    </Button>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                        <Input
                            placeholder="Search resources..."
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
                            All ({resources.length})
                        </button>
                        <button
                            onClick={() => setFilter('featured')}
                            className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all", filter === 'featured' ? "bg-[#B5F482] text-black" : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10")}
                        >
                            Featured ({resources.filter(r => r.is_featured).length})
                        </button>
                    </div>
                </div>

                {/* Resources Grid */}
                {filteredResources.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredResources.map((resource) => (
                            <div key={resource.id} className="group border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#B5F482]/30 transition-all overflow-hidden">
                                <div className="aspect-video bg-white/10 relative overflow-hidden">
                                    {resource.thumbnail ? (
                                        <img
                                            src={`/storage/${resource.thumbnail}`}
                                            alt={resource.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white/20">
                                            <FileText className="w-12 h-12" />
                                        </div>
                                    )}
                                    {resource.is_featured && (
                                        <div className="absolute top-3 right-3 bg-[#B5F482] text-black px-2 py-1 text-xs font-bold">
                                            FEATURED
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-white truncate mb-1">{resource.title}</h3>
                                            <div className="flex items-center gap-2 text-xs text-white/50">
                                                <span className="bg-white/10 px-2 py-0.5 border border-white/10">{resource.category}</span>
                                                <span className="flex items-center gap-1">
                                                    <Download className="w-3 h-3" />
                                                    {resource.download_count}
                                                </span>
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
                                                    <Link href={`/resources/${resource.id}/edit`}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => toggleFeatured(resource)} className="hover:bg-white/10">
                                                    <Download className="mr-2 h-4 w-4" />
                                                    {resource.is_featured ? 'Unfeature' : 'Feature'}
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-white/10" />
                                                <DropdownMenuItem
                                                    onClick={() => router.delete(`/resources/${resource.id}`)}
                                                    className="text-red-400 hover:bg-red-500/10"
                                                >
                                                    <Trash className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <p className="text-sm text-white/60 line-clamp-2 mb-4">{resource.description}</p>
                                    <Link
                                        href={`/resources/${resource.id}/edit`}
                                        className="text-sm font-medium text-[#B5F482] hover:text-[#a3e070] inline-flex items-center gap-1"
                                    >
                                        Edit Resource <Edit className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center border border-white/10 bg-white/5 backdrop-blur-sm">
                        <FileText className="w-12 h-12 text-white/20 mb-4" />
                        <h3 className="font-medium text-white mb-1">No resources found</h3>
                        <p className="text-sm text-white/50 mb-6">Get started by creating your first resource</p>
                        <Button asChild className="bg-[#B5F482] text-black hover:bg-[#a3e070] font-bold">
                            <Link href="/resources/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Create Resource
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
