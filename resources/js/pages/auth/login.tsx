import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head, Link } from '@inertiajs/react';
import { ArrowRight, Lock, Mail } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
}: LoginProps) {
    return (
        <AuthLayout
            title="Identify"
            description="Enter credentials to access the system core."
        >
            <Head title="Log in" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-8 mt-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-8">
                            {/* Custom Email Input */}
                            <div className="relative group">
                                <Mail className="absolute left-0 top-3 w-5 h-5 text-white/40 group-focus-within:text-[#B5F482] transition-colors z-10" />
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    className="w-full bg-transparent border-0 border-b border-white/20 rounded-none py-6 pl-8 text-white focus-visible:ring-0 focus-visible:border-[#B5F482] placeholder:text-transparent peer"
                                    placeholder="Email Address"
                                />
                                <Label
                                    htmlFor="email"
                                    className="absolute left-8 top-4 text-white/40 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#B5F482] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs cursor-text pointer-events-none"
                                >
                                    Email Address
                                </Label>
                                {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
                            </div>

                            {/* Custom Password Input */}
                            <div className="relative group">
                                <Lock className="absolute left-0 top-3 w-5 h-5 text-white/40 group-focus-within:text-[#B5F482] transition-colors z-10" />
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    className="w-full bg-transparent border-0 border-b border-white/20 rounded-none py-6 pl-8 text-white focus-visible:ring-0 focus-visible:border-[#B5F482] placeholder:text-transparent peer"
                                    placeholder="Password"
                                />
                                <Label
                                    htmlFor="password"
                                    className="absolute left-8 top-4 text-white/40 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#B5F482] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs cursor-text pointer-events-none"
                                >
                                    Password
                                </Label>
                                {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password}</p>}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        className="border-white/20 data-[state=checked]:bg-[#B5F482] data-[state=checked]:text-black"
                                    />
                                    <Label htmlFor="remember" className="text-xs text-white/60 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Remember session
                                    </Label>
                                </div>
                                {canResetPassword && (
                                    <Link
                                        href={request()}
                                        className="text-xs text-white/40 hover:text-[#B5F482] transition-colors"
                                    >
                                        Forgot credentials?
                                    </Link>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="group relative w-full overflow-hidden bg-white py-6 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-[#B5F482] hover:pr-8 disabled:opacity-50 disabled:cursor-not-allowed rounded-none"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {processing && <Spinner className="w-4 h-4 mr-2" />}
                                    Authenticate
                                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                                </span>
                            </Button>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-xs font-mono text-[#B5F482] border border-[#B5F482]/20 bg-[#B5F482]/10 p-2">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
