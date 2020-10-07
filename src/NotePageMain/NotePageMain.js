import React, { Component } from 'react'
import Note from '../Note/Note'
import UserContext from '../App/UserContext'
import './NotePageMain.css'
import { findNote } from '../notes-helpers';

export default class NotePageMain extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = UserContext;

  render(){

    const { notes } = this.context;
    const { noteId } = this.props.match.params;

    // console.log(notes, noteId)
    const note = findNote(notes, noteId);
  return (
    <section className='NotePageMain'>
      <Note
        id={note.id}
        name={note.name}
        modified={note.modified}
      />
      <div className='NotePageMain__content'>
        {note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )}
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}
