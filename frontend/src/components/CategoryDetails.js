const CategoryDetails = ({ category }) => {
    return (
        <div className="category-details">
            <li><strong>{category.catname}</strong>
                <ul><h4>Sub categories</h4>
                {category && category.subcategories.map((subcategory) => (
                    <li key={subcategory._id}>{subcategory.subcatname}</li>
                ))}
                </ul>
            </li>
        </div>
    )
}

export default CategoryDetails;