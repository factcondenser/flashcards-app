import React from 'react'
import uuidv1 from  'uuid/v1';
import { Alert, Button } from 'reactstrap';
import ReactCardFlip from 'react-card-flip';
import Flashcard from './Flashcard';
import NavBar from './NavBar';

class App extends React.Component {
  constructor(props) {
    super(props);
    const flashcards = {};
    this.props.flashcards.forEach((card) => {
      card.isFlipped = false;
      flashcards[card.id] = card;
    });
    this.state = {
      flashcards: flashcards,
      pushToggled: this.props.userInfo.send_notifications
    }
  }

  onNewHandler = () => {
    const id = uuidv1();
    const newFlashcard = { id: id, tmpTerm: '', tmpDefinition: '', isForm: true, onSubmitHandler: this.createFlashcard, onCancelHandler: this.onCancelNewHandler }
    this.setState(prevState => {
      const newFlashcards = {...prevState.flashcards};
      newFlashcards[id] = newFlashcard;

      return {
        flashcards: newFlashcards
      }
    });
  }

  onCancelNewHandler = (id, e) => {
    this.setState(prevState => {
      const newFlashcards = {...prevState.flashcards};
      delete newFlashcards[id];

      return {
        flashcards: newFlashcards
      }
    });
  }

  createFlashcard = async (id, e) => {
    const { tmpTerm, tmpDefinition } = this.state.flashcards[id];
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
            term: tmpTerm,
            definition: tmpDefinition
          }
        })
      });
      const data = await response.json();

      if (response.ok) {
        const flashcard = data.data.attributes;

        this.setState(prevState => {
          const newFlashcards = {...prevState.flashcards};
          newFlashcards[flashcard.id] = flashcard;
          delete newFlashcards[id];

          return {
            flashcards: newFlashcards
          }
        });
      } else {
        this.setState(prevState => {
          const newFlashcards = {...prevState.flashcards};
          const newFlashcard = {
            ...newFlashcards[id],
            errors: data.errors
          }
          newFlashcards[id] = newFlashcard;

          return {
            flashcards: newFlashcards
          }
        });
      }
    } catch(error) {
      console.error(error);
    }
  }

  onEditHandler = (id, e) => {
    this.setState(prevState => {
      const newFlashcards = {...prevState.flashcards};
      const newFlashcard = {
        ...newFlashcards[id],
        isForm: true,
        tmpTerm: newFlashcards[id].term,
        tmpDefinition: newFlashcards[id].definition,
        onSubmitHandler: this.updateFlashcard,
        onCancelHandler: this.onCancelEditHandler,
      }
      newFlashcards[id] = newFlashcard;

      return {
        flashcards: newFlashcards
      }
    });
  }

  onCancelEditHandler = (id, e) => {
    this.setState(prevState => {
      const newFlashcards = {...prevState.flashcards};
      const newFlashcard = {
        ...newFlashcards[id],
        isForm: false
      }
      delete newFlashcard.tmpTerm;
      delete newFlashcard.tmpDefinition;
      delete newFlashcard.onSubmitHandler;
      delete newFlashcard.onCancelHandler;
      delete newFlashcard.errors;
      newFlashcards[id] = newFlashcard;

      return {
        flashcards: newFlashcards
      }
    });
  }

  updateFlashcard = async (id, e) => {
    const { tmpTerm, tmpDefinition } = this.state.flashcards[id];
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
            term: tmpTerm,
            definition: tmpDefinition
          }
        })
      });
      const data = await response.json();

      if (response.ok) {
        this.setState(prevState => {
          const newFlashcards = {...prevState.flashcards};
          const newFlashcard = {
            ...newFlashcards[id],
            isForm: false,
            term: tmpTerm,
            definition: tmpDefinition
          };
          delete newFlashcard.tmpTerm;
          delete newFlashcard.tmpDefinition;
          delete newFlashcard.onSubmitHandler;
          delete newFlashcard.onCancelHandler;
          delete newFlashcard.errors;
          newFlashcards[id] = newFlashcard;

          return {
            flashcards: newFlashcards
          }
        });
      } else {
        this.setState(prevState => {
          const newFlashcards = {...prevState.flashcards};
          const newFlashcard = {
            ...newFlashcards[id],
            errors: data.errors
          }
          newFlashcards[id] = newFlashcard;

          return {
            flashcards: newFlashcards
          }
        });
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
          const newFlashcards = {...prevState.flashcards};
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

  onFlipHandler = (id, e) => {
    this.setState(prevState => {
      const newFlashcards = {...prevState.flashcards};
      const newFlashcard = {
        ...newFlashcards[id],
        isFlipped: !prevState.flashcards[id].isFlipped
      }
      newFlashcards[id] = newFlashcard;

      return {
        flashcards: newFlashcards
      }
    });
  }

  onTermChangeHandler = (id, e) => {
    const term = e.target.value;
    this.setState(prevState => {
      const newFlashcards = {...prevState.flashcards}
      const newFlashcard = {
        ...newFlashcards[id],
        tmpTerm: term
      }
      newFlashcards[id] = newFlashcard;

      return {
        flashcards: newFlashcards
      }
    });
  }

  onDefinitionChangeHandler = (id, e) => {
    const definition = e.target.value;
    this.setState(prevState => {
      const newFlashcards = prevState.flashcards;
      const newFlashcard = {
        ...newFlashcards[id],
        tmpDefinition: definition
      }
      newFlashcards[id] = newFlashcard;

      return {
        flashcards: newFlashcards
      }
    });
  }

  sendPushNotifications = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      const response = await fetch('/push', {
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
      if (response.ok) {
        this.setState({ pushToggled: true});
      }
    } catch(error) {
      console.error(error);
    }
  }

  stopPushNotifications = async () => {
    try {
      const response = await fetch('/push', {
        method: "DELETE",
        mode: "cors",
        redirect: "follow",
        referrer: 'no-referrer'
      });
      if (response.ok) {
        this.setState({ pushToggled: false });
      }
    } catch(error) {
      console.error(error);
    }
  }

  render() {
    const { flashcards, pushToggled } = this.state;
    const flashcardListing = Object.keys(flashcards).map((id) => {
      const card = flashcards[id];
      return (
        <React.Fragment key={card.id}>
          <ReactCardFlip className='card' isFlipped={card.isFlipped} flipDirection="vertical">
            <Flashcard
              key='front'
              card={card}
              fieldName='term'
              onFieldChangeHandler={this.onTermChangeHandler}
              onEditHandler={this.onEditHandler}
              onDestroyHandler={this.destroyFlashcard}
              onFlipHandler={this.onFlipHandler}
            />
            <Flashcard
              key='back'
              card={card}
              fieldName='definition'
              onFieldChangeHandler={this.onDefinitionChangeHandler}
              onEditHandler={this.onEditHandler}
              onDestroyHandler={this.destroyFlashcard}
              onFlipHandler={this.onFlipHandler}
            />
          </ReactCardFlip>
        </React.Fragment>
      );
    });
    const onPushToggledHandler = pushToggled ? this.stopPushNotifications : this.sendPushNotifications;

    return (
      <div className='containerCustom'>
        <NavBar userEmail={this.props.userInfo.email} onPushToggledHandler={onPushToggledHandler} pushToggled={pushToggled}/>
        <div className='flashcards'>
          {flashcardListing}
          <Button className='flashcards__new-button' onClick={this.onNewHandler}>new flashcard</Button>
        </div>
      </div>
    )
  }
}

export default App
