import React, {useState, useContext} from 'react'
import  {
  CREATE_EVENT,
  DELETE_ALL_EVENT,
  ADD_OPERATION_LOG,
  DELETE_ALL_OPERATION_LOGS
} from '../actions'

import AppContext from '../contexts/AppContext'
import {timeCurrentIso8601} from '../utils'

//add
//import operationLogs from '../reducers/operationLogs'

const EventForm = () => {
    const {state, dispatch} = useContext(AppContext)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const addEvent = e => {
      e.preventDefault()
      
      dispatch({
        type:CREATE_EVENT,
        title,
        body
      })
      
      dispatch({
        type:ADD_OPERATION_LOG,
        description:'イベントを作成しました。',
        operatedAt:timeCurrentIso8601()
      })
      
      setTitle('')
      setBody('')
    }
      
    console.log({state})
    const deleteAllEvents = e => {
      e.preventDefault()
      const result = window.confirm('全てのイベントを本当に削除しても良いですか')
      if (result) {
        dispatch({type:DELETE_ALL_EVENT})
        
        dispatch({
          type:ADD_OPERATION_LOG,
          description:'全てのイベントを削除しました。',
          operatedAt:timeCurrentIso8601()
        })
      }
    }
    
    const unCreatable = title === '' || body === ''
    const deleteAllOperationLogs = e => {
      e.preventDefault()
      const result = window.confirm('全ての操作ログを削除しても宜しいでしょうか')
      if (result){
        dispatch({
          type:DELETE_ALL_OPERATION_LOGS
        })
      }
    }
    
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
                <button className="btn btn-danger" onClick={deleteAllEvents} disabled={state.events.length === 0}>全てのイベントを削除する</button>
                <button className="btn btn-danger" onClick={deleteAllOperationLogs} disabled={state.operationLogs.length === 0}  >全ての操作ログを削除する</button>
            </form>
        </div>
        </>
        )
}

export default EventForm
