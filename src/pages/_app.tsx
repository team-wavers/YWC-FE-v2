import GlobalStyles from "@/styles/globals";
import type { AppProps } from "next/app";
import "@/assets/fonts/font.css";
import DefaultLayout from "@/components/layout/DefaultLayout";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import "@/styles/map-elements.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: Infinity,
            gcTime: Infinity,
        },
    },
});

export default function App({ Component, pageProps }: AppProps) {
    const color = "light";
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider
                    theme={color === "light" ? theme["light"] : theme["dark"]}
                >
                    <DefaultLayout>
                        <GlobalStyles />
                        <Component {...pageProps} />
                    </DefaultLayout>
                </ThemeProvider>
            </QueryClientProvider>
        </>
    );
}
