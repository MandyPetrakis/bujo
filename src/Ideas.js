import React from "react";
import { useNotes } from "./Context";
import NoteItem from "./NoteItem";

function Ideas() {
  const [notes, setNotes] = useNotes();
  const [showDetails, setShowDetails] = React.useState(true);
  const [details, setDetails] = React.useState();

  function onShowDetails(note) {
    console.log("clicked");
    setDetails(note.additionalNotes);
    setShowDetails(!showDetails);
  }

  const ideaList = notes.filter((note) => note.type == "idea");
  const renderList = ideaList.map((idea) => (
    <NoteItem key={idea.id} note={idea} onIdeaClick={onShowDetails} />
  ));
  return (
    <div className="cardContainer">
      <h1 className="center">Thoughts</h1>
      <div className="allIdeas">
        <div className="ideaContainer">{renderList}</div>
        {showDetails ? <div className="ideaDetails">{details}</div> : null}
      </div>
    </div>
  );
}

export default Ideas;
