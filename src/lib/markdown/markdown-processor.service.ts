import fs from "fs";
import path from "path";

export const fileExtension = ".mdx";

export class MarkdownProcessor {
  getSlugFromFilename(filename: string) {
    return filename.replace(/\.mdx$/, "");
  }

  async getFile(path: string) {
    return await import(`${path}${fileExtension}`);
  }

  getFiles(directory: string) {
    const fileNames = fs.readdirSync(directory);

    return fileNames.filter((fileName) => fileName.endsWith(fileExtension));
  }

  getFullPathFromSlug(directory: string, slug: string) {
    return path.join(directory, `${slug}${fileExtension}`);
  }
}

export const markdownProcessor = new MarkdownProcessor();
