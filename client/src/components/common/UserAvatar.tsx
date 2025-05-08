import Image from "next/image";

type UserAvatarProps = {
    name: string;
    image?: string;
};

const UserAvatar = ({ name, image }: UserAvatarProps) => {
    const showFallback = !image || image.trim() === "";

    return (
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700 overflow-hidden">
            {!showFallback ? (
                <Image
                    src={image}
                    alt={name}
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                />
            ) : (
                <span>{name.charAt(0).toUpperCase()}</span>
            )}
        </div>
    );
};

export default UserAvatar;
