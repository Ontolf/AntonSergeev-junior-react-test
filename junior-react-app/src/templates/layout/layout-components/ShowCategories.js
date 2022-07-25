import {useQuery} from "@apollo/client";
import {GET_CATEGORIES} from "../../../queries/GET_CATEGORIES";
import "./ShowCategories.css";
import {Link} from "react-router-dom";

export default function ShowCategories({ setCategory, currentCategory }) {
    const {loading, error, data} = useQuery(GET_CATEGORIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: </p>;

    const handleCategoryClick = e => {
        setCategory(e.target.textContent)
    }

    return (
        <nav className={"categories-container"}>
            {data.categories.map((category) =>
                <Link to={""} className={"link-styles-none"} key={category.name}>
                    <div onClick={handleCategoryClick}
                         className={currentCategory === category.name ? "category-button-clicked" : "category-button" }>
                        {category.name}
                    </div>
                </Link>
            )}
        </nav>
    )
}