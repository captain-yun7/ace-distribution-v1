'use client';

import { useState, useRef } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  label,
  placeholder = '내용을 입력하세요...',
}: RichTextEditorProps) {
  const [mode, setMode] = useState<'visual' | 'html'>('visual');
  const editorRef = useRef<HTMLDivElement>(null);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertTable = () => {
    const tableHtml = `
      <table class="w-full text-sm">
        <tbody>
          <tr class="border-b border-gray-100">
            <td class="py-2 pr-4 text-gray-500 font-medium w-24">항목</td>
            <td class="py-2 text-gray-700">내용</td>
          </tr>
        </tbody>
      </table>
    `;
    document.execCommand('insertHTML', false, tableHtml);
    handleInput();
  };

  const insertFeatureSection = () => {
    const featureHtml = `
<div class="mt-6">
  <h4 class="text-lg font-semibold text-amber-800 mb-3 pb-2 border-b-2 border-amber-200">제품특징</h4>
  <table class="w-full text-sm">
    <tbody>
      <tr class="border-b border-gray-100">
        <td class="py-2 pr-4 text-gray-500 font-medium w-24">중량</td>
        <td class="py-2 text-gray-700">내용 입력</td>
      </tr>
      <tr class="border-b border-gray-100">
        <td class="py-2 pr-4 text-gray-500 font-medium w-24">보관방법</td>
        <td class="py-2 text-gray-700">내용 입력</td>
      </tr>
    </tbody>
  </table>
</div>
    `;
    document.execCommand('insertHTML', false, featureHtml);
    handleInput();
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border border-gray-300 border-b-0 rounded-t-lg">
        {/* Text formatting */}
        <button
          type="button"
          onClick={() => execCommand('bold')}
          className="p-2 hover:bg-gray-200 rounded"
          title="굵게"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
            <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
            <path d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => execCommand('italic')}
          className="p-2 hover:bg-gray-200 rounded"
          title="기울임"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <line x1="19" y1="4" x2="10" y2="4" />
            <line x1="14" y1="20" x2="5" y2="20" />
            <line x1="15" y1="4" x2="9" y2="20" />
          </svg>
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Lists */}
        <button
          type="button"
          onClick={() => execCommand('insertUnorderedList')}
          className="p-2 hover:bg-gray-200 rounded"
          title="글머리 기호"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <line x1="9" y1="6" x2="20" y2="6" />
            <line x1="9" y1="12" x2="20" y2="12" />
            <line x1="9" y1="18" x2="20" y2="18" />
            <circle cx="4" cy="6" r="1" fill="currentColor" />
            <circle cx="4" cy="12" r="1" fill="currentColor" />
            <circle cx="4" cy="18" r="1" fill="currentColor" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => execCommand('insertOrderedList')}
          className="p-2 hover:bg-gray-200 rounded"
          title="번호 매기기"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <line x1="10" y1="6" x2="20" y2="6" />
            <line x1="10" y1="12" x2="20" y2="12" />
            <line x1="10" y1="18" x2="20" y2="18" />
            <text x="2" y="8" fontSize="8" fill="currentColor">1</text>
            <text x="2" y="14" fontSize="8" fill="currentColor">2</text>
            <text x="2" y="20" fontSize="8" fill="currentColor">3</text>
          </svg>
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Templates */}
        <button
          type="button"
          onClick={insertTable}
          className="p-2 hover:bg-gray-200 rounded"
          title="표 삽입"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="3" y1="15" x2="21" y2="15" />
            <line x1="9" y1="3" x2="9" y2="21" />
          </svg>
        </button>
        <button
          type="button"
          onClick={insertFeatureSection}
          className="px-3 py-1.5 text-xs bg-amber-100 text-amber-800 hover:bg-amber-200 rounded font-medium"
          title="제품특징 템플릿"
        >
          + 제품특징
        </button>

        <div className="flex-1" />

        {/* Mode toggle */}
        <div className="flex rounded overflow-hidden border border-gray-300">
          <button
            type="button"
            onClick={() => setMode('visual')}
            className={`px-3 py-1 text-xs ${mode === 'visual' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            편집
          </button>
          <button
            type="button"
            onClick={() => setMode('html')}
            className={`px-3 py-1 text-xs ${mode === 'html' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            HTML
          </button>
        </div>
      </div>

      {/* Editor */}
      {mode === 'visual' ? (
        <div
          ref={editorRef}
          contentEditable
          className="min-h-[300px] p-4 border border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white prose prose-sm max-w-none"
          onInput={handleInput}
          dangerouslySetInnerHTML={{ __html: value }}
          data-placeholder={placeholder}
        />
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-h-[300px] p-4 border border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          placeholder={placeholder}
        />
      )}

      <p className="mt-1 text-xs text-gray-500">
        HTML 형식으로 저장됩니다. 제품특징 버튼을 눌러 템플릿을 삽입할 수 있습니다.
      </p>
    </div>
  );
}
