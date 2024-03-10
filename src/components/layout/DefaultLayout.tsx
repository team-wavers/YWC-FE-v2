import React, { useEffect } from "react";
import { Components as Layout } from "./DefaultLayout.components";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);

        window.addEventListener("resize", () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        });
    });

    return (
        <Layout.Container>
            <Layout.Main>{children}</Layout.Main>
        </Layout.Container>
    );
};

export default DefaultLayout;
