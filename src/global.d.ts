declare module "react-ellipsis-text" {
  import React from "react";

  interface EllipsisTextProps {
    text: string;
    length: number;
    tooltip?: string;
  }

  const EllipsisText: React.FC<EllipsisTextProps>;
  export default EllipsisText;
}
