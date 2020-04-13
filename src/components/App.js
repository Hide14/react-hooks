import React, { useState, useReducer }from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

import Event from './Event'
import reducer from '../reducers'

const App = () => {
  const [state, dispatch] = useReducer(reducer, [])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  
  const addEvent = e => {
    e.preventDefault()
    console.log({title, body})
    dispatch({
      type:'CREATE_EVENT',
      title,
      body
    })
    setTitle('')
    setBody('')
  }
  
  console.log({state})
  
  return (
    <div className="container-fluid">
      <h4>イベント作成フォーム</h4>
      <form>
        <div className="form-group">
          <label htmlFor="formEventTitle">Title</label> 
          <input className="form-control" id="formEventTitle" value={title} onChange={e => setTitle(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="formEventBody">Body</label> 
          <textarea className="form-control" id="formEventBody" value={body} onChange={e => setBody(e.target.value)}/>
        </div>
        <button className="btn btn-primary" onClick={addEvent}>イベントを作成する</button>
        <button className="btn btn-danger">全てのイベントを削除する</button>
      </form>
      <h4>
        <table className="table table-hober">
          <thead>
            <tr> 
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {state.map((event, index) => (<Event key={index} event={event} dispatch={dispatch}/>))}
          
          </tbody>
        </table>
      </h4>
    </div>
  );
}

export default App;
