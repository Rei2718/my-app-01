import React, { useEffect, useState } from "react";
import anime from "animejs";
import Image from "next/image";

interface SplashScreenProps {
    finishLoading: () => void; // finishLoading の型を指定
}

const SplashScreen: React.FC<SplashScreenProps> = ({ finishLoading }) => {
    const [isMounted, setIsMounted] = useState(false);

    const animate = () => {
        const loader = anime.timeline({
            complete: () => {
                // Add a fade-out animation when the logo animation is complete
                anime({
                    targets: ".splash-screen",
                    opacity: 0,
                    duration: 1000,
                    easing: "easeInOutExpo",
                    complete: finishLoading,
                });
            },
        });

        loader
            .add({
                targets: "#logo",
                delay: 0,
                scale: 1,
                duration: 1000,
                easing: "easeInOutExpo",
            })
            .add({
                targets: "#logo",
                delay: 0,
                scale: 1.25,
                duration: 1000,
                easing: "easeInOutExpo",
            })
            .add({
                targets: "#logo",
                delay: 0,
                scale: 1,
                duration: 1000,
                easing: "easeInOutExpo",
            })
            .add({
                targets: "#logo",
                delay: 0,
                scale: 1.25,
                duration: 1000,
                easing: "easeInOutExpo",
            })
            .add({
                targets: "#logo",
                delay: 0,
                scale: 1,
                duration: 1000,
                easing: "easeInOutExpo",
            })
            .add({
                targets: "#logo",
                delay: 0,
                scale: 1.25,
                duration: 1000,
                easing: "easeInOutExpo",
            })
    };

    useEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), 10);
        animate();
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={`flex items-center justify-center h-screen splash-screen ${isMounted ? "fade-in" : ""}`}>
            <div className="text-center">
                <Image
                    id="logo"
                    src="/logo.png"
                    alt=""
                    width={60}
                    height={60}
                    className="mx-auto mb-4"
                />
                <p className="text-[#81d8d0]">Loading...</p>
            </div>
        </div>
    );
};

export default SplashScreen;
