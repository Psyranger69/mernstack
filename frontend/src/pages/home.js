import { useEffect, useState} from 'react';
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
        {categories &&
            categories.map((category) => (
                <div className='row'>
                    <p key={category._id}>{category.catname}</p>
                    {category.subcategories &&
                        category.subcategories.map((subcategory) => (
                            <p key={subcategory._id}>{subcategory.subcatname}</p>
                        ))}
                </div>
            ))}
    </div>
    
    )
}
export default Home;