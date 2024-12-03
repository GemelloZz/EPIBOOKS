import { useState, useEffect } from "react";
import Loading from "./Loading"; // Supponiamo che sia un componente separato
import Error from "./Error"; // Supponiamo che sia un componente separato
import AddComment from "./AddComment"; // Supponiamo che sia un componente separato
import CommentList from "./CommentList"; // Supponiamo che sia un componente separato

const CommentArea = (props) => {
  const [comments, setComments] = useState([]); // Stato per i commenti
  const [isLoading, setIsLoading] = useState(true); // Stato per il caricamento
  const [isError, setIsError] = useState(false); // Stato per l'errore

  // useEffect per simulare componentDidMount e componentDidUpdate
  useEffect(() => {
    // Resettiamo lo stato quando asin cambia
    setIsLoading(true);
    setIsError(false);

    const fetchComments = async () => {
      try {
        let response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + props.asin, {
          headers: {
            Authorization: "Bearer inserisci-qui-il-tuo-token",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setComments(data); // Aggiorniamo lo stato con i commenti
          setIsLoading(false); // Impostiamo il caricamento a false
        } else {
          setIsError(true); // Impostiamo lo stato dell'errore se la risposta non è ok
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsError(true); // Impostiamo lo stato dell'errore in caso di problema
        setIsLoading(false);
      }
    };

    fetchComments(); // Chiamiamo la funzione per recuperare i commenti
  }, [props.asin]); // L'array di dipendenze fa sì che la fetch venga eseguita ogni volta che asin cambia

  return (
    <div className="text-center">
      {isLoading && <Loading />} {/* Mostra il componente di caricamento se i dati sono in fase di recupero */}
      {isError && <Error />} {/* Mostra il componente di errore se c'è stato un errore */}
      <AddComment asin={props.asin} /> {/* Rendi il componente per aggiungere commenti */}
      <CommentList commentsToShow={comments} /> {/* Rendi la lista dei commenti */}
    </div>
  );
};

export default CommentArea;
