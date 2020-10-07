import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import UserContext from './UserContext';
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        // data loading from API call
        const url = "http://localhost:9090";

        Promise.all([
            fetch(`${url}/notes`),
            fetch(`${url}/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                console.log([notes, folders])
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
    }

    renderNavRoutes() {
        // const {notes, folders} = this.state;
        // const contextValue = {
        //     folders: folders,
        //     notes: notes
        // }
        return (
            <>
                {/* <UserContext.Provider value={contextValue}> */}
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                        // render={routeProps => (
                        //     <NoteListNav
                        //         {...routeProps}
                        //     />
                        // )}
                    />
                ))}
                {/* </UserContext.Provider> */}
                <Route
                    path="/note/:noteId"
                    component={NotePageNav}
                    // render={routeProps => {
                    //     const {noteId} = routeProps.match.params;
                    //     const note = findNote(notes, noteId) || {};
                    //     const folder = findFolder(folders, note.folderId);
                    //     return <NotePageNav {...routeProps} folder={folder} />;
                    // }}
                />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        // const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                        // render={routeProps => {
                        //     const {folderId} = routeProps.match.params;
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
                        // }}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    component={NotePageMain}
                    // render={routeProps => {
                    //     const {noteId} = routeProps.match.params;
                    //     const note = findNote(notes, noteId);
                    //     return <NotePageMain {...routeProps} note={note} />;
                    // }}
                />
            </>
        );
    }

    render() {
        const {notes, folders} = this.state;
        const contextValue = {
            folders: folders,
            notes: notes
        }
        return (
            <UserContext.Provider value={contextValue}>
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
            </UserContext.Provider>
        );
    }
}

export default App;
