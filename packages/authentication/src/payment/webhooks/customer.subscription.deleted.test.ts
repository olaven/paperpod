import faker from "faker";
import Stripe from "stripe";
import { test } from "@paperpod/common";
import { users } from "../../authdatabase/authdatabase";
import { customerSubscriptionDeleted } from "./customer.subscription.deleted";

//FIXME: something async off here - jest confusing the tests. Figure out
describe("Function handling subscription deletion event", () => {
  const trigger = async (idOverride: string | undefined = undefined) => {
    const user = await users.setSubscriptionStatus({
      ...(await users.insert({
        ...test.mocks.user(),
      })),
      subscription: "active",
    });
    const event = {
      data: {
        object: {
          metadata: {
            userId: idOverride ?? user.id,
          },
        },
      },
    };

    await customerSubscriptionDeleted(event as any as Stripe.Event);

    return {
      user,
      event,
    };
  };

  it("throw if the user does not exist", () => {
    const id = faker.datatype.uuid();
    expect(trigger(id)).rejects.toThrow();
  });

  it("does update subscription to inactive", async () => {
    const { user } = await trigger();
    expect(user.subscription).toEqual("active");

    const after = await users.getById(user.id);
    expect(after.subscription).toEqual("inactive");
  });
});
