import PasswordController from '@/actions/App/Http/Controllers/Settings/PasswordController';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head } from '@inertiajs/react';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { edit } from '@/routes/user-password';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Password settings',
        href: edit().url,
    },
];

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Password settings" />

            <SettingsLayout>
                <div className="space-y-8">
                    <div className="border-b border-white/10 pb-6">
                        <h2 className="font-serif text-2xl font-medium text-white mb-2">Update Password</h2>
                        <p className="text-white/60 text-sm">Ensure your account is using a long, random password to stay secure</p>
                    </div>

                    <Form
                        {...PasswordController.update.form()}
                        options={{
                            preserveScroll: true,
                        }}
                        resetOnError={[
                            'password',
                            'password_confirmation',
                            'current_password',
                        ]}
                        resetOnSuccess
                        onError={(errors) => {
                            if (errors.password) {
                                passwordInput.current?.focus();
                            }

                            if (errors.current_password) {
                                currentPasswordInput.current?.focus();
                            }
                        }}
                        className="space-y-6"
                    >
                        {({ errors, processing, recentlySuccessful }) => (
                            <>
                                <div className="grid gap-3">
                                    <Label htmlFor="current_password" className="text-white/70">
                                        Current password
                                    </Label>

                                    <Input
                                        id="current_password"
                                        ref={currentPasswordInput}
                                        name="current_password"
                                        type="password"
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50"
                                        autoComplete="current-password"
                                        placeholder="Enter current password"
                                    />

                                    <InputError
                                        message={errors.current_password}
                                    />
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="password" className="text-white/70">
                                        New password
                                    </Label>

                                    <Input
                                        id="password"
                                        ref={passwordInput}
                                        name="password"
                                        type="password"
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50"
                                        autoComplete="new-password"
                                        placeholder="Enter new password"
                                    />

                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="password_confirmation" className="text-white/70">
                                        Confirm password
                                    </Label>

                                    <Input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#B5F482]/50"
                                        autoComplete="new-password"
                                        placeholder="Confirm new password"
                                    />

                                    <InputError
                                        message={errors.password_confirmation}
                                    />
                                </div>

                                <div className="flex items-center gap-4 pt-4">
                                    <Button
                                        disabled={processing}
                                        data-test="update-password-button"
                                        className="bg-[#B5F482] text-black hover:bg-[#a3e070] font-bold"
                                    >
                                        Update Password
                                    </Button>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-[#B5F482]">
                                            Password updated successfully
                                        </p>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
