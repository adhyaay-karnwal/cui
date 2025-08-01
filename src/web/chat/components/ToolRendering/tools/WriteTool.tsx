import React from 'react';
import { detectLanguageFromPath } from '../../../utils/language-detection';
import { DiffViewer } from './DiffViewer';
import styles from '../ToolRendering.module.css';

interface WriteToolProps {
  input: any;
  result: string;
  workingDirectory?: string;
}

export function WriteTool({ input, result, workingDirectory }: WriteToolProps) {
  const filePath = input?.file_path || '';
  const content = input?.content || '';
  const language = detectLanguageFromPath(filePath);

  return (
    <div className={styles.toolContent}>
      <DiffViewer
        oldValue=""
        newValue={content}
        language={language}
      />
    </div>
  );
}