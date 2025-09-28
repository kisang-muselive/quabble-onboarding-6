import React from 'react';
import { Question } from '../services/questionsService';

export interface DynamicOption {
  key: string;
  systemName: string;
  displayText: string;
}

/**
 * Converts dynamic question options to a standardized format
 */
export const convertQuestionOptions = (
  questionData: Question | undefined,
  fallbackOptions: Array<{ key: string; systemName: string }>,
  translateFn?: (key: string) => string
): DynamicOption[] => {
  if (questionData) {
    return questionData.options.map(option => ({
      key: option.text,
      systemName: option.text.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, ''),
      displayText: option.text
    }));
  }
  
  return fallbackOptions.map(option => ({
    key: option.key,
    systemName: option.systemName,
    displayText: translateFn ? translateFn(option.key) : option.key
  }));
};

/**
 * Gets the display title for a question
 */
export const getQuestionTitle = (
  questionData: Question | undefined,
  fallbackKey: string,
  translateFn: (key: string) => string
): string => {
  return questionData ? questionData.text : translateFn(fallbackKey);
};

/**
 * Renders text with line breaks
 */
export const renderTextWithLineBreaks = (text: string, keyPrefix = 'line'): React.ReactElement[] => {
  return text.split('\n').map((line, index) => (
    React.createElement('span', { key: `${keyPrefix}-${index}` }, [
      line,
      index < text.split('\n').length - 1 && React.createElement('br')
    ])
  ));
};