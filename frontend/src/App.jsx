import { useState } from "react";

function App() {
  const [DocumentCount,SetDocumentCount]=useState(0)
  function handleAddDocument() {
    SetDocumentCount(DocumentCount+1)
  } 
  
  return (
    <div>
      <h1>Neuroflow-AI</h1>
      <p>Document uploaded : {DocumentCount}</p>
      <button onClick={handleAddDocument}>Add Document </button>
    </div>
  )
}
export default App
