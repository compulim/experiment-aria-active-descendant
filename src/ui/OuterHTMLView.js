import { format } from 'prettier/standalone';
import parserHTML from 'prettier/parser-html';

import './OuterHTMLView.css';
import { useEffect, useState } from 'react';

const OuterHTMLView = ({ elementRef, intervalInMS = 1000 }) => {
  const [outerHTML, setOuterHTML] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setOuterHTML(format(elementRef.current.outerHTML, { parser: 'html', plugins: [parserHTML] }));
    }, intervalInMS);

    return () => clearInterval(interval);
  }, [elementRef, intervalInMS, setOuterHTML]);

  return <pre className="outer-html-view">{outerHTML}</pre>;
};

export default OuterHTMLView;
