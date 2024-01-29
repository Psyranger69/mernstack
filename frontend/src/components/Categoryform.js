import { useState } from "react";
import { useEffect } from "react";
import { useCategoriesContext } from "../hooks/useCategoriesContext";
import { Modal } from "bootstrap";
const Categoryform = () => {
  const { categories, dispatch } = useCategoriesContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [image, setImage] = useState("");
  const [stat, setStat] = useState(2);
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
      setStat(2);
      setError("");
      const catmodal = new Modal(
        document.getElementById("categorycreationmodal")
      );
      catmodal.hide();
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
      <div
        className="modal fade"
        id="categorycreationmodal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="categorycreationmodalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-center border-0">
              <h1 className="modal-title fs-5" id="categorycreationmodalLabel">
                Create New Category
              </h1>
            </div>
            <div className="modal-body">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="txtname"
                  id="txtname"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <label htmlFor="txtname">Name</label>
              </div>

              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  placeholder="Description"
                  name="txtdescription"
                  id="txtdescription"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                ></textarea>
                <label htmlFor="txtdescription">Description</label>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-floating mb-3">
                    <select
                      className="form-select"
                      name="ddlcategory"
                      id="ddlcategory"
                      aria-label="Parent Category"
                      onChange={handlecatchange}
                      value={category}
                    >
                      <option value="">Select Category</option>
                      <option value="0">Parent</option>
                      {categories &&
                        categories.map((option) => (
                          <option key={option._id} value={option._id}>
                            {option.catname}
                          </option>
                        ))}
                    </select>
                    <label htmlFor="ddlcategory">Parent Category</label>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-floating mb-3">
                    <select
                      className="form-select"
                      name="ddlsubcategory"
                      id="ddlsubcategory"
                      aria-label="Sub-Category"
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
                    <label htmlFor="ddlsubcategory">Sub-Category</label>
                  </div>
                </div>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="file"
                  className="form-control"
                  name="fileup"
                  id="fileup"
                  placeholder="Select an Image"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <label htmlFor="fileup">Image</label>
              </div>
              <span>Available: </span>
              <div className="form-check form-switch mb-3 form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  name="rdostat"
                  id="rdostat1"
                  onChange={() => setStat(stat === 2 ? 1 : 2)}
                />
                <label className="form-check-label" htmlFor="rdostat1">
                  {stat === 2 ? "NO" : "YES"}
                </label>
              </div>
              {/* {stat && <div>{stat}</div>} */}
              {error && <div className="error">{error}</div>}
            </div>
            <div className="modal-footer d-flex justify-content-between border-0">
              <button type="submit" className="btn btn-outline-success">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Categoryform;
