import React from 'react';

const UserDetailsComponent: React.FC = () => {
  const userDetails = JSON.parse(localStorage.getItem('user') || '{}');

  if (!userDetails) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4 text-start">
          {userDetails.nb_nombreUsuario}
          <span
            className="bg-green-300 rounded-full ml-2 px-4 py-2 border-green-900 text-lg font-normal
          "
          >
            active
          </span>
        </h2>
        <div className="space-y-4">
          <p className="text-start text-lg">
            <span className="text-gray-500 font-semibold mr-2">
              cd_identityUsuario:
            </span>
            <span className="text-black">{userDetails.cd_identityUsuario}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

interface DetailItemProps {
  label: string;
  value: React.ReactNode;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="font-medium text-gray-700">{label}:</span>
    <span className="text-gray-900">{value}</span>
  </div>
);

export default UserDetailsComponent;
