import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import * as skillsRoutes from '@/routes/skills';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus, Zap, TrendingUp } from 'lucide-react';

interface Skill {
    id: number;
    name: string;
    category: string;
    proficiency: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Skills',
        href: '/skills',
    },
];

export default function SkillsIndex({ skills }: { skills: Skill[] }) {
    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Skills" />
            <div className="flex h-full flex-1 flex-col gap-8 p-6 md:p-8 bg-black text-white">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-8">
                    <div>
                        <h1 className="font-serif text-4xl font-medium tracking-tight mb-2">Skills</h1>
                        <p className="text-white/60">Manage your technical expertise and proficiency levels.</p>
                    </div>
                    <Button asChild className="bg-[#B5F482] text-black hover:bg-[#a3e070] font-bold">
                        <Link href={skillsRoutes.create()}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Skill
                        </Link>
                    </Button>
                </div>

                {skills.length === 0 ? (
                    <div className="flex min-h-[400px] flex-col items-center justify-center border border-white/10 bg-white/5 backdrop-blur-sm text-center">
                        <div className="mb-4 w-16 h-16 border border-white/10 flex items-center justify-center">
                            <Zap className="h-8 w-8 text-white/20" />
                        </div>
                        <h3 className="mb-1 text-lg font-medium text-white">No skills yet</h3>
                        <p className="text-sm text-white/50 mb-6">Start building your skill set</p>
                        <Button asChild className="bg-[#B5F482] text-black hover:bg-[#a3e070] font-bold">
                            <Link href={skillsRoutes.create()}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Skill
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                            <div key={category}>
                                <h2 className="font-serif text-2xl font-medium mb-6 flex items-center gap-2">
                                    <span className="text-[#B5F482]">//</span> {category}
                                    <span className="text-sm text-white/40 font-sans">({categorySkills.length})</span>
                                </h2>
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                    {categorySkills.map((skill) => (
                                        <Link
                                            key={skill.id}
                                            href={skillsRoutes.edit(skill.id)}
                                            className="group relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition hover:border-[#B5F482]/30 hover:bg-white/10"
                                        >
                                            <div className="mb-6">
                                                <h3 className="font-medium text-white mb-1 group-hover:text-[#B5F482] transition-colors">
                                                    {skill.name}
                                                </h3>
                                                <div className="flex items-center gap-1 text-xs text-white/40">
                                                    <TrendingUp className="w-3 h-3" />
                                                    <span>{skill.proficiency}% proficiency</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-1.5 w-full overflow-hidden bg-white/10">
                                                    <div
                                                        className="h-full bg-[#B5F482] transition-all duration-1000"
                                                        style={{ width: `${skill.proficiency}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
