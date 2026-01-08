import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-[#B5F482] text-black">
                <AppLogoIcon className="size-5 fill-current text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold text-white">
                    Portfolio CMS
                </span>
            </div>
        </>
    );
}
