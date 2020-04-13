import React, {useState} from 'react'
import  {
  CREATE_EVENT,
  DELETE_ALL_EVENT
} from '../actions'

const EventForm = ({state, dispatch}) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
      const addEvent = e => {
        e.preventDefault()
        console.log({title, body})
        dispatch({
          type:CREATE_EVENT,
          title,
          body
        })
        setTitle('')
        setBody('')
      }
      
      console.log({state})
      const deleteAllEvents = e => {
        e.preventDefault()
        const result = window.confirm('全てのイベントを本当に削除しても良いですか')
        if (result) dispatch({type:DELETE_ALL_EVENT})
      }
      
      const unCreatable = title === '' || body === ''
    return(
        <>
        <div className="container-fluid">
            <h4>イベン作成フォーム</h4>
            <form>
                <div className="form-group">
                  <label htmlFor="formEventTitle">Title</label> 
                  <input className="form-control" id="formEventTitle" value={title} onChange={e => setTitle(e.target.value)}/>
                </div>
                <div className="form-group">
                  <label htmlFor="formEventBody">Body</label> 
                  <textarea className="form-control" id="formEventBody" value={body} onChange={e => setBody(e.target.value)}/>
                </div>
                <button className="btn btn-primary" onClick={addEvent} disabled={unCreatable}>イベントを作成する</button>
                <button className="btn btn-danger" onClick={deleteAllEvents} disabled={state.length === 0}>全てのイベントを削除する</button>
            </form>
        </div>
        </>
        )
}

export default EventForm
