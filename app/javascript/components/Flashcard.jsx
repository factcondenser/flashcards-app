import React from 'react';
import { Card, CardBody, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'

function Flashcard(props) {
  const { card, fieldName, onFieldChangeHandler, onEditHandler, onDestroyHandler, onFlipHandler } = props;
  const { id, errors, isForm, onCancelHandler, onSubmitHandler } = card;
  const fieldValue = isForm ? card[`tmp${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)}`] : card[fieldName];

  let field, destroyButton, editButton;
  if (isForm) {
    const cancelButton = <a className='flashcard__cancel-button' onClick={(e) => onCancelHandler(id, e)}>cancel</a>
    const submitButton = <a className='flashcard__save-button' onClick={(e) => onSubmitHandler(id, e)}>save</a>
    field = <React.Fragment>
              <Input onChange={(e) => onFieldChangeHandler(id, e)} type={`${fieldName === 'term' ? 'text' : 'textarea'}`} name={fieldName} value={fieldValue} placeholder={`${fieldName} goes here`}/>
              {cancelButton}{submitButton}
            </React.Fragment>
  } else {
    editButton = <a className='flashcard__edit-button' onClick={(e) => onEditHandler(id, e)} title='Edit'><FontAwesomeIcon icon={faEdit}/></a>;
    destroyButton = <a className='flashcard__destroy-button' onClick={(e) => onDestroyHandler(id, e)} title='Delete'><FontAwesomeIcon icon={faTimes}/></a>;
    field = fieldName === 'term' ? <b>{fieldValue}</b> : <i>{fieldValue}</i>;
  }
  const flipButton = <a className='flashcard__flip-button' onClick={(e) => onFlipHandler(id, e) }>flip</a>

  let errorString = '';
  for (let key in errors) {
    if (errors.hasOwnProperty(key)) {
      errorString += `${key} ${errors[key]}. `
    }
  }
  const errorField = <span className='flashcard__errors'>{errorString}</span>
  return (
    <React.Fragment>
      <Card className='flashcard'>
        <CardBody className='flashcard__body'>
          {errorField}
          <div className={`flashcard__text${errors && errors[fieldName] ? '--has-error' : ''}`}>{field}&nbsp;{editButton}</div>
          {destroyButton}
          {flipButton}
        </CardBody>
      </Card>
    </React.Fragment>
  );
}

Flashcard.defaultProps = {
  isForm: false
}

export default Flashcard
