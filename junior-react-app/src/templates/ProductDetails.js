import "./ProductDetails.css";
import {useParams} from "react-router-dom";
import Gallery from "./template-components/Gallery";
import {useQuery} from "@apollo/client";
import {GET_PRODUCT} from "../queries/GET_PRODUCT";
import ProductInformation from "./template-components/ProductInformation";

export default function ProductDetails({currency, productCart, setProductCart}) {
    const params = useParams();
    const id = params.productId;

    const {loading, error , data} = useQuery(GET_PRODUCT, {
        variables: { "id": id },
        fetchPolicy: "cache-and-network"
    });

    if (loading) return <p>Loading..</p>;
    if (error) return <p>Whoops, something went wrong...</p>;

    return (
        <div className={"product-details"}>
            <Gallery images={data.product.gallery} inStock={data.product.inStock} />
            <ProductInformation product={data.product}
                                currency={currency}
                                productCart={productCart}
                                setProductCart={setProductCart}
            />
        </div>
    )
}