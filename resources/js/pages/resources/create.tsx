import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, FileText, Save, Upload, ExternalLink } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Resources',
        href: '/resources',
    },
    {
        title: 'Create',
        href: '/resources/create',
    },
];

export default function ResourceCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        category: '',
        description: '',
        file_url: '',
        thumbnail: null as File | null,
        is_featured: false,
        is_free: true,
        price: '',
        purchase_link: '',
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
        post('/resources');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Resource" />

            <form onSubmit={submit} className="flex h-full flex-col gap-8 p-6 md:p-8 bg-black text-white">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-8">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild className="border-white/10 hover:bg-white/5 hover:border-[#B5F482]/30">
                            <Link href="/resources">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="font-serif text-3xl font-medium tracking-tight">Create Resource</h1>
                            <p className="text-white/60 text-sm">Add a new downloadable resource</p>
                        </div>
                    </div>
                    <Button type="submit" disabled={processing} className="bg-[#B5F482] text-black hover:bg-[#a3e070] font-bold">
                        <Save className="mr-2 h-4 w-4" />
                        {processing ? 'Creating...' : 'Create Resource'}
                    </Button>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Content (2 cols) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Basic Info */}
                        <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <h2 className="mb-6 font-serif text-xl font-medium">Resource Details</h2>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="title" className="text-white/70">Title *</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50"
                                        placeholder="Resource name"
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
                                        placeholder="resource-url-slug"
                                        required
                                    />
                                    <InputError message={errors.slug} />
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="category" className="text-white/70">Category *</Label>
                                    <Input
                                        id="category"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50"
                                        placeholder="Tutorial, Template, Guide, etc."
                                        required
                                    />
                                    <InputError message={errors.category} />
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="description" className="text-white/70">Description *</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50 min-h-[120px]"
                                        placeholder="Describe what this resource contains..."
                                        required
                                    />
                                    <InputError message={errors.description} />
                                </div>

                                {data.is_free && (
                                    <div className="grid gap-3 animate-in slide-in-from-top-2 fade-in duration-300">
                                        <Label htmlFor="file_url" className="text-white/70">
                                            External File URL *
                                            <span className="block text-xs text-white/40 font-normal mt-1">
                                                Link to Google Drive, Dropbox, or any external storage
                                            </span>
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="file_url"
                                                type="url"
                                                value={data.file_url}
                                                onChange={(e) => setData('file_url', e.target.value)}
                                                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50 pr-10"
                                                placeholder="https://drive.google.com/file/..."
                                                required={data.is_free}
                                            />
                                            <ExternalLink className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                        </div>
                                        <InputError message={errors.file_url} />
                                    </div>
                                )}

                                <div className="border-t border-white/10 pt-6 mt-2">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Checkbox
                                            id="is_free"
                                            checked={data.is_free}
                                            onCheckedChange={(checked) => setData('is_free', checked as boolean)}
                                            className="border-white/20 data-[state=checked]:bg-[#B5F482] data-[state=checked]:border-[#B5F482]"
                                        />
                                        <Label htmlFor="is_free" className="text-white cursor-pointer">
                                            This is a free resource
                                        </Label>
                                    </div>

                                    {!data.is_free && (
                                        <div className="grid gap-6 animate-in slide-in-from-top-2 fade-in duration-300">
                                            <div className="grid gap-3">
                                                <Label htmlFor="price" className="text-white/70">Price *</Label>
                                                <Input
                                                    id="price"
                                                    value={data.price}
                                                    onChange={(e) => setData('price', e.target.value)}
                                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50"
                                                    placeholder="e.g. 5000"
                                                    required={!data.is_free}
                                                />
                                                <InputError message={errors.price} />
                                            </div>

                                            <div className="grid gap-3">
                                                <Label htmlFor="purchase_link" className="text-white/70">Purchase Link *</Label>
                                                <Input
                                                    id="purchase_link"
                                                    type="url"
                                                    value={data.purchase_link}
                                                    onChange={(e) => setData('purchase_link', e.target.value)}
                                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50"
                                                    placeholder="https://gumroad.com/l/..."
                                                    required={!data.is_free}
                                                />
                                                <InputError message={errors.purchase_link} />
                                            </div>
                                        </div>
                                    )}
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
                                        <FileText className="w-12 h-12" />
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
                                <p className="text-xs text-white/40">Optional preview image for the resource</p>
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
                                    Featured Resource
                                </Label>
                            </div>
                        </div>

                        {/* Info Box */}
                        <div className="border border-[#B5F482]/20 bg-[#B5F482]/5 p-4">
                            <div className="flex items-start gap-3">
                                <ExternalLink className="w-5 h-5 text-[#B5F482] flex-shrink-0 mt-0.5" />
                                <div className="text-xs text-white/70">
                                    <p className="font-medium text-white mb-1">External Storage</p>
                                    <p>Files are stored externally. Paste a shareable link from Google Drive, Dropbox, OneDrive, or any file hosting service.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
