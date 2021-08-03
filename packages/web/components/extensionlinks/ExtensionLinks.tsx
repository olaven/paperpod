import { A, H3, Paragraph } from "@paperpod/ui";

export const ExtensionLinks = () => (
  <>
    <H3>Browser extensions:</H3>
    <Paragraph>
      The browser extensions make adding articles easy!
      <ul>
        <li>
          <A href="https://addons.mozilla.org/en-US/firefox/addon/paperpod/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search">
            Download for Firefox
          </A>
        </li>
        <li>
          <A href="https://chrome.google.com/webstore/detail/paperpod/fpildieoinnkdnnippainijkpdkkohfp">
            Download for Chrome
          </A>
        </li>
      </ul>
    </Paragraph>
  </>
);
