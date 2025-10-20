import { visit } from "unist-util-visit";

export function rehypeCodeTitles() {
  return (tree: any) => {
    visit(tree, "element", (node: any) => {
      if (node.tagName === "pre") {
        const codeElement = node.children?.find(
          (child: any) => child.tagName === "code",
        );

        if (codeElement && codeElement.properties?.className) {
          const className = codeElement.properties.className;

          if (Array.isArray(className)) {
            const truncateIndex = className.findIndex((cls: string) =>
              cls.includes(":truncate"),
            );

            if (truncateIndex !== -1) {
              const originalClass = className[truncateIndex];

              className[truncateIndex] = originalClass.replace(":truncate", "");

              if (!node.properties) {
                node.properties = {};
              }

              node.properties["data-truncate"] = true;

              if (!codeElement.properties) {
                codeElement.properties = {};
              }

              codeElement.properties["data-truncate"] = true;
            }
          }
        }
      }
    });
  };
}
