// convex/auth.config.js

export default {
  providers: [
    {
      // Use the original variable name again
      domain: process.env.CLERK_FRONTEND_API_URL, 
      applicationID: "convex",
    },
  ],
};
