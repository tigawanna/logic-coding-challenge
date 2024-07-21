import React from 'react';

// interface UserDetails {
//   cd_identityUsuario: string;
//   nb_nombreUsuario: string;
//   Idioma: string;
//   cd_identityPaisUsuario: string;
//   nb_paisUsuario: string;
//   tx_acronimoPais: string;
//   cd_identitySucursalUsuario: string;
//   nb_sucursalUsuario_sucursal: string;
//   CulturaUsuario: string;
//   ZonaHorarioaUsuario: string;
//   st_estatus: string;
//   url_soporte: string;
//   cliente: string;
//   exp: number;
//   iss: string;
//   aud: string;
// }

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
        <h2 className="text-3xl font-semibold mb-6 text-center">
          User Details
        </h2>
        <div className="space-y-4">
          <DetailItem label="ID" value={userDetails.cd_identityUsuario} />
          <DetailItem label="Name" value={userDetails.nb_nombreUsuario} />
          <DetailItem label="Language" value={userDetails.Idioma} />
          <DetailItem
            label="Country ID"
            value={userDetails.cd_identityPaisUsuario}
          />
          <DetailItem label="Country Name" value={userDetails.nb_paisUsuario} />
          <DetailItem
            label="Country Acronym"
            value={userDetails.tx_acronimoPais}
          />
          <DetailItem
            label="Branch ID"
            value={userDetails.cd_identitySucursalUsuario}
          />
          <DetailItem
            label="Branch Name"
            value={userDetails.nb_sucursalUsuario_sucursal}
          />
          <DetailItem label="Culture" value={userDetails.CulturaUsuario} />
          <DetailItem
            label="Time Zone"
            value={userDetails.ZonaHorarioaUsuario}
          />
          <DetailItem label="Status" value={userDetails.st_estatus} />
          <DetailItem
            label="Support URL"
            value={
              <a
                href={userDetails.url_soporte}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {userDetails.url_soporte}
              </a>
            }
          />
          <DetailItem label="Client" value={userDetails.cliente} />
          <DetailItem
            label="Expiration"
            value={new Date(userDetails.exp * 1000).toLocaleString()}
          />
          <DetailItem label="Issuer" value={userDetails.iss} />
          <DetailItem label="Audience" value={userDetails.aud} />
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
