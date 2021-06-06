import * as React from "react";

export const FrontendContext = React.createContext<{
  serverHostname: string;
}>({
  /**
   * The address of the api.
   * E.g. https://paperpod.fm.
   *
   * If calling from same server (i.e. from web frontend),
   * this can be omitted.
   */
  serverHostname: "",
});

export const FrontendContextProvider = ({
  children,
  serverHostname,
}: {
  children: any;
  serverHostname: string;
}) => {
  return (
    <FrontendContext.Provider
      value={{
        serverHostname,
      }}
    >
      {children}
    </FrontendContext.Provider>
  );
};
