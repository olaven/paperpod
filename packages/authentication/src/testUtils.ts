export const stripeResource = <T>(resources: T[]) => ({
  data: resources.map((resource) => ({
    ...resource,
    metadata: {
      collection: "paperpod",
    },
  })),
});
