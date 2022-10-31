import React, { useState, useEffect } from 'react';
import './App.css';
import {
  AmplifyAuthenticator
  , AmplifySignIn
  , AmplifySignUp
  , AmplifyForgotPassword
  , AmplifyConfirmSignUp
  , AmplifyRequireNewPassword
  , AmplifySignOut
} from '@aws-amplify/ui-react-v1';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';
import { dictionary } from './dictionary.js';
import { API, Storage, I18n } from 'aws-amplify';

const initialFormState = { name: '', description: '' }

function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  I18n.putVocabularies(dictionary);
  I18n.setLanguage("ja");

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
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createNoteMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }
  
  return (
    <AmplifyAuthenticator>
      <AmplifySignIn
        slot="sign-in"
        headerText="サインイン画面"
        submitButtonText="サインイン"
        formFields={[
          {
            type: "username",
            label: "サインインID *",
            placeholder: "ユーザ名を入力",
            required: true,
          },
          {
            type: "password",
            label: "パスワード *",
            placeholder: "パスワードを入力",
            required: true,
          },
        ]}
      />
      <AmplifyForgotPassword
        slot="forgot-password"
        headerText="パスワードを忘れた"
        usernameAlias="email"
        formFields={[
          {
            type: "username",
            label: "ユーザ名を入力してください",
            placeholder: "ユーザ名",
          },
        ]}
        sendButtonText="送信"
        submitButtonText="送信"
      />
      <AmplifySignUp
        slot="sign-up"
        headerText="サインアップ"
        haveAccountText=""
        signInText="サインインに戻る"
        submitButtonText="アカウント作成"

        formFields={[
          {
            type: "username",
            label: "ユーザ名を入力してください",
            placeholder: "ユーザ名",
          },
          {
            type: "email",
            label: "メールアドレスを入力してください",
            placeholder: "メールアドレス",
          },
          {
            type: "password",
            label: "パスワードを入力してください",
            placeholder: "パスワード",
            inputProps: { required: true, autocomplete: "new-password" },
          },
        ]}
      />
      <AmplifyRequireNewPassword
        headerText="新しいパスワードを入力"
        submitButtonText="送信"
        slot="require-new-password"
      />
      <AmplifyConfirmSignUp headerText="確認コードを入力してください" submitButtonText="送信" slot="confirm-sign-up" />
      <div className="App">
        <h1>メモ帳</h1>
        <input
          onChange={e => setFormData({ ...formData, 'name': e.target.value})}
          placeholder="Note name"
          value={formData.name}
        />
        <input
          onChange={e => setFormData({ ...formData, 'description': e.target.value})}
          placeholder="Note description"
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
                <h2>{note.name}</h2>
                <p>{note.description}</p>
                <button onClick={() => deleteNote(note)}>削除</button>
                {
                  note.image && <img src={note.image} style={{width: 400}} alt="" />
                }
              </div>
            ))
          }
        </div>
        <AmplifySignOut
          slot="sign-out"
          buttonText="サインアウト"
        />
      </div>
    </AmplifyAuthenticator>
  );
}

export default App;
