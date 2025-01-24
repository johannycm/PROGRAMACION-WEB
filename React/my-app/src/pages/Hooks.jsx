import { useState, useEffect } from "react";
import SearchBar from "../components/general/SearchBar";

function Hooks() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
  const url = `https://moviesdatabase.p.rapidapi.com/titles?page=${page}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "d40d92e22dmshb7004d851c0ad13p114a3djsn00cabd286728",
      "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
  },
};

const fetchData = async () => {
  try {
    console.log(`Fetching page ${page}`);
    const response = await fetch(`${url}&limit=10`, options);
    const result = await response.json();
    setData(result.results);
    setFilteredData(result.results); // Inicialmente, no hay filtro
    setLoading(false);
  } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

    fetchData();
  }, [page]);

useEffect(() => {
  if (searchTerm) {
    const filtered = data.filter((item) =>
      item.titleText.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  } else {
    setFilteredData(data); // Mostrar todos los datos si no hay búsqueda
  }
}, [searchTerm, data]);

if (loading)
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="loader"></div>
      <p className="text-center text-gray-500">Cargando...</p>
    </div>
);

if (!filteredData || filteredData.length === 0)
  return <p className="text-center text-gray-500">No hay datos disponibles</p>;

return (
  <div className="container mx-auto">
    <h1 className="text-4xl font-bold text-center my-6">Movies🎬</h1>
    <SearchBar onSearch={setSearchTerm} />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {filteredData.map((item) => (
    <div
      key={item.id}
      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all 
      duration-300 p-4">
    <h1 className="font-serif text-lg mb-2">{item.titleText.text}</h1>
    <img
      src={
      item.primaryImage
      ? item.primaryImage.url
      : "https://poetsandquants.com/wp-content/uploads/sites/5/2022/08/Movies.jpg"
      }
      alt={item.primaryImage ? item.primaryImage.caption.plainText : "Imagen no disponible"}
      className="w-full h-60 object-cover rounded" />
    <p className="text-gray-700">
      Año de lanzamiento:{" "}
      {item.releaseYear ? item.releaseYear.year : "No disponible"}
    </p>
      {item.releaseDate && (
    <p className="text-gray-700">
          Fecha de estreno: {item.releaseDate.day}/
          {item.releaseDate.month}/{item.releaseDate.year}
    </p>
            )}
    </div>
        ))}
    </div>
      {/* Paginación */}
    <div className="flex justify-center gap-4 my-4">
    <button
      onClick={() => setPage(page - 1)}
      disabled={page === 1}
      className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 
      hover:bg-blue-700 transition-all duration-300"
    >
      Anterior
    </button>
    <button
      onClick={() => setPage(page + 1)}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 
      transition-all duration-300"
    >
      Siguiente
    </button>
    </div>
  </div>
  );
}

export default Hooks;
