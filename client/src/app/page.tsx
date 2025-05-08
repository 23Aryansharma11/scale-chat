import React from "react";
import { Button } from "@/components/ui/button";
import {
    MessageSquareText,
    ShieldCheck,
    SmilePlus,
    Smartphone,
    Users,
    HeartHandshake,
} from "lucide-react";
import Navbar from "@/components/base/Navbar";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "./api/auth/[...nextauth]/options";

const LandingPage = async () => {
    const session: CustomSession | null = await getServerSession(authOptions);

    return (
        <div className="min-h-screen bg-white text-gray-900 flex flex-col">
            <Navbar user={session?.user} />

            {/* Hero */}
            <section className="flex-1 flex items-center justify-center px-6 py-20 text-center">
                <div className="max-w-2xl space-y-6">
                    <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                        Stay connected with the people who matter
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Simple. Private. Reliable. A beautiful chat app that
                        just works— whether you're across the street or across
                        the globe.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button className="px-6 py-3 text-base">
                            Download App
                        </Button>
                        <Button
                            variant="outline"
                            className="px-6 py-3 text-base"
                        >
                            Join Community
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="bg-gray-50 py-20 px-6">
                <div className="max-w-5xl mx-auto text-center space-y-16">
                    <div>
                        <h2 className="text-3xl font-bold mb-4">
                            What Makes Us Different
                        </h2>
                        <p className="text-gray-600 text-base max-w-2xl mx-auto">
                            Built for people, not corporations. Our chat app is
                            designed around comfort, speed, and privacy.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
                        <Feature
                            icon={
                                <MessageSquareText className="h-10 w-10 text-blue-600 mb-4" />
                            }
                            title="Instant Messaging"
                            desc="Chat in real time with lightning-fast delivery and sleek animations."
                        />
                        <Feature
                            icon={
                                <ShieldCheck className="h-10 w-10 text-blue-600 mb-4" />
                            }
                            title="Private by Design"
                            desc="End-to-end encrypted messaging. Your data stays with you."
                        />
                        <Feature
                            icon={
                                <SmilePlus className="h-10 w-10 text-blue-600 mb-4" />
                            }
                            title="Stickers & Emojis"
                            desc="Express yourself with fun stickers and emoji reactions."
                        />
                        <Feature
                            icon={
                                <Smartphone className="h-10 w-10 text-blue-600 mb-4" />
                            }
                            title="Mobile & Desktop"
                            desc="Chat seamlessly across devices with our responsive interface."
                        />
                        <Feature
                            icon={
                                <Users className="h-10 w-10 text-blue-600 mb-4" />
                            }
                            title="Groups & Channels"
                            desc="Stay connected with your clubs, classes, and communities."
                        />
                        <Feature
                            icon={
                                <HeartHandshake className="h-10 w-10 text-blue-600 mb-4" />
                            }
                            title="Community Driven"
                            desc="Built with feedback from real users like you. Join the journey."
                        />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 text-center bg-white">
                <div className="max-w-xl mx-auto space-y-6">
                    <h3 className="text-3xl font-bold">Ready to chat?</h3>
                    <p className="text-gray-600 text-base">
                        Download now and start talking with your friends
                        instantly. It’s free and always will be.
                    </p>
                    <Button className="px-6 py-3 text-base">
                        Download for Android
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t py-6 px-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Chatverse. All rights reserved.
            </footer>
        </div>
    );
};

const Feature = ({
    icon,
    title,
    desc,
}: {
    icon: React.ReactNode;
    title: string;
    desc: string;
}) => (
    <div className="text-center px-4 flex flex-col justify-center items-center">
        {icon}
        <h4 className="font-semibold text-lg mb-2">{title}</h4>
        <p className="text-gray-600 text-sm">{desc}</p>
    </div>
);

export default LandingPage;
