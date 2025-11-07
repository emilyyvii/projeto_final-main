import React, { createContext, useContext, useState } from "react";
 
const HealthContext = createContext();
 
export function HealthProvider({ children }) {
  const [healthIssues, setHealthIssues] = useState([]);
 
  const addIssue = (text) => {
    if (!text.trim()) return;
    const newIssue = { id: Date.now().toString(), text };
    setHealthIssues((prev) => [...prev, newIssue]);
  };
 
  const editIssue = (id, newText) => {
    setHealthIssues((prev) =>
      prev.map((issue) => (issue.id === id ? { ...issue, text: newText } : issue))
    );
  };
 
  const deleteIssue = (id) => {
    setHealthIssues((prev) => prev.filter((issue) => issue.id !== id));
  };
 
  return (
    <HealthContext.Provider
      value={{ healthIssues, addIssue, editIssue, deleteIssue }}
    >
      {children}
    </HealthContext.Provider>
  );
}
 
export function useHealth() {
  return useContext(HealthContext);
}