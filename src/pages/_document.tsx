import type { DocumentContext, DocumentInitialProps } from "next/document";
import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

const serviceURI = process.env.NEXT_PUBLIC_SERVICE_URI;

export default class MyDocument extends Document {
    static async getInitialProps(
        ctx: DocumentContext,
    ): Promise<DocumentInitialProps> {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <title>전남청년 문화복지카드 가맹점 검색</title>
                    <link rel="icon" href="/favicon.ico" />
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0, user-scalable=0"
                    />
                    <meta
                        name="description"
                        content="전남청년 문화복지카드 가맹점 검색 서비스"
                    />
                    <meta content="#f1f2f4" name="theme-color" />
                    <meta content={serviceURI} property="og:url" />
                    <meta content="website" property="og:type" />
                    <meta
                        content="문화복지카드 가맹점을 쉽게 검색해보세요!"
                        property="og:description"
                    />
                    <meta content="./thumbnail.png" property="og:image" />
                    <meta content="1200" property="og:image:width" />
                    <meta content="630" property="og:image:height" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
