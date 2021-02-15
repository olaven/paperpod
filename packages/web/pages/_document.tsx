//Copied from: https://stitches.dev/blog/using-nextjs-with-stitches

import React from 'react';
import NextDocument, { DocumentContext } from 'next/document';
import { css } from "@paperpod/ui";

export default class Document extends NextDocument {
    static async getInitialProps(ctx: DocumentContext) {
        const originalRenderPage = ctx.renderPage;

        try {
            let extractedStyles: string[] | undefined;
            ctx.renderPage = () => {
                const { styles, result } = css.getStyles(originalRenderPage);
                extractedStyles = styles;
                return result;
            };

            const initialProps = await NextDocument.getInitialProps(ctx);

            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}

                        {extractedStyles?.map((content, index) => (
                            <style key={index} dangerouslySetInnerHTML={{ __html: content }} />
                        ))}
                    </>
                ),
            };
        } finally {
        }
    }
}