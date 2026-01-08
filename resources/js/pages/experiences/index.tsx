import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import * as experiencesRoutes from '@/routes/experiences';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Briefcase, Calendar, MapPin, Plus, Edit } from 'lucide-react';

interface Experience {
    id: number;
    company: string;
    role: string;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    description: string;
    location: string | null;
    company_logo: string | null;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Experience',
        href: '/experiences',
    },
];

export default function ExperiencesIndex({ experiences }: { experiences: Experience[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Experience" />
            <div className="flex h-full flex-1 flex-col gap-8 p-6 md:p-8 bg-black text-white">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-8">
                    <div>
                        <h1 className="font-serif text-4xl font-medium tracking-tight mb-2">Experience</h1>
                        <p className="text-white/60">Manage your professional journey and career timeline.</p>
                    </div>
                    <Button asChild className="bg-[#B5F482] text-black hover:bg-[#a3e070] font-bold">
                        <Link href={experiencesRoutes.create()}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Experience
                        </Link>
                    </Button>
                </div>

                {experiences.length === 0 ? (
                    <div className="flex min-h-[400px] flex-col items-center justify-center border border-white/10 bg-white/5 backdrop-blur-sm text-center">
                        <div className="mb-4 w-16 h-16 border border-white/10 flex items-center justify-center">
                            <Briefcase className="h-8 w-8 text-white/20" />
                        </div>
                        <h3 className="mb-1 text-lg font-medium text-white">No experience yet</h3>
                        <p className="text-sm text-white/50 mb-6">Start documenting your professional journey</p>
                        <Button asChild className="bg-[#B5F482] text-black hover:bg-[#a3e070] font-bold">
                            <Link href={experiencesRoutes.create()}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Experience
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="relative space-y-8 border-l-2 border-white/10 ml-6">
                        {experiences.map((experience, index) => (
                            <div key={experience.id} className="relative pl-10 group">
                                {/* Timeline dot */}
                                <div className={`absolute -left-[9px] top-2 h-4 w-4 rounded-full border-2 border-black ${experience.is_current ? 'bg-[#B5F482]' : 'bg-white/20'}`} />

                                {/* Card */}
                                <Link
                                    href={experiencesRoutes.edit(experience.id)}
                                    className="block border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:border-[#B5F482]/30 hover:bg-white/10 transition-all"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                        <div className="flex items-start gap-4 flex-1">
                                            {/* Company Logo */}
                                            {experience.company_logo ? (
                                                <div className="w-14 h-14 border border-white/10 bg-white p-2 flex-shrink-0">
                                                    <img
                                                        src={`/storage/${experience.company_logo}`}
                                                        alt={experience.company}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex h-14 w-14 items-center justify-center border border-white/10 bg-white/5 text-white/20 flex-shrink-0">
                                                    <Briefcase className="h-6 w-6" />
                                                </div>
                                            )}

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-medium text-white mb-1 group-hover:text-[#B5F482] transition-colors">
                                                    {experience.role}
                                                </h3>
                                                <div className="text-base text-white/70 mb-3">{experience.company}</div>
                                                <div className="flex flex-wrap items-center gap-4 text-xs text-white/50">
                                                    <span className="flex items-center gap-1.5">
                                                        <Calendar className="h-3 w-3" />
                                                        {new Date(experience.start_date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })} -{' '}
                                                        {experience.is_current ? (
                                                            <span className="text-[#B5F482] font-medium">Present</span>
                                                        ) : experience.end_date ? (
                                                            new Date(experience.end_date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
                                                        ) : ''}
                                                    </span>
                                                    {experience.location && (
                                                        <span className="flex items-center gap-1.5">
                                                            <MapPin className="h-3 w-3" />
                                                            {experience.location}
                                                        </span>
                                                    )}
                                                </div>
                                                {experience.description && (
                                                    <div className="mt-4 text-sm leading-relaxed text-white/60 line-clamp-3">
                                                        {experience.description}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Edit Icon */}
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Edit className="h-4 w-4 text-[#B5F482]" />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
