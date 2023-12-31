import { useState } from "react"

const Categoryform = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [image, setImage] = useState('');
    const [stat, setStat] = useState(0);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCat = {name, description, category, subcategory, image, stat}

        const response = await fetch('http://localhost:4000/api/categories', {
            method: "POST",
            body: JSON.stringify(newCat),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const json = await response.json();

        if(!response.ok){
            setError(json.error);
        }
        if(response.ok){
            setName('');
            setDescription('');
            setCategory('');
            setSubcategory('');
            setImage('');
            setStat(0);
            setError('');
            console.log('new category added', json);
        }
    }


    return(
        <form className="createCategory" onSubmit={handleSubmit}>
            <h2>Add new Category</h2>

            <label>Name: </label>
            <input 
                type="text" 
                id="txtname"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />

            <label>Description: </label>
            <textarea 
                id="txtdescription" 
                cols="30" 
                rows="10"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            ></textarea>
            
            <label>Category: </label>
            <select 
                id="ddlcategory"
                onChange={(e) => setCategory(e.target.value)}
                value={category}  
            ></select>

            <label>Sub-Category: </label>
            <select 
                id="ddlsubcategory"
                onChange={(e) => setSubcategory(e.target.value)}
                value={subcategory}
            ></select>

            <label>Image: </label>
            <input 
                type="file" 
                id="fileup"
                onChange={(e) => setImage(e.target.files[0])}
                value={image}
            />

            <legend>Available
                <span>YES</span>
                <input 
                    type="radio"
                    id="rdostat1"
                    onChange={() => setStat(1)}
                    checked={stat === 1}
                />

                <span>NO</span>
                <input 
                    type="radio"
                    id="rdostat2" 
                    onChange={() => setStat(2)}
                    checked={stat === 2}
                />
            </legend>

            <button>ADD Category</button>
            {error && <div className="error">{error}</div>}
        </form>

    )
}

export default Categoryform;