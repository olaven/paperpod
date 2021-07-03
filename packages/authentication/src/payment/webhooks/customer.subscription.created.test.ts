import faker from "faker";
import Stripe from "stripe";
import { logger } from "../../../../common/src";
import { mockStripe } from "../../test-utils/test-utils";
import { _customerSubscriptionCreated } from "./customer.subscription.created";

describe("Webhook handler for a getting subscribing", () => {
  const setup = async () => {
    const email = faker.internet.email();
    const getCustomer = jest.fn((id: string) => ({ email }));

    const customerId = faker.datatype.uuid();
    await _customerSubscriptionCreated({
      customers: {
        retrieve: getCustomer,
      },
    } as any)({
      data: {
        object: {
          customer: customerId,
          email,
        },
      },
    } as any as Stripe.Event);

    return { customerId, email, getCustomer };
  };

  it("Tries to get the customer associated with the event subscription", async () => {
    const { customerId, getCustomer } = await setup();
    expect(getCustomer).toHaveBeenCalledWith(customerId);
  });
});
