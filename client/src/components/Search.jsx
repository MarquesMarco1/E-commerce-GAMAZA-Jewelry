import Header from "./Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
    const [searchTerm, setSearchTerm]= useState('');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] =  useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    let navigate = useNavigate();
    let { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(`${localhost}/api/search/${id}`);
          if (response.status === 200) {
            const data = await response.json();
            if (data.products.length > 0) {
              setSelectedCategory(data.products[0].category.name);
            }
            setProducts(data.products);
          }
        };
        fetchData();
      }, [id]);
      
    const handleSearch = async (e) => {
        e.preventDefault();

        navigate(`search?=name=${searchTerm}&category=${selectedCategory}`);
    };

    return (
      <form onSubmit={handleSearch}>
        <input
        type="text"
        placeholder="Search by terms or categories"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="text-gold font-primary"
        />
        <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value=""
          className="text-gold font-primary">Toutes les catégories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit"
        className="w-3/4 p-3 bg-light-purple text-3xl font-bold text-black rounded-lg hover:bg-gold font-primary">
          Search
        </button>
      </form>
    );
}