import { useEffect, useState} from 'react';
import  CategoryDetails  from '../components/CategoryDetails';
import  Categoryform  from '../components/Categoryform';
const Home = () => {

    const [categories, setCategories] = useState(null);
// "proxy": "http://localhost:4000",
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('http://localhost:4000/api/categories');
            // console.log(response);
            const json = await response.json();
            if(response.ok){
                setCategories(json);
            }
        }

        fetchCategories();
    }, []);

    return(
        <div className="home">
            <div className="categories">
                <ol><h2>Parent Categories</h2>
                    {categories && categories.map((category) => (
                        <CategoryDetails key={category._id} category={category}></CategoryDetails>
                    ))}
                </ol>
            </div>
            <div className="categoryform">
                <Categoryform></Categoryform>
            </div>
        </div>
    
    )
}
export default Home;