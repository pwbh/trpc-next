import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { getProviders, signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import styled from 'styled-components';
import Github from '@/icons/Github';
import Google from '@/icons/Google';

const Background = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #dfdfdf;
  padding: 25px;
  width: 350px;
  min-height: 500px;
  border-radius: 20px;

  & > * {
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 35px;
  text-align: center;
  line-height: 32px;
  max-width: 300px;
`;

const Providers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const BaseAuthBtn = styled.button`
  transition: 200ms linear;
  transition-property: box-shadow;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  background: transparent;
  cursor: pointer;
  width: 260px;
  height: 48px;
  line-height: 16px;

  & > * {
    margin-right: 8px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const GithubBtn = styled(BaseAuthBtn)`
  background: black;
  color: white;
`;

const GoogleBtn = styled(BaseAuthBtn)`
  border: 1px solid #d3d3d3;
`;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
};

const ProviderButton = ({ name, onClick }: any) => {
  switch (name) {
    case 'GitHub': {
      return (
        <GithubBtn onClick={onClick}>
          <Github />
          <span>Sign in with {name}</span>
        </GithubBtn>
      );
    }
    case 'Google': {
      return (
        <GoogleBtn onClick={onClick}>
          <Google />
          <span>Sign in with {name}</span>
        </GoogleBtn>
      );
    }
    default: {
      return (
        <BaseAuthBtn onClick={onClick}>
          <span>Sign in with {name}</span>
        </BaseAuthBtn>
      );
    }
  }
};

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Background>
      <Content>
        <LoginContainer>
          <Title>Sign In</Title>
          <Providers>
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <ProviderButton
                  name={provider.name}
                  onClick={() => signIn(provider.id)}
                />
              </div>
            ))}
          </Providers>
        </LoginContainer>
      </Content>
    </Background>
  );
}
