import React, { useReducer } from "react";

export const ListContext = React.createContext();

const initialState = {
  loggedIn: false,
  userData: {},
  token: "",
  canDoStatus: false,
};

const actions = {
  login: "login",
  logout: "logout",
  canDo: "canDo",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.login: {
      return {
        ...state,
        loggedIn: true,
        token: action.payload.data.token,
        userData: {
          userInfo: action.payload.data.user,
          userPermission: action.payload.data.user.capabilities,
        },
      };
    }
    case actions.logout: {
      return {
        ...state,
        loggedIn: false,
        token: "",
        userData: {},
      };
    }
    case actions.canDo: {
      console.log("actio!!!!!!!!", action);
      const canDoActions = {
        getPosts: "read",
        addPost: "create",
        getComments: "read",
        addComment: "read",
        deletePost: "delete",
        updatePost: "update",
      };
      if (
        state.userData?.userPermission?.includes(canDoActions[action.payload])
      )
        return { ...state, canDoStatus: true };
      return { ...state, canDoStatus: false };
    }
    default:
      return state;
  }
};

function Protect({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = {
    loggedIn: state.loggedIn,
    userData: state.userData,
    token: state.token,
    canDoStatus: state.canDoStatus,
    login: (payload) => {
      dispatch({ type: actions.login, payload });
    },

    logout: (payload) => {
      dispatch({ type: actions.logout, payload });
    },

    canDo: (payload) => {
      dispatch({ type: actions.canDo, payload });
    },
  };
  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
}

export default Protect;
