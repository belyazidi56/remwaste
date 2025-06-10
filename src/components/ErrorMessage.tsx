import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center p-4">
      <div className="bg-utility-danger/10 border border-utility-danger/20 rounded-2xl p-8 max-w-lg w-full text-center">
        <AlertTriangle className="w-12 h-12 text-utility-danger mx-auto mb-4" />
        <h3 className="text-xl font-bold text-neutral-800 mb-2">
          An Error Occurred
        </h3>
        <p className="text-neutral-600 mb-6">
          {message}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 bg-utility-danger text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-utility-danger/90 transition-all duration-200 transform hover:scale-105"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};