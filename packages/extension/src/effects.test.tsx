/**
 * @jest-environment jsdom
 */

import React from "react"
import { models, test } from "@paperpod/common";
import { render, waitFor } from "@testing-library/react";

import { useUrl } from "./effects";

const TestComponent = () => {
  const url = useUrl(); 
  return <div>url is {url}</div>
}

const renderTestComponent = () => {

  return render(<TestComponent/>);
};

describe("Browser extension effects", () => {

  //TODO: type
  const withMockedChrome = (chrome: any, action: () => void) =>() =>  {
    const before = global.chrome; 
    global.chrome = chrome; 
    action();
    global.chrome = before; 
  }

  describe("useURL", () => {

    const chromeWithTabs = (url: string) => ({
      tabs: {
        query: (options: any, callback: ([{url: string}]) => void) => {
          callback([{url}])
        }
      }
    })

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
