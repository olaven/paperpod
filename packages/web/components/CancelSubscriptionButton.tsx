import { A, Button, Paragraph } from "@paperpod/ui";
import { NO_CONTENT } from "node-kall";
import * as react from "react";
import { fetchers } from "@paperpod/frontend";
import { UserContext } from "@paperpod/frontend/src/authentication/UserContext";

const ErrorMessage = () => (
  <Paragraph>
    An error occurred when cancelling subscription. Please{" "}
    <A href="mailto:olav@sundfoer.com">send an email</A> and we'll sort this
    out!
  </Paragraph>
);

export const CancelSubscriptionButton = () => {
  const { user, token, setToken } = react.useContext(UserContext);
  const [error, setError] = react.useState(false);

  const onCancel = async () => {
    const [status] = await fetchers.subscription.cancelSubscription(
      user,
      await token()
    );

    console.log("Got status", status);
    if (status === NO_CONTENT) {
      console.log("Setting null token");
      setToken(null);
    } else {
      setError(true);
    }
  };

  return error ? (
    <ErrorMessage></ErrorMessage>
  ) : (
    <Button onClick={onCancel}>Cancel subscription</Button>
  );
};
