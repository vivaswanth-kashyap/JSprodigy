import React, { useState, useCallback, useContext, useEffect } from 'react';
import Editor from "@monaco-editor/react";
import { Play, BarChart } from 'lucide-react';
import { ThemeContext } from "../contexts/themeContext";

const NodeJSCodeEditor = () => {
  const [code, setCode] = useState('// Write your JavaScript code here\nconsole.log("Hello, JS Prodigy!");');
  const [output, setOutput] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading,setLoading] = useState(false)
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

  const analyzeCode = useCallback(async () => {
    setLoading(true);
  
    try {
      console.log('Sending code for analysis:', code);
      const response = await fetch('https://ml.jsprodigy.com/code/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Received data:', data);
      
      setAnalysis(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setAnalysis({ error: error.message });
    } finally {
      setLoading(false);
    }
  }, [code]);
  
  useEffect(() => {
    console.log('Loading state changed:', loading);
  }, [loading]);

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
        <div>
          <button
            className="btn btn-primary btn-sm mr-2"
            onClick={runCode}
          >
            <Play size={16} className="mr-1" /> Run
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={analyzeCode}
          >
            <BarChart size={16} className="mr-1" /> Analyze
          </button>
        </div>
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
            Console Output
          </div>
          <div className="flex-grow overflow-auto p-2 text-base-content">
            <pre className="whitespace-pre-wrap">{output}</pre>
          </div>
          <div className="bg-base-300 py-1 px-2 text-sm font-semibold text-base-content">
            Analysis Results
          </div>
          <div className="flex-grow overflow-auto p-2 text-base-content">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="container flex flex-col justify-center items-center space-y-4">
                  <div className="flex flex-col items-center">
                    <div className="alert">
                      <div>
                        <span>Analyzing your code...</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="block loading loading-spinner loading-lg"></span>
                    </div>
                  </div>
                </div>
              </div>
            ) : analysis ? (
              <div>
                <h3 className="text-lg font-semibold mb-2">Static Analysis:</h3>
                <pre className="bg-base-300 p-2 rounded mb-4">
                  {JSON.stringify(analysis.static_analysis, null, 2)}
                </pre>
                <h3 className="text-lg font-semibold mb-2">AI Analysis:</h3>
                  {analysis.ai_analysis && (
                    <div>
                      {(() => {
                        try {
                          const parsedAnalysis = JSON.parse(analysis.ai_analysis);
                          return Object.entries(parsedAnalysis).map(([key, value]) => (
                            <div key={key} className="mb-4">
                              <h4 className="text-md font-semibold">{key}</h4>
                              {typeof value === 'string' ? (
                                <p className="ml-2">{value}</p>
                              ) : (
                                <ul className="ml-2">
                                  {Object.entries(value).map(([subKey, subValue]) => (
                                    <li key={subKey}>
                                      <strong>{subKey}:</strong>{' '}
                                      {Array.isArray(subValue) ? (
                                        <ul>
                                          {subValue.map((item, index) => (
                                            <li key={index}>{item}</li>
                                          ))}
                                        </ul>
                                      ) : (
                                        subValue
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ));
                        } catch (error) {
                          console.error('Error parsing AI analysis:', error);
                          return <p>Error parsing AI analysis results.</p>;
                        }
                      })()}
                    </div>
                  )}
              </div>
            ) : (
              <p>No analysis results yet. Click "Analyze" to start.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeJSCodeEditor;