/**
 * @jest-environment jsdom
 */

 import React from "react"
 import { models, test } from "@paperpod/common";
 import { render, waitFor } from "@testing-library/react";
 import { Popup} from "./popup"; 
import { chromeWithTabs, withMockedChrome } from "./chrome_mock";
 
 const renderPopup = () => render(<Popup/>)

describe("The popup component", () => {

    it("does render without throwing", withMockedChrome(chromeWithTabs(), () => {

        expect(() => {

            renderPopup()
        }).not.toThrow()
    })); 

    //NOTE: likely to become outdated 
    it("Does show paperpod text", withMockedChrome(chromeWithTabs("https://example.com"), () => {

        const { findByText } = renderPopup(); 
        waitFor(() => {expect(findByText("Paperpod")).toBeInTheDocument()})
    }));
});
 

 