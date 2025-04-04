import { hooks } from "./utils";
import { ChildrenPropsI } from "./interface";

function ContextContainer({ children }: Readonly<ChildrenPropsI>) {
  return <hooks.ProvideAuthContext>{children}</hooks.ProvideAuthContext>;
}

export default ContextContainer;
