import { useEffect, useState } from "react";

export default function App() {
  const initialState = JSON.parse(localStorage.getItem("cards")) || [];
  const [showCardsCreator, setShowCardCreator] = useState(true);
  const [cards, setCards] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  function handleCards(newCard) {
    setCards((curCards) => [...curCards, newCard]);
  }

  function deleteCard({ id }) {
    setCards(cards.filter((card) => card.id !== id));
  }

  return (
    <main className="App">
      <Header setShowCardCreator={setShowCardCreator} setCards={setCards} />
      <Flashcards
        showCardsCreator={showCardsCreator}
        setShowCardCreator={setShowCardCreator}
        cards={cards}
        handleCards={handleCards}
        deleteCard={deleteCard}
      />
    </main>
  );
}

function Header({ setShowCardCreator, setCards }) {
  return (
    <header>
      <div className="container">
        <div className="nav">
          <h1>Flashcards</h1>
          <div id="nav-btn">
            <button onClick={() => setShowCardCreator(true)}>New Card</button>
            <button onClick={() => setCards([])}>Del Cards</button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Flashcards({
  cards,
  handleCards,
  showCardsCreator,
  setShowCardCreator,
  deleteCard,
}) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!question && !answer) return;

    const id = crypto.randomUUID();
    const newCard = {
      question,
      answer,
      id,
    };

    handleCards(newCard);
    setQuestion("");
    setAnswer("");
  }

  return (
    <div className="container">
      {showCardsCreator && (
        <form onSubmit={handleSubmit} className="create-box">
          <h2>Create Flashcards</h2>
          <label htmlFor="question">Question</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            id="question"
          ></textarea>
          <label htmlFor="answer">Answer</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            id="answer"
          ></textarea>
          <div>
            <button type="submit">Save</button>
            <button onClick={() => setShowCardCreator(false)}>Close</button>
          </div>
        </form>
      )}
      <div className="flashcards">
        {cards.map((card) => (
          <div onClick={() => setShowAnswer((s) => !s)} className="flashcard">
            <h2 className="front-cards">{card.question}</h2>
            <h2 className={`back-cards ${showAnswer ? "" : "display-none"}`}>
              {card.answer}
            </h2>
            <span className="del-icon" onClick={() => deleteCard(card)}>
              {" "}
              -{" "}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
