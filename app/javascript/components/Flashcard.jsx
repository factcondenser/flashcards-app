import React from 'react';
import { Card, CardBody, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'

function Flashcard(props) {
  const { id, fieldName, fieldValue, isForm, onFieldChangeHandler, onCancelHandler, onSubmitHandler, onEditHandler, onDestroyHandler, onFlipHandler } = props;
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

  return (
    <React.Fragment>
      <Card className='flashcard'>
        <CardBody className='flashcard__body'>
          <div className='flashcard__text'>{field}&nbsp;{editButton}</div>
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
