import React from "react";
import { Components as Layout } from "./DefaultLayout.components";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Layout.Container>
            <Layout.Main>{children}</Layout.Main>
        </Layout.Container>
    );
};

export default DefaultLayout;
