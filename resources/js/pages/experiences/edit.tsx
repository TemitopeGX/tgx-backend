import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import * as experiencesRoutes from '@/routes/experiences';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Briefcase, Save, Trash, Upload } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Experience {
    id: number;
    company: string;
    role: string;
    location: string | null;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    description: string;
    company_logo: string | null;
}

export default function ExperienceEdit({ experience }: { experience: Experience }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Experience',
            href: '/experiences',
        },
        {
            title: experience.company,
            href: `/experiences/${experience.id}/edit`,
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        company: experience.company,
        role: experience.role,
        location: experience.location || '',
        start_date: experience.start_date,
        end_date: experience.end_date || '',
        is_current: experience.is_current,
        description: experience.description,
        company_logo: null as File | null,
        _method: 'PUT',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/experiences/${experience.id}`);
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this experience?')) {
            router.delete(`/experiences/${experience.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${experience.company}`} />
            <div className="flex h-full flex-col gap-8 p-6 md:p-8 bg-black text-white">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-8">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild className="border-white/10 hover:bg-white/5 hover:border-[#B5F482]/30">
                            <Link href="/experiences">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="font-serif text-3xl font-medium tracking-tight">Edit Experience</h1>
                            <p className="text-white/60 text-sm">Update position information</p>
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

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Content (2 cols) */}
                    <div className="lg:col-span-2">
                        <form onSubmit={submit} className="border border-white/10 bg-white/5 backdrop-blur-sm p-8">
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="company" className="text-white/70">Company *</Label>
                                    <Input
                                        id="company"
                                        type="text"
                                        value={data.company}
                                        onChange={(e) => setData('company', e.target.value)}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50"
                                        placeholder="Company name"
                                        required
                                    />
                                    <InputError message={errors.company} />
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="role" className="text-white/70">Role *</Label>
                                    <Input
                                        id="role"
                                        type="text"
                                        value={data.role}
                                        onChange={(e) => setData('role', e.target.value)}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50"
                                        placeholder="Senior Developer, Product Designer..."
                                        required
                                    />
                                    <InputError message={errors.role} />
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="location" className="text-white/70">Location</Label>
                                    <Input
                                        id="location"
                                        type="text"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50"
                                        placeholder="Remote, New York, London..."
                                    />
                                    <InputError message={errors.location} />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="start_date" className="text-white/70">Start Date *</Label>
                                        <Input
                                            id="start_date"
                                            type="date"
                                            value={data.start_date}
                                            onChange={(e) => setData('start_date', e.target.value)}
                                            className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50"
                                            required
                                        />
                                        <InputError message={errors.start_date} />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="end_date" className="text-white/70">End Date</Label>
                                        <Input
                                            id="end_date"
                                            type="date"
                                            value={data.end_date}
                                            onChange={(e) => setData('end_date', e.target.value)}
                                            className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50"
                                            disabled={data.is_current}
                                        />
                                        <InputError message={errors.end_date} />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Checkbox
                                        id="is_current"
                                        checked={data.is_current}
                                        onCheckedChange={(checked) => {
                                            setData('is_current', checked as boolean);
                                            if (checked) setData('end_date', '');
                                        }}
                                        className="border-white/20 data-[state=checked]:bg-[#B5F482] data-[state=checked]:border-[#B5F482]"
                                    />
                                    <Label htmlFor="is_current" className="text-white/70 cursor-pointer">
                                        I currently work here
                                    </Label>
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="description" className="text-white/70">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50 min-h-[150px]"
                                        placeholder="Describe your responsibilities and achievements..."
                                    />
                                    <InputError message={errors.description} />
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

                    {/* Sidebar (1 col) */}
                    <div className="space-y-8">
                        {/* Company Logo */}
                        <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                            <h2 className="mb-6 font-serif text-xl font-medium">Company Logo</h2>
                            <div className="grid gap-4">
                                <div className="aspect-square max-w-[200px] bg-white/10 border border-white/10 flex items-center justify-center text-white/20 overflow-hidden">
                                    {data.company_logo ? (
                                        <img
                                            src={URL.createObjectURL(data.company_logo)}
                                            alt="Preview"
                                            className="w-full h-full object-contain p-4"
                                        />
                                    ) : experience.company_logo ? (
                                        <img
                                            src={`/storage/${experience.company_logo}`}
                                            alt="Current"
                                            className="w-full h-full object-contain p-4"
                                        />
                                    ) : (
                                        <Briefcase className="w-12 h-12" />
                                    )}
                                </div>
                                <Label htmlFor="company_logo" className="cursor-pointer">
                                    <div className="flex items-center justify-center gap-2 px-4 py-3 border border-white/10 hover:border-[#B5F482]/30 hover:bg-white/5 transition-all text-sm font-medium">
                                        <Upload className="w-4 h-4" />
                                        {data.company_logo || experience.company_logo ? 'Change Logo' : 'Upload Logo'}
                                    </div>
                                    <Input
                                        id="company_logo"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('company_logo', e.target.files?.[0] || null)}
                                        className="hidden"
                                    />
                                </Label>
                                <p className="text-xs text-white/40">Square images work best (e.g. 400x400px)</p>
                                <InputError message={errors.company_logo} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
