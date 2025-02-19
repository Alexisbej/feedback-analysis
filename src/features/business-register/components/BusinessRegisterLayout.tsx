import React from "react";

export const BusinessRegisterLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100">
      {children}
    </div>
  );
};
