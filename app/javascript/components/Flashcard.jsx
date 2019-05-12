import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Button, Input } from 'reactstrap';

function Flashcard(props) {
  const { id, term, definition, isForm, onTermChangeHandler, onDefinitionChangeHandler, onSubmitHandler, onEditHandler, onDestroyHandler} = props;
  const termField = isForm ?
    <Input onChange={(e) => onTermChangeHandler(id, e)} type="text" name="term" id="term-field" value={term} placeholder="Term goes here"/>
    :
    term;
  const definitionField = isForm ?
    <Input onChange={(e) => onDefinitionChangeHandler(id, e)} type="textarea" name="definition" id="definition-field" value={definition} placeholder="Definition goes here"/>
    :
    definition;
  const submitButton = isForm ? <Button onClick={(e) => onSubmitHandler(id, e)} color="primary">Save</Button> : null;
  const editButton = isForm ? null : <Button onClick={(e) => onEditHandler(id, e)}>Edit</Button>;
  const destroyButton = isForm ? null : <Button onClick={(e) => onDestroyHandler(id, e)} color="danger">Delete</Button>;

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle>{termField}</CardTitle>
          <CardSubtitle>{definitionField}</CardSubtitle>
          {submitButton}
          {editButton}
          {destroyButton}
        </CardBody>
      </Card>
    </React.Fragment>
  );
}

Flashcard.defaultProps = {
  isForm: false
}

export default Flashcard
