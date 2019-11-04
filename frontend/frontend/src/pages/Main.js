import React, { useEffect, useState } from 'react';
import './Main.css'; 
import { Link } from 'react-router-dom';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import api from  '../services/api';


export default function Main({match}) {

  const [ users, setUsers ] = useState([]); 

  useEffect(() => {
      async function loadUsers(){
        const response = await api.get('/devs', {
            headers: {
                user: match.params.id,
            }
        });
        // console.log(response.data);
        setUsers(response.data);
      }
      loadUsers();
  }, [match.params.id]);

  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
        headers: { user: match.params.id},
    });

    setUsers(users.filter(user => user._id != id));
  }

  async function handledisLike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
        headers: { user: match.params.id},
    });

    setUsers(users.filter(user => user._id != id));

  }

  return (
   <div className="main-container">
       <Link to="/">
            <img src={logo} alt="MatchDev" />
       </Link>
           { users.length > 0 ? (
               <ul> 
                   {users.map(user => (
                        <li key={user._id}>
                            <img src={user.avatar} alt="" />
                            <footer>
                                <strong> {user.name} </strong>
                                <p> {user.bio} </p>
                            </footer>
                            <div className="buttons">
                                <button type="button" onClick={() => handleLike(user._id)}>
                                    <img src={like} alt="" />
                                </button>
                                <button type="button" onClick={() => handledisLike(user._id)}>
                                    <img src={dislike} alt="" />
                                </button>
                            </div>
                        </li>
                ))}
               </ul>
           ) : (
               <div className="empty"> Acabou ;( </div>
           )}
   </div>
  );
}
