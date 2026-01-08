import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import * as skillsRoutes from '@/routes/skills';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Trash } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Skill {
    id: number;
    name: string;
    slug: string;
    category: string;
    proficiency: number;
    sort_order: number;
}

export default function SkillEdit({ skill }: { skill: Skill }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Skills',
            href: '/skills',
        },
        {
            title: skill.name,
            href: `/skills/${skill.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: skill.name,
        slug: skill.slug,
        category: skill.category,
        proficiency: skill.proficiency,
        sort_order: skill.sort_order,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // @ts-ignore
        put(skillsRoutes.update(skill.id));
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this skill?')) {
            // @ts-ignore
            router.delete(skillsRoutes.destroy(skill.id));
        }
    };

    const regenerateSlug = () => {
        const slug = data.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        setData('slug', slug);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${skill.name}`} />
            <div className="flex h-full flex-col gap-8 p-6 md:p-8 bg-black text-white">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-8">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild className="border-white/10 hover:bg-white/5 hover:border-[#B5F482]/30">
                            <Link href="/skills">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="font-serif text-3xl font-medium tracking-tight">Edit Skill</h1>
                            <p className="text-white/60 text-sm">Update skill information</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleDelete}
                            className="border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/30"
                        >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="mx-auto w-full max-w-2xl">
                    <form onSubmit={submit} className="border border-white/10 bg-white/5 backdrop-blur-sm p-8">
                        <div className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="name" className="text-white/70">Skill Name *</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50"
                                    placeholder="React, Node.js, Figma..."
                                    required
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-3">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="slug" className="text-white/70">Slug *</Label>
                                    <button
                                        type="button"
                                        onClick={regenerateSlug}
                                        className="text-xs text-[#B5F482] hover:text-[#a3e070] font-medium"
                                    >
                                        Regenerate
                                    </button>
                                </div>
                                <Input
                                    id="slug"
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50"
                                    placeholder="skill-slug"
                                    required
                                />
                                <InputError message={errors.slug} />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="category" className="text-white/70">Category *</Label>
                                <Input
                                    id="category"
                                    type="text"
                                    placeholder="Frontend, Backend, Tools, Design..."
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50"
                                    required
                                />
                                <InputError message={errors.category} />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="proficiency" className="text-white/70">
                                    Proficiency: {data.proficiency}%
                                </Label>
                                <input
                                    id="proficiency"
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={data.proficiency}
                                    onChange={(e) => setData('proficiency', parseInt(e.target.value))}
                                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#B5F482]"
                                />
                                <div className="flex justify-between text-xs text-white/40">
                                    <span>Beginner</span>
                                    <span>Intermediate</span>
                                    <span>Expert</span>
                                </div>
                                <InputError message={errors.proficiency} />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="sort_order" className="text-white/70">Sort Order</Label>
                                <Input
                                    id="sort_order"
                                    type="number"
                                    value={data.sort_order}
                                    onChange={(e) => setData('sort_order', parseInt(e.target.value))}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50"
                                    placeholder="0"
                                />
                                <p className="text-xs text-white/40">Lower numbers appear first</p>
                                <InputError message={errors.sort_order} />
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button type="submit" disabled={processing} className="bg-[#B5F482] text-black hover:bg-[#a3e070] font-bold">
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
