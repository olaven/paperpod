/**
 * @jest-environment jsdom
 */

import React from "react"
import { models, test } from "@paperpod/common";
import { render, waitFor } from "@testing-library/react";

import { useUrl } from "./effects";
import { withMockedChrome, chromeWithTabs } from "./chrome_mock";

const TestComponent = () => {
  const url = useUrl(); 
  return <div>url is {url}</div>
}

const renderTestComponent = () => {

  return render(<TestComponent/>);
};

describe("Browser extension effects", () => {

  
  describe("useURL", () => {

    it("does render without throwing", withMockedChrome({
      tabs: {
        query:() => {}
      }
    }, () => {
    
      expect(() => {
        renderTestComponent()
      }).not.toThrow()
    }))

    it("Does return the url returned by the browser api", 
      withMockedChrome(chromeWithTabs("https://example.com"), () => {
        
        const { findByText } = renderTestComponent(); 
        waitFor(() => {

          expect(findByText("https://example.com")).toBeInTheDocument();
        })
      })
    );
  });
});
