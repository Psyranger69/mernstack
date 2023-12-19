import { useEffect, useState} from 'react';
import  CategoryDetails  from '../components/CategoryDetails';
const Home = () => {

    const [categories, setCategories] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('/api/categories');
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
        {categories &&
            categories.map((category) => (
                <CategoryDetails key={category._id} category={category}></CategoryDetails>
                // <div className='row'>
                //     <p key={category._id}>{category.catname}</p>
                //     {category.subcategories &&
                //         category.subcategories.map((subcategory) => (
                //             <p key={subcategory._id}>{subcategory.subcatname}</p>
                //         ))}
                // </div>
            ))}
            </ol>
    </div>
    
    )
}
export default Home;