import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/notes")
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  const addNote = async () => {
    const res = await fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    const newNote = await res.json();
    setNotes([...notes, newNote]);
    setText("");
  };

  return (
    <div>
      <h1>Notes App</h1>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addNote}>Add</button>
      <ul>
        {notes.map(n => <li key={n._id}>{n.text}</li>)}
      </ul>
    </div>
  );
}

export default App;
