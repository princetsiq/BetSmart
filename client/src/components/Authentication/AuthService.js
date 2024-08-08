import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';

const AuthService = {
  getCurrentAuthenticatedUser: async function() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      console.log("username", username);
      console.log("user id", userId);
      console.log("sign-in details", signInDetails);
      return { username, userId, signInDetails };
    } catch (error) {
      console.error("User is not authenticated", error);
      return null;
    }
  },

  getUserSession: async function() {
    try {
      const session = await fetchAuthSession();
      console.log("id token", session.tokens.idToken);
      console.log("access token", session.tokens.accessToken);
      return session.tokens;
    } catch (error) {
      console.error("Error fetching user session", error);
      return null;
    }
  },

  refreshUserSession: async function() {
    try {
      const session = await fetchAuthSession({ forceRefresh: true });
      console.log("Session refreshed");
      return session.tokens;
    } catch (error) {
      console.error("Error refreshing session", error);
      return null;
    }
  }
};

export default AuthService;