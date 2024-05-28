import React from 'react';

interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};

interface InputProps {
  placeholder: string;
  label: string;
  name: string;
  type: string;
}

export const Input: React.FC<InputProps> = ({ placeholder, label, name, type }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} placeholder={placeholder} />
    </div>
  );
};

interface SubmitButtonProps {
  buttonText: string;
  isLoading: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ buttonText, isLoading }) => {
  return <button type="submit" disabled={isLoading}>{buttonText}</button>;
};