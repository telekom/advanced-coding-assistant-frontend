import React from 'react';
import Markdown from 'react-markdown';
import gfm from 'remark-gfm';
import CodeHighlighter from '../markdown/CodeHighlighter';
import './Markdown.css';

type MarkdownTextProps = {
  markdown: string;
  children?: React.ReactNode;
  className?: string;
};

const MarkdownText = ({ markdown }: MarkdownTextProps) => {
  return (
    <div>
      <Markdown
        remarkPlugins={[gfm]}
        className="markdown text-text-primary"
        components={{
          code(props) {
            const { children, className, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <CodeHighlighter code={String(children).replace(/\n$/, '')} language={match[1]} />
            ) : (
              <code {...rest} style={{ fontSize: '0.925rem', fontWeight: '700' }} className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
};

export default MarkdownText;
