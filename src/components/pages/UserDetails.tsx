import React from 'react';

const UserDetails: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  console.log(user);

  return (
    <div>
      <h1>User Details</h1>
    </div>
  );
};

export default UserDetails;
