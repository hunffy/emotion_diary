import React, { useReducer, useRef } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Diary from "./pages/Diary";
import dummyDate from "./dummy/dummyDate.js";

//state : 원래 기본 값 action: dispatch를 통해 보낸 type이나 data값

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((e) => e.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((e) =>
        e.id === action.data.id ? { ...action.data } : e
      );
      break;
    }
    default: {
      return state;
    }
  }
  return newState;
};

function App() {
  const [data, dispatch] = useReducer(reducer, dummyDate);
  const dataID = useRef(6);

  //CREATE , EDIT , REMOVE

  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataID.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataID.current += 1;
  };

  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/new" element={<New />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
