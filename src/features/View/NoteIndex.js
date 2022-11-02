import React, { useState, useEffect } from 'react';
import { listNotes } from '../../graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from '../../graphql/mutations';
import { API, Storage } from 'aws-amplify';
import { SignOut } from '../Auth/SignOut.js';
import { Link } from 'react-router-dom';

// 初期値はなし
const initialFormState = { name: '', description: '' }

export function NoteIndex(){

    const [notes, setNotes] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
  
    useEffect(() => {
      fetchNotes();
    }, []);
  
    async function deleteNote({ id }) {
      const newNotesArray = notes.filter(note => note.id !== id);
      setNotes(newNotesArray);
      await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
    }
  
    async function onChange(e) {
      if (!e.target.files[0]) return
      const file = e.target.files[0];
      setFormData({ ...formData, image: file.name });
      await Storage.put(file.name, file);
      fetchNotes();
    }
  
    async function fetchNotes() {
      const apiData = await API.graphql({ query: listNotes });
      const notesFromAPI = apiData.data.listNotes.items;
      await Promise.all(notesFromAPI.map(async note => {
        if (note.image) {
          const image = await Storage.get(note.image);
          note.image = image;
        }
        return note;
      }))
      setNotes(apiData.data.listNotes.items);
    }
  
    async function createNote() {
      // nameとdescriptionがnullなら何もしない
      if (!formData.name || !formData.description) return;
      await API.graphql({ query: createNoteMutation, variables: { input: formData } });
      // もしimageが存在するなら実行
      if (formData.image) {
        // imageにformData.imageを代入
        const image = await Storage.get(formData.image);
        formData.image = image;
      }
      setNotes([ ...notes, formData ]);
      setFormData(initialFormState);
    }
    
    return(
      <div className="App">
        <h1>メモ帳</h1>
        <input
          onChange={e => {console.log(e); setFormData({ ...formData, 'name': e.target.value})}}
          placeholder="タイトル"
          value={formData.name}
        />
        <input
          onChange={e => setFormData({ ...formData, 'description': e.target.value})}
          placeholder="内容"
          value={formData.description}
        />
        <button onClick={createNote}>作成</button>
        <input
          type="file"
          onChange={onChange}
        />
        <div style={{marginBottom: 30}}>
          {
            notes.map(note => (
              <div key={note.id || note.name}>
                <Link to={`${note.id}`} state={{description: `${note.description}`, createdAt: `${note.createdAt}`, updatedAt: `${note.updatedAt}`}}>
                  <h2>{note.name}</h2>
                </Link>
                { JSON.stringify(note,null,'\t') }
                <button onClick={() => deleteNote(note)}>削除</button>
                {
                  note.image && <img src={note.image} style={{width: 400}} alt="" />
                }
              </div>
            ))
          }
        </div>
        <SignOut />
      </div>
    );
}

