import { CheckCheck, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeHighlighter = ({ code, language }: { code: string; language: string }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {});
    setCopied(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }, [copied]);
  return (
    <div>
      <div className="flex justify-between bg-[rgb(47,47,47)] text-gray-200 items-center bg-darker-gray py-4 px-1.5 rounded-tl-md rounded-tr-md h-6">
        <p className="flex items-center text-sm ">{language}</p>
        <button className="text-sm flex " onClick={() => copyToClipboard(String(code))}>
          <div>
            <span>
              {!copied ? (
                <div className="flex items-center">
                  <Copy className="h-4 w-4" /> {' ' + t('copyCode')}
                </div>
              ) : (
                <div className="flex items-center">
                  <CheckCheck className="h-4 w-4" /> {' ' + t('copied')}
                </div>
              )}
            </span>
          </div>
        </button>
      </div>
      <SyntaxHighlighter
        style={dracula}
        PreTag="div"
        customStyle={{
          padding: '0.725rem',
          marginTop: '0',
          fontSize: '0.825rem',
          borderRadius: '0',
          borderBottomRightRadius: '5px',
          borderBottomLeftRadius: '5px',
          scrollbarWidth: 'none',
        }}
        language={language}
      >
        {String(code).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeHighlighter;
