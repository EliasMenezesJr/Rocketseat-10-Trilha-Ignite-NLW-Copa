import { ReactNode, createContext, useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: String;
  avatarURL?: String;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState({} as UserProps);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "",
    redirectUri: AuthSession.makeRedirectUri({ 
      useProxy: true,
      scheme: ''
    }),
    scopes: ["profile", "email"],
  });

  async function signIn() {
    try {
      setIsUserLoading(true);
      await promptAsync();
    } catch (error) {
      console.log("DEU ERRO",error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }
  
  async function signInWithGoogle(acces_token: string){
    console.log("TOKEN:", acces_token );
  }

  useEffect(() => {
    if(response?.type === 'success' && response.authentication?.accessToken){
      console.log("RESPONSE:", response);
      
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
