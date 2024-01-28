import { useEffect } from "react";
import CategoryDetails from "../components/CategoryDetails";
import Categoryform from "../components/Categoryform";
import { useCategoriesContext } from "../hooks/useCategoriesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Home = () => {
  const { categories, dispatch } = useCategoriesContext();
  //   const [categories, setCategories] = useState(null);
  // "proxy": "http://localhost:4000",
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:4000/api/categories");
      // console.log(response);
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_CATEGORIES", payload: json });
        // setCategories(json);
      }
    };

    fetchCategories();
  }, [dispatch]);

  return (
    <div className="container-fluid home">
      <div className="categories">
        <div className="row">
          <div className="col-sm-12 mt-3">
            <button
              type="button"
              className="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#categorycreationmodal"
            >
              ADD NEW
              <FontAwesomeIcon
                icon={["fas", "plus"]}
                style={{ marginLeft: "10px" }}
              ></FontAwesomeIcon>
            </button>
          </div>
        </div>

        <CategoryDetails categories={categories}></CategoryDetails>
      </div>
      <div className="categoryform">
        <Categoryform></Categoryform>
      </div>
    </div>
  );
};
export default Home;
