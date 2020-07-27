import React, {useState} from 'react'
import './App.css';
import ApplicationView from './Components/Application/ApplicationView'
import {BrowserRouter as Router} from "react-router-dom";


const UserContext = React.createContext(null)

function App() {

  const [user, setUser] = useState(null);

  const userContextState = {
      user,
      login: (user) => setUser(user),
      logout: () => setUser(null),
      loggedIn: () => !!user
  }


  return (
    <UserContext.Provider value={userContextState}>
      <Router>
    <ApplicationView></ApplicationView>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
export {UserContext};
