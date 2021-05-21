/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, waitFor } from "@testing-library/react";

import { usePosting, useUrl } from "./effects";
import { withMockedChrome, chromeWithTabs, withMockedFetch } from "./test_mock";

describe("Browser extension effects", () => {
  const TestComponent = () => {
    const url = useUrl();
    return <div>url is {url}</div>;
  };

  const renderTestComponent = () => {
    return render(<TestComponent />);
  };
  describe("useURL", () => {
    it(
      "does render without throwing",
      withMockedChrome(
        {
          tabs: {
            query: () => {},
          },
        },
        () => {
          expect(() => {
            renderTestComponent();
          }).not.toThrow();
        }
      )
    );

    it(
      "Does return the url returned by the browser api",
      withMockedChrome(chromeWithTabs("https://example.com"), () => {
        const { findByText } = renderTestComponent();
        waitFor(() => {
          expect(findByText("https://example.com")).toBeInTheDocument();
        });
      })
    );
  });

  describe("usePosting", () => {
    const PostinTestComponent = ({ token = "FAKE_TOKEN" }) => {
      const status = usePosting(token);
      return <div>status is {status}</div>;
    };

    const renderPostingTestComponent = () => {
      return render(<PostinTestComponent />);
    };

    it(
      "has status 'pending' by default",
      withMockedChrome(chromeWithTabs("example.com"), () => {
        const { getByText } = renderPostingTestComponent();
        waitFor(() => {
          expect(getByText("status is pending")).toBeInTheDocument();
        });
      })
    );

    it(
      "has status 'posted' if server returns 201",
      withMockedChrome(
        chromeWithTabs("example.com"),
        withMockedFetch({ status: 201 }, (response) => {
          const { getByText } = renderPostingTestComponent();
          waitFor(() => {
            expect(getByText("status is posted")).toBeInTheDocument();
          });
        })
      )
    );

    it(
      "does not have status 'posted' if server returns 500",
      withMockedChrome(
        chromeWithTabs("example.com"),
        withMockedFetch({ status: 500 }, (response) => {
          const { getByText } = renderPostingTestComponent();
          waitFor(() => {
            expect(getByText("status is posted")).not.toBeInTheDocument();
          });
        })
      )
    );

    it(
      "has status 'error' if server returns 500",
      withMockedChrome(
        chromeWithTabs("example.com"),
        withMockedFetch({ status: 500 }, (response) => {
          const { getByText } = renderPostingTestComponent();
          waitFor(() => {
            expect(getByText("status is error")).not.toBeInTheDocument();
          });
        })
      )
    );
  });
});
