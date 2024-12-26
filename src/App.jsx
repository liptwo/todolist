import CreateNote from "./components/CreateNote.jsx";
import Header from "./components/Header.jsx";
import ListNotes from "./components/ListNotes";

export default function App() {
  return (
    <>
      <Header />
      <CreateNote />
      <ListNotes />
    </>
  );
}
