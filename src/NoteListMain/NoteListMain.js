import React, { Component }  from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import UserContext from '../App/UserContext'
import './NoteListMain.css'
import { getNotesForFolder } from '../notes-helpers'

export default class NoteListMain extends Component {


  //      const {folderId} = routeProps.match.params;
  //     const notesForFolder = getNotesForFolder(
  //         notes,
  //         folderId
  //     );
      // return (
      //     <NoteListMain
      //         {...routeProps}
      //         notes={notesForFolder}
      //     />
      // );
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = UserContext;

  render() {
    const { folderId } = this.props.match.params;
    const { notes } = this.context;
    const notesForFolder = getNotesForFolder(notes, folderId);
  return (
    <section className='NoteListMain'>
      <ul>
        {notesForFolder.map(note =>
          <li key={note.id}>
            <Note
              id={note.id}
              name={note.name}
              modified={note.modified}
            />
          </li>
        )}
      </ul>
      <div className='NoteListMain__button-container'>
        <CircleButton
          tag={Link}
          to='/add-note'
          type='button'
          className='NoteListMain__add-note-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          Note
        </CircleButton>
      </div>
    </section>
  )}
}