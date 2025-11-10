import React from "react";

export function Card({ className = "", children }) {
  return (
    <div className={`bg-white rounded-xl shadow border ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ className = "", children }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export function CardFooter({ className = "", children }) {
  return <div className={`p-4 border-t ${className}`}>{children}</div>;
}
