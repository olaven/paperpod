import { logger } from "@paperpod/common";

export const getAdminBasic = () => {
  const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    logger.error({
      message: `Admin credentials not present in environment`,
    });
    throw `Admin credentials not present in environment.`;
  }

  return {
    headers: {
      Authorization: `Basic ${ADMIN_USERNAME}:${ADMIN_PASSWORD}`,
    },
  };
};
