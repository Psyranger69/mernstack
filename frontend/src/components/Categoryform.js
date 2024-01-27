import { useState } from "react";
import { useEffect } from "react";
import { useCategoriesContext } from "../hooks/useCategoriesContext";
const Categoryform = () => {
  const { categories, dispatch } = useCategoriesContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [image, setImage] = useState("");
  const [stat, setStat] = useState(1);
  // const [categoryOptions, setCategoryOptions] = useState([]); // for category dropdown
  const [subcategoryOptions, setSubCategoryOptions] = useState([]); // for subcategory dropdown
  const [error, setError] = useState("");

  // ---------------handle submit request-------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("categoryName", category);
    formData.append("subcategoryName", subcategory);
    formData.append("image", image);
    formData.append("stat", stat);

    const response = await fetch("http://localhost:4000/api/categories", {
      method: "POST",
      body: formData,
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setName("");
      setDescription("");
      setCategory("");
      setSubcategory("");
      setImage("");
      setStat(1);
      setError("");
      // console.log("new category added", json);
      if (category === "0" && subcategory === "0") {
        dispatch({ type: "CREATE_CATEGORY", payload: json });
      } else {
        dispatch({ type: "CREATE_SUB_CATEGORY", payload: json });
      }
    }
  };

  useEffect(() => {
    const getCategoriesddl = async () => {
      const response = await fetch("http://localhost:4000/api/categories");
      const json = await response.json();
      try {
        if (response.ok) {
          // setCategoryOptions(json);
          dispatch({ type: "SET_CATEGORIES", payload: json });
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategoriesddl();
  }, [dispatch]);

  // onchange function for parent cat to get subcat values
  const handlecatchange = async (e) => {
    setCategory(e.target.value);
    if (e.target.value !== "0") {
      const response = await fetch(
        "http://localhost:4000/api/categories/" + e.target.value
      );
      const subcatoptions = await response.json();
      try {
        if (subcatoptions) {
          setSubCategoryOptions(subcatoptions);
        }
      } catch (error) {
        console.log("Error fetching subcategories:", error);
      }
    } else {
      setSubCategoryOptions("");
    }
  };

  return (
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
      <select id="ddlcategory" onChange={handlecatchange} value={category}>
        <option value="">Select Category</option>
        <option value="0">Parent</option>
        {categories &&
          categories.map((option) => (
            <option key={option._id} value={option._id}>
              {option.catname}
            </option>
          ))}
      </select>

      <label>Sub-Category: </label>
      <select
        id="ddlsubcategory"
        onChange={(e) => setSubcategory(e.target.value)}
        value={subcategory}
      >
        <option value="">Select Sub-Category</option>
        <option value="0">none</option>
        {subcategoryOptions && subcategoryOptions.subcategories
          ? subcategoryOptions.subcategories.map((options) => (
              <option key={options._id} value={options._id}>
                {options.subcatname}
              </option>
            ))
          : ""}
      </select>

      <label>Image: </label>
      <input
        type="file"
        id="fileup"
        onChange={(e) => setImage(e.target.files[0])}
        // value={image}
      />

      <legend>
        Available
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
      {/* {image && <div>{image.name}</div>} */}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Categoryform;
