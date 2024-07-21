import React from 'react';

const UserDetails: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div>
      <h1>User Details</h1>
      {user ? (
        <div className="card">
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default UserDetails;
