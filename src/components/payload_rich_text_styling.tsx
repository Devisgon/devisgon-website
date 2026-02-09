"use client";

import {
  RichText,
  type JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";

type Props = {
  content: any;
};

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,

  heading: (args) => {
    const { node, nodesToJSX } = args;
    const children = nodesToJSX({ nodes: node.children });

    const base = "font-semibold mt-10 mb-4 text-t-primary dark:text-t-secondary"; 

    if (node.tag === "h1") return <h1 className={`text-5xl ${base}`}>{children}</h1>;
    if (node.tag === "h2") return <h2 className={`text-4xl ${base}`}>{children}</h2>;
    if (node.tag === "h3") return <h3 className={`text-3xl ${base}`}>{children}</h3>;

    if (typeof defaultConverters.heading === "function") {
      return defaultConverters.heading(args);
    }

    return children;
  },

  

  paragraph: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    return (
      <p className="text-lg leading-relaxed mb-5 text-t-secondary dark:text-t-primary">{children}</p>
    );
  },

  list: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });

    if (node.listType === "bullet") {
      return <ul className="list-disc ml-6 mb-6 space-y-2 text-t-secondary dark:-text-t-primary">{children}</ul>;
    }

    return <ol className="list-decimal ml-6 mb-6 space-y-2 text-t-secondary dark:text-t-primary">{children}</ol>;
  },

  listitem: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    return <li className="text-t-secondary dark:text-t-primary">{children}</li>;
  },

  table: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    return (
      <div className="overflow-x-auto my-8">
        <table className="min-w-full border border-gray-300 text-t-secondary data-text-t-primary">{children}</table>
      </div>
    );
  },

  tablerow: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    return <tr className="border-b">{children}</tr>;
  },

  tablecell: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    return <td className="p-3 border">{children}</td>;
  },

  tableheadercell: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    return <th className="p-3 border bg-gray-100 text-left">{children}</th>;
  },

  link: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    return (
      <a
        href={node.fields?.url}
        className="underline text-blue-500 "
      >
        {children}
      </a>
    );
  },

  quote: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    return (
      <blockquote className="border-l-4 border-t-primary dark:text-t-primary pl-4 italic my-6 text-t-secondary">
        {children}
      </blockquote>
    );
  },

 
});

export default function PayloadRichTextStyling({ content }: Props) {
  if (!content) return null;

  return <RichText data={content} converters={converters} />;
}
