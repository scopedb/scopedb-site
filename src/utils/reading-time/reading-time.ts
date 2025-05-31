import getReadingTime from "reading-time";

export function calculateReadingTime(content: string): string {
  const readingTime = getReadingTime(content);
  return readingTime.text;
}

function cleanMdxBody(body: string): string {
  return (
    body
      // Remove import statements
      .replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, "")
      // Remove export statements
      .replace(/^export\s+.*?$/gm, "")
      // Remove frontmatter (if any leaked through)
      .replace(/^---[\s\S]*?---\s*/m, "")
      // Remove JSX comments
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
      // Remove HTML comments
      .replace(/<!--[\s\S]*?-->/g, "")
      // Remove JSX components (simple cases)
      .replace(/<[A-Z][^>]*>[\s\S]*?<\/[A-Z][^>]*>/g, "")
      // Remove self-closing JSX components
      .replace(/<[A-Z][^/>]*\/>/g, "")
      // Clean up extra whitespace
      .replace(/\n\s*\n\s*\n/g, "\n\n")
      .trim()
  );
}

export function digest(content: string, maxLength: number = 300): string {
  // If content looks like MDX body (contains imports), clean it
  const cleanedContent = content.includes("import ")
    ? cleanMdxBody(content)
    : content;

  return cleanedContent.length > maxLength
    ? cleanedContent.slice(0, maxLength) + "..."
    : cleanedContent;
}
