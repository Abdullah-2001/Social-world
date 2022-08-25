import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Profile = () => {

  const { id } = useParams()
  // const state = useSelector((state) => state)
  // console.log(state);

  return (
    <div>
      <h1>{id}</h1>
    </div>
  )
}

export default Profile;