import { useState } from "react";
import { Card } from "react-bootstrap";
import CommentArea from "./CommentArea";

const SingleBook = (props) => {
  const [selected, setSelected] = useState(false); // Stato per la selezione del libro

  // Funzione per gestire il click sulla card
  const handleCardClick = () => {
    setSelected(!selected); // Cambia lo stato di selezione
    props.changeSelectedBook(props.book.asin); // Notifica al componente padre che il libro è selezionato
  };

  return (
    <>
      <Card
        onClick={handleCardClick} // Gestisce il click
        style={{
          border: props.selectedBook === props.book.asin ? "3px solid red" : "none", // Cambia il bordo se selezionato
        }}
      >
        <Card.Img variant="top" src={props.book.img} />
        <Card.Body>
          <Card.Title style={{ color: "black" }}>
            {props.book.title} {/* Mostra il titolo del libro */}
          </Card.Title>
        </Card.Body>
      </Card>

      {/* Mostra CommentArea se il libro è selezionato */}
      {selected && <CommentArea asin={props.book.asin} />}
    </>
  );
};

export default SingleBook;
