import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

let providers = [];

if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  providers.push(
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  );
}

export const authOptions = {
  // Configure one or more authentication providers
  providers,
};

export default NextAuth(authOptions);
