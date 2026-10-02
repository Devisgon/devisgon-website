import { cloneElement, isValidElement, type ReactNode } from "react";
import { translateTextForLanguage } from "@/lib/blog-language";

async function translateNode(node: ReactNode, lang: string): Promise<ReactNode> {
  if (typeof node === "string") return translateTextForLanguage(node, lang);
  if (Array.isArray(node)) return Promise.all(node.map((child) => translateNode(child, lang)));
  if (isValidElement<{ children?: ReactNode }>(node) && node.props.children !== undefined) {
    return cloneElement(node, { children: await translateNode(node.props.children, lang) });
  }
  return node;
}

export default async function LocalizedText({ lang, children }: { lang: string; children: ReactNode }) {
  if (lang === "en") return children;
  return translateNode(children, lang);
}
