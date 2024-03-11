import GlobalStyles from "@/styles/globals";
import type { AppProps } from "next/app";
import "@/assets/fonts/font.css";
import DefaultLayout from "@/components/layout/DefaultLayout";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import "@/styles/map-elements.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Script from "next/script";

const gtagURI = process.env.NEXT_PUBLIC_GA_GTAG_URL;
const gtag = process.env.NEXT_PUBLIC_GA_GTAG;

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
            <Script async src={gtagURI}></Script>
            <Script id="gtag-script">
                {`window.dataLayer = window.dataLayer || [];
                        function gtag() {
                            dataLayer.push(arguments);
                        }
                        gtag('js', new Date());

                        gtag('config', '${gtag}');
                        console.log("loaded")`}
            </Script>
        </>
    );
}
