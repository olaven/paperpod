//Copied from: https://stitches.dev/blog/using-nextjs-with-stitches

import * as React from "react";
import NextDocument, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import { getCssString } from "@paperpod/ui";

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const extractedStyles = getCssString();
    const initialProps = await NextDocument.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style dangerouslySetInnerHTML={{ __html: extractedStyles }} />
          <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Work+Sans&display=swap');
          </style>
        </>
      ),
    };
  }
}
