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
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-start">
        {userDetails.nb_nombreUsuario}
        <span className="bg-green-300 rounded-full ml-2 px-4 py-2 border-green-900 text-lg font-normal">
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
        <p className="text-start text-lg">
          <span className="text-gray-500 font-semibold mr-2">Idioma:</span>
          <span className="text-black">{userDetails.Idioma}</span>
        </p>
        <p className="text-start text-lg">
          <span className="text-gray-500 font-semibold mr-2">
            cd_identityPaisUsuario:
          </span>
          <span className="text-black">
            {userDetails.cd_identityPaisUsuario}
          </span>
        </p>
        <p className="text-start text-lg">
          <span className="text-gray-500 font-semibold mr-2">
            nb_paisUsuario:
          </span>
          <span className="text-black">{userDetails.nb_paisUsuario}</span>
        </p>
        <p className="text-start text-lg">
          <span className="text-gray-500 font-semibold mr-2">
            tx_acronimoPais:
          </span>
          <span className="text-black">{userDetails.tx_acronimoPais}</span>
        </p>
        <p className="text-start text-lg">
          <span className="text-gray-500 font-semibold mr-2">
            cd_identitySucursalUsuario:
          </span>
          <span className="text-black">
            {userDetails.cd_identitySucursalUsuario}
          </span>
        </p>
        <p className="text-start text-lg">
          <span className="text-gray-500 font-semibold mr-2">
            nb_sucursalUsuario_sucursal:
          </span>
          <span className="text-black">
            {userDetails.nb_sucursalUsuario_sucursal}
          </span>
        </p>
        <p className="text-start text-lg">
          <span className="text-gray-500 font-semibold mr-2">
            CulturaUsuario:
          </span>
          <span className="text-black">{userDetails.CulturaUsuario}</span>
        </p>
        <p className="text-start text-lg">
          <span className="text-gray-500 font-semibold mr-2">
            ZonaHorarioaUsuario:
          </span>
          <span className="text-black">{userDetails.ZonaHorarioaUsuario}</span>
        </p>
        <p className="text-start text-lg">
          <span className="text-gray-500 font-semibold mr-2">st_estatus:</span>
          <span className="text-black">{userDetails.st_estatus}</span>
        </p>
        <p className="text-start text-lg">
          <span className="text-gray-500 font-semibold mr-2">url_soporte:</span>
          <span className="text-blue-500 underline">
            <a
              href={userDetails.url_soporte}
              target="_blank"
              rel="noopener noreferrer"
            >
              {userDetails.url_soporte}
            </a>
          </span>
        </p>
        <p className="text-start text-lg">
          <span className="text-gray-500 font-semibold mr-2">cliente:</span>
          <span className="text-black">{userDetails.cliente}</span>
        </p>
        <p className="text-start text-lg">
          <span className="text-gray-500 font-semibold mr-2">exp:</span>
          <span className="text-black">
            {new Date(userDetails.exp * 1000).toLocaleString()}
          </span>
        </p>
        <p className="text-start text-lg">
          <span className="text-gray-500 font-semibold mr-2">iss:</span>
          <span className="text-black">{userDetails.iss}</span>
        </p>
        <p className="text-start text-lg">
          <span className="text-gray-500 font-semibold mr-2">aud:</span>
          <span className="text-black">{userDetails.aud}</span>
        </p>
      </div>
    </div>
  );
};

export default UserDetailsComponent;
