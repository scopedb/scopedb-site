declare module '*.mdx' {
    import React from "react";
    let MDXComponent: (props: any) => React.JSX.Element;
    export default MDXComponent;
}
