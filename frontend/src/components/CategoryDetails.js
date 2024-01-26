const CategoryDetails = ({ category }) => {
  return (
    <div className="category-details">
      <li>
        <strong>{category.catname}</strong>
        <ul>
          <h4>Sub categories</h4>
          {category &&
            category.subcategories.map((subcategory) => (
              <li key={subcategory._id}>
                {subcategory.subcatname}
                <ul>
                  <h5>Sub Sub categories</h5>
                  {subcategory &&
                    subcategory.subsubcategories.map((subsubcategory) => (
                      <li key={subsubcategory._id}>
                        {subsubcategory.subsubcatname}
                      </li>
                    ))}
                </ul>
              </li>
            ))}
        </ul>
      </li>
    </div>
  );
};

export default CategoryDetails;
