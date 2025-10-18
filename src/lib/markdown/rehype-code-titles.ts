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
              // Store the original class for debugging
              const originalClass = className[truncateIndex];

              // Remove the :truncate suffix from className
              className[truncateIndex] = originalClass.replace(":truncate", "");

              // Add truncate data attribute to pre element
              if (!node.properties) {
                node.properties = {};
              }

              node.properties["data-truncate"] = true;

              // Also add it to the code element for consistency
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
