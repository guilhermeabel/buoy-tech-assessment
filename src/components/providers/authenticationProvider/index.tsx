import { useAppSelector } from "hooks";
import { getAuth } from "store/auth";
import { useEffect } from "react";
import { useAppDispatch } from "hooks";
import { updateAuth } from "store/auth";
import Login from "pages/login";
import LoginService from "services/login";

interface AuthenticationProviderProps {
  children: JSX.Element | JSX.Element[];
}

export function AuthenticationProvider({
  children,
}: AuthenticationProviderProps) {
  const auth = useAppSelector(getAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleValidation = async () => {
      const session = await LoginService.getCurrentToken();

      if (session) {
        dispatch(
          updateAuth({
            accessToken: session.access,
            refreshToken: session.refresh,
          })
        );
      } else {
        dispatch(updateAuth({ accessToken: null, refreshToken: null }));
      }
    };

    handleValidation();
  }, []);

  return <>{auth.accessToken ? children : <Login />}</>;
}
