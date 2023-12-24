import { useEffect, useState} from 'react';
import  CategoryDetails  from '../components/CategoryDetails';
const Home = () => {

    const [categories, setCategories] = useState(null);
// "proxy": "http://localhost:4000",
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('http://localhost:4000/api/categories');
            console.log(response);
            const json = await response.json();
            if(response.ok){
                setCategories(json);
            }
        }

        fetchCategories();
    }, []);

    return(
        <div className="home">
            <ol><h2>Parent Categories</h2>
                {categories && categories.map((category) => (
                    <CategoryDetails key={category._id} category={category}></CategoryDetails>
                ))}
            </ol>
    </div>
    
    )
}
export default Home;