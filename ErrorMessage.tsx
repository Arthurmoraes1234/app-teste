
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="my-6 p-4 bg-red-900 bg-opacity-50 border border-red-700 text-red-200 rounded-lg shadow-md" role="alert">
      <strong className="font-bold">Oops! Algo deu errado:</strong>
      <p className="mt-1 text-sm">{message}</p>
    </div>
  );
};
