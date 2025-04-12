import { hooks } from "./utils";
import { ChildrenPropsI } from "./interface";

function ContextContainer({ children }: Readonly<ChildrenPropsI>) {
  return (
    <hooks.ProvideAuthContext>
      <hooks.ProvideProfileContext>
        <hooks.ProvideProductContext>
          <hooks.CreateCategoryProvider>
            {children}
          </hooks.CreateCategoryProvider>
        </hooks.ProvideProductContext>
      </hooks.ProvideProfileContext>
    </hooks.ProvideAuthContext>
  );
}

export default ContextContainer;
