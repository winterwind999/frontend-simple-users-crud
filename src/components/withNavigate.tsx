import type { ComponentType } from "react";
import { useNavigate, type NavigateFunction } from "react-router-dom";

type InjectedProps = {
  navigate: NavigateFunction;
};

export const withNavigate = <P extends InjectedProps>(
  Component: ComponentType<P>,
) => {
  type PropsWithoutNavigate = Omit<P, keyof InjectedProps>;

  const Wrapper = (props: PropsWithoutNavigate) => {
    const navigate = useNavigate();
    return <Component {...(props as P)} navigate={navigate} />;
  };

  Wrapper.displayName = `withNavigate(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapper;
};
