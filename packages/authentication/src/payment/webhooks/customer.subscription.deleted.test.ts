import faker from "faker";
import Stripe from "stripe";
import { test } from "../../../../common/src";
import { users } from "../../authdatabase/authdatabase";
import { customerSubscriptionDeleted } from "./customer.subscription.deleted";

//FIXME: something async off here - jest confusing the tests. Figure out
describe.skip("Function handling subscription deletion event", () => {
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
            userId: idOverride === undefined ? user.id : idOverride,
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
    expect(trigger(id)).rejects.toThrowError(`${id} does not exist.`);
  });

  it("does update subscription to inactive", async () => {
    const { user } = await trigger();
    expect(user.subscription).toEqual("active");

    const after = await users.getById(user.id);
    expect(after.subscription).toEqual("inactive");
  });
});
