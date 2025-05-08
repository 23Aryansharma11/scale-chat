import ProfileMenu from "../auth/ProfileMenu";

const DashboardNavbar = async ({ name, image }: { name: string; image?: string }) => {
    return (
        <header className="w-full shadow-sm min-h-18 bg-white fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                <h1 className="text-2xl font-bold text-blue-600">Scale Chat</h1>
                <ProfileMenu name={name} image={image} />
            </div>
        </header>
    );
};

export default DashboardNavbar;
