import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Image as ImageIcon, Save, Upload } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects',
        href: '/projects',
    },
    {
        title: 'Create',
        href: '/projects/create',
    },
];

export default function ProjectCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        category: '',
        client: '',
        role: '',
        year: '',
        description: '',
        content: '',
        live_url: '',
        github_url: '',
        video_url: '',
        is_featured: false,
        thumbnail: null as File | null,
    });

    // Auto-generate slug from title
    useEffect(() => {
        const slug = data.title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
        setData('slug', slug);
    }, [data.title]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/projects');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Project" />

            <form onSubmit={submit} className="flex h-full flex-col gap-8 p-6 md:p-8 bg-black text-white">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-8">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild className="border-white/10 hover:bg-white/5 hover:border-[#B5F482]/30">
                            <Link href="/projects">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="font-serif text-3xl font-medium tracking-tight">Create Project</h1>
                            <p className="text-white/60 text-sm">Add a new project to your portfolio</p>
                        </div>
                    </div>
                    <Button type="submit" disabled={processing} className="bg-[#B5F482] text-black hover:bg-[#a3e070] font-bold">
                        <Save className="mr-2 h-4 w-4" />
                        {processing ? 'Creating...' : 'Create Project'}
                    </Button>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Content (2 cols) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Basic Info */}
                        <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <h2 className="mb-6 font-serif text-xl font-medium">Project Details</h2>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="title" className="text-white/70">Title *</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50"
                                        placeholder="Project name"
                                        required
                                    />
                                    <InputError message={errors.title} />
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="slug" className="text-white/70">Slug *</Label>
                                    <Input
                                        id="slug"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50"
                                        placeholder="project-url-slug"
                                        required
                                    />
                                    <InputError message={errors.slug} />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="category" className="text-white/70">Category</Label>
                                        <Input
                                            id="category"
                                            value={data.category}
                                            onChange={(e) => setData('category', e.target.value)}
                                            className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50"
                                            placeholder="Web Design"
                                        />
                                        <InputError message={errors.category} />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="year" className="text-white/70">Year</Label>
                                        <Input
                                            id="year"
                                            value={data.year}
                                            onChange={(e) => setData('year', e.target.value)}
                                            className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50"
                                            placeholder="2024"
                                        />
                                        <InputError message={errors.year} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="client" className="text-white/70">Client</Label>
                                        <Input
                                            id="client"
                                            value={data.client}
                                            onChange={(e) => setData('client', e.target.value)}
                                            className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50"
                                            placeholder="Company name"
                                        />
                                        <InputError message={errors.client} />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="role" className="text-white/70">Your Role</Label>
                                        <Input
                                            id="role"
                                            value={data.role}
                                            onChange={(e) => setData('role', e.target.value)}
                                            className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50"
                                            placeholder="Lead Developer"
                                        />
                                        <InputError message={errors.role} />
                                    </div>
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="description" className="text-white/70">Description *</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50 min-h-[100px]"
                                        placeholder="Brief project description..."
                                        required
                                    />
                                    <InputError message={errors.description} />
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="content" className="text-white/70">Content</Label>
                                    <Textarea
                                        id="content"
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50 min-h-[200px]"
                                        placeholder="Detailed project information..."
                                    />
                                    <InputError message={errors.content} />
                                </div>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <h2 className="mb-6 font-serif text-xl font-medium">Project Links</h2>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="live_url" className="text-white/70">Live URL</Label>
                                    <Input
                                        id="live_url"
                                        type="url"
                                        value={data.live_url}
                                        onChange={(e) => setData('live_url', e.target.value)}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50"
                                        placeholder="https://example.com"
                                    />
                                    <InputError message={errors.live_url} />
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="github_url" className="text-white/70">GitHub URL</Label>
                                    <Input
                                        id="github_url"
                                        type="url"
                                        value={data.github_url}
                                        onChange={(e) => setData('github_url', e.target.value)}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50"
                                        placeholder="https://github.com/username/repo"
                                    />
                                    <InputError message={errors.github_url} />
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="video_url" className="text-white/70">Video URL</Label>
                                    <Input
                                        id="video_url"
                                        type="url"
                                        value={data.video_url}
                                        onChange={(e) => setData('video_url', e.target.value)}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50"
                                        placeholder="https://youtube.com/watch?v=..."
                                    />
                                    <InputError message={errors.video_url} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar (1 col) */}
                    <div className="space-y-8">
                        {/* Thumbnail */}
                        <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <h2 className="mb-6 font-serif text-xl font-medium">Thumbnail</h2>
                            <div className="grid gap-4">
                                <div className="aspect-video bg-white/10 border border-white/10 flex items-center justify-center text-white/20">
                                    {data.thumbnail ? (
                                        <img
                                            src={URL.createObjectURL(data.thumbnail)}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <ImageIcon className="w-12 h-12" />
                                    )}
                                </div>
                                <Label htmlFor="thumbnail" className="cursor-pointer">
                                    <div className="flex items-center justify-center gap-2 px-4 py-3 border border-white/10 hover:border-[#B5F482]/30 hover:bg-white/5 transition-all text-sm font-medium">
                                        <Upload className="w-4 h-4" />
                                        {data.thumbnail ? 'Change Image' : 'Upload Image'}
                                    </div>
                                    <Input
                                        id="thumbnail"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('thumbnail', e.target.files?.[0] || null)}
                                        className="hidden"
                                    />
                                </Label>
                                <InputError message={errors.thumbnail} />
                            </div>
                        </div>

                        {/* Settings */}
                        <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <h2 className="mb-6 font-serif text-xl font-medium">Settings</h2>
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="is_featured"
                                    checked={data.is_featured}
                                    onCheckedChange={(checked) => setData('is_featured', checked as boolean)}
                                    className="border-white/20 data-[state=checked]:bg-[#B5F482] data-[state=checked]:border-[#B5F482]"
                                />
                                <Label htmlFor="is_featured" className="text-white/70 cursor-pointer">
                                    Featured Project
                                </Label>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
