import { useCategoriesContext } from "../hooks/useCategoriesContext";
const CategoryDetails = ({ category }) => {
  const { dispatch } = useCategoriesContext();
  const handledelete = async (e) => {
    var pid = e.target.dataset.pid;
    var sid = e.target.dataset.sid;
    var ssid = e.target.dataset.ssid;
    const response = await fetch(
      "http://localhost:4000/api/categories/" + pid + "/" + sid + "/" + ssid,
      {
        method: "DELETE",
      }
    );

    const json = await response.json();
    if (response.ok) {
      if (sid === "0" && ssid === "0") {
        console.log("delcat");
        dispatch({ type: "DELETE_CATEGORY", payload: json });
      } else {
        dispatch({ type: "DELETE_SUB_CATEGORY", payload: json });
      }
    }
  };
  return (
    <div className="category-details">
      <li>
        <strong>{category.catname}</strong>
        <span>
          <button
            type="button"
            data-pid={category._id}
            data-sid="0"
            data-ssid="0"
            onClick={handledelete}
          >
            DEL Category
          </button>
        </span>
        <ul>
          <h4>Sub categories</h4>
          {category &&
            category.subcategories.map((subcategory) => (
              <li key={subcategory._id}>
                {subcategory.subcatname}
                <span>
                  <button
                    type="button"
                    data-pid={category._id}
                    data-sid={subcategory._id}
                    data-ssid="0"
                    onClick={handledelete}
                  >
                    DEL Sub-Category
                  </button>
                </span>
                <ul>
                  <h5>Sub Sub categories</h5>
                  {subcategory &&
                    subcategory.subsubcategories.map((subsubcategory) => (
                      <li key={subsubcategory._id}>
                        {subsubcategory.subsubcatname}
                        <span>
                          <button
                            type="button"
                            data-pid={category._id}
                            data-sid={subcategory._id}
                            data-ssid={subsubcategory._id}
                            onClick={handledelete}
                          >
                            DEL Sub-Sub-Category
                          </button>
                        </span>
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
