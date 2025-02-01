import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [expandedCharacterId, setExpandedCharacterId] = useState(null);
  const navigate = useNavigate();

useEffect(() => {
  const fetchCharacters = async () => {
    try {
    const response = await fetch('https://rickandmortyapi.com/api/character');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  const data = await response.json();
    setCharacters(data.results);
    } catch (error) {
      console.error('Error fetching the characters:', error);
    }
  };

fetchCharacters();
}, []);

const handleToggle = (id) => {
  setExpandedCharacterId(expandedCharacterId === id ? null : id);
};

const handleLogout = () => {
  navigate('/login');
};

return (
  <div
    className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: 'url(https://images2.alphacoders.com/128/thumb-1920-1285058.jpg)', backgroundAttachment: 'fixed' }}
  >
    <h1 className="text-3xl font-bold mb-6 text-white mt-5">Rick and Morty Characters</h1>
    <button
      onClick={handleLogout}
      className="absolute top-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
      Cerrar Sesión
    </button>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {characters.length > 0 ? (
    characters.map((character) => (
  <div
    key={character.id}
    className={`p-4 border rounded-lg bg-white bg-opacity-75 cursor-pointer hover:bg-opacity-100 transition ${
    expandedCharacterId === character.id ? 'min-h-[300px]' : 'min-h-[200px]'
      }`}
      onClick={() => handleToggle(character.id)}
      style={{ width: '250px' }}>
  <h2 className="text-xl font-semibold text-black">{character.name}</h2>
  <p className="text-gray-700">{character.status}</p>
  <p className="text-gray-700">{character.species}</p>
  <img src={character.image} alt={character.name} className="mt-4 w-32 h-32 rounded-full mx-auto" />
    {expandedCharacterId === character.id && (
  <div className="mt-4 text-black">
    <p><strong>Gender:</strong> {character.gender}</p>
    <p><strong>Origin:</strong> {character.origin.name}</p>
    <p><strong>Location:</strong> {character.location.name}</p>
  </div>
  )}
  </div>
  ))
    ) : (
   <p className="text-white">No characters found.</p>
    )}
    </div>
  </div>
  );
};

export default Home;

