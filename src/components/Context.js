import React from 'react';
import { useCookies } from "react-cookie";
export const ListContext = React.createContext();

function Protect(props) {

    const [cookies, setCookie, removeCookie] = useCookies(["userCookie"]);
    return (
        <ListContext.Provider value={{
            cookies,
            setCookie,
            removeCookie,
        }}>
        {props.children}
     </ListContext.Provider>
);
}

export default Protect;

