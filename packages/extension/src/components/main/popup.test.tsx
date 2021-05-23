/**
 * @jest-environment jsdom
 */

import * as React from "react";
import { render, waitFor } from "@testing-library/react";
import { Popup } from "./popup";
import { chromeWithTabs, withMockedChrome } from "../../test_mock";

const renderPopup = () => render(<Popup />);

describe("The popup component", () => {
  it(
    "does render without throwing",
    withMockedChrome(chromeWithTabs(), () => {
      expect(() => {
        renderPopup();
      }).not.toThrow();
    })
  );

  //NOTE: likely to become outdated
  it(
    "Does show paperpod text",
    withMockedChrome(chromeWithTabs("https://example.com"), () => {
      const { findByText } = renderPopup();
      waitFor(() => {
        expect(findByText("Paperpod")).toBeInTheDocument();
      });
    })
  );
});
