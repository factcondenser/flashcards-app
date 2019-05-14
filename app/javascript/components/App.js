import React from 'react'
import uuidv1 from  'uuid/v1';
import { Alert } from 'reactstrap';
import Flashcard from './Flashcard'

class App extends React.Component {
  constructor(props) {
    super(props);
    const flashcards = {};
    this.props.flashcards.forEach((card) => {
      flashcards[card.id] = card;
    });
    this.state = {
      flashcards: flashcards,
      danger: '',
      success: '',
    }
  }

  appendFlashcardForm = () => {
    const id = uuidv1();
    const newFlashcard = { id: id, term: '', definition: '', isForm: true, onSubmitHandler: this.createFlashcard }
    this.setState(prevState => {
      const newFlashcards = prevState.flashcards;
      newFlashcards[id] = newFlashcard;

      return {
        flashcards: newFlashcards
      }
    });
  }

  createFlashcard = async (id, e) => {
    const { term, definition } = this.state.flashcards[id];
    try {
      const response = await fetch(`${process.env.FLASHCARDS_APP_URL}/flashcards`, {
        method: "POST",
        mode: "cors",
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: "follow",
        referrer: 'no-referrer',
        body: JSON.stringify({
          flashcard: {
            term: term,
            definition: definition
          }
        })
      });
      const data = await response.json();
      const flashcard = data.data.attributes;

      this.setState(prevState => {
        const newFlashcards = prevState.flashcards;
        newFlashcards[flashcard.id] = flashcard;
        delete newFlashcards[id];

        return {
          flashcards: newFlashcards
        }
      });
    } catch(error) {
      console.error(error);
    }
  }

  onEditHandler = (id, e) => {
    this.setState(prevState => {
      const newFlashcards = prevState.flashcards;
      newFlashcards[id].isForm = true;
      newFlashcards[id].onSubmitHandler = this.updateFlashcard;

      return {
        flashcards: newFlashcards
      }
    });
  }

  updateFlashcard = async (id, e) => {
    const { term, definition } = this.state.flashcards[id];
    try {
      const response = await fetch(`${process.env.FLASHCARDS_APP_URL}/flashcards/${id}`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: "follow",
        referrer: 'no-referrer',
        body: JSON.stringify({
          flashcard: {
            id: id,
            term: term,
            definition: definition
          }
        })
      });
      const data = await response.json();

      if (response.ok) {
        this.setState(prevState => {
          const newFlashcards = prevState.flashcards;
          newFlashcards[id].isForm = false;
          delete newFlashcards[id].onSubmitHandler;

          return {
            flashcards: newFlashcards
          }
        });
      } else {
        this.setState({ danger: data.message });
      }
    } catch(error) {
      console.error(error);
    }
  }

  destroyFlashcard = async (id, e) => {
    try {
      const response = await fetch(`${process.env.FLASHCARDS_APP_URL}/flashcards/${id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: "follow",
        referrer: 'no-referrer',
      });
      if (response.ok) {
        this.setState(prevState => {
          const newFlashcards = prevState.flashcards;
          delete newFlashcards[id];

          return {
            flashcards: newFlashcards
          }
        });
      }
    } catch(error) {
      console.error(error);
    }
  }

  onTermChangeHandler = (id, e) => {
    const term = e.target.value;
    this.setState(prevState => {
      const newFlashcards = prevState.flashcards;
      newFlashcards[id].term = term;

      return {
        flashcards: newFlashcards
      }
    });
  }

  onDefinitionChangeHandler = (id, e) => {
    const definition = e.target.value;
    this.setState(prevState => {
      const newFlashcards = prevState.flashcards;
      newFlashcards[id].definition = definition;

      return {
        flashcards: newFlashcards
      }
    });
  }

  onDismissSuccess = () => {
    this.setState({ success: '' });
  }

  onDismissDanger = () => {
    this.setState({ danger: '' });
  }

  sendPushNotification = async () => {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    fetch('/push', {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: "follow",
      referrer: 'no-referrer',
      body: JSON.stringify({
        subscription: subscription.toJSON(),
        message: 'Time to study!'
      })
    });
  }

  render() {
    const { flashcards, danger, success } = this.state;
    const flashcardListing = Object.keys(flashcards).map((id) => {
      const card = flashcards[id];
      return (
        <Flashcard
          key={card.id}
          id={card.id}
          term={card.term}
          definition={card.definition}
          isForm={card.isForm}
          onTermChangeHandler={this.onTermChangeHandler}
          onDefinitionChangeHandler={this.onDefinitionChangeHandler}
          onSubmitHandler={card.onSubmitHandler}
          onEditHandler={this.onEditHandler}
          onDestroyHandler={this.destroyFlashcard}
        />
      );
    });

    return (
      <div>
        <Alert color='danger' isOpen={danger !== ''} toggle={this.onDismissDanger}>{danger}</Alert>
        <Alert color='success' isOpen={success !== ''} toggle={this.onDismissSuccess}>{success}</Alert>
        {flashcardListing}
        <br/>
        <button onClick={this.appendFlashcardForm}>New Flashcard</button>
        <button onClick={this.sendPushNotification} id="webpush-button">Send Push Notification</button>
      </div>
    )
  }
}

export default App
