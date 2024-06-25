import React, { useState, useCallback, useContext, useEffect } from 'react';
import Editor from "@monaco-editor/react";
import { Play } from 'lucide-react';
import { ThemeContext } from "../contexts/themeContext";

const NodeJSCodeEditor = () => {
  const [code, setCode] = useState('// Write your JavaScript code here\nconsole.log("Hello, JS Prodigy!");');
  const [output, setOutput] = useState('');
  const [editorTheme, setEditorTheme] = useState('vs-light');
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setEditorTheme(theme === 'night' ? 'vs-dark' : 'vs-light');
  }, [theme]);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const runCode = useCallback(() => {
    try {
      setOutput('');
      const originalLog = console.log;
      console.log = (...args) => {
        setOutput(prev => prev + args.join(' ') + '\n');
      };
      // eslint-disable-next-line no-new-func
      new Function(code)();
      console.log = originalLog;
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  }, [code]);

  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on',
    roundedSelection: false,
    scrollBeyondLastLine: false,
    readOnly: false,
  };

  return (
    <div className="flex flex-col h-full bg-base-100">
      <div className="bg-base-200 py-2 px-4 flex justify-between items-center border-b border-base-300">
        <h2 className="text-lg font-semibold text-base-content">JavaScript Editor</h2>
        <button
          className="btn btn-primary btn-sm"
          onClick={runCode}
        >
          <Play size={16} className="mr-1" /> Run
        </button>
      </div>
      <div className="flex-grow flex overflow-hidden">
        <div className="w-1/2 h-full">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            value={code}
            onChange={handleEditorChange}
            theme={editorTheme}
            options={editorOptions}
          />
        </div>
        <div className="w-1/2 h-full flex flex-col bg-base-200 border-l border-base-300">
          <div className="bg-base-300 py-1 px-2 text-sm font-semibold text-base-content">
            Console
          </div>
          <div className="flex-grow overflow-auto p-2 text-base-content">
            <pre className="whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeJSCodeEditor;