//import
import {Product, HeroBanner} from "../components";

import {client} from "../lib/client";

const Home = ({products, bannerData}) => {

    console.log(products)
    return (
        <>
            {/**HeroBanner component**/}
            <HeroBanner heroBanner={""}/>
            <div className="products-heading">
                <h2>Best selling Products</h2>
                <p>Speakers of many variations</p>
            </div>

            <div className="product-container">
                {products?.map((product) => product.name)}
            </div>
        </>
    )
}

//fetch data: getServeSideProps

async function getServerSideProps()  {
    const query = '*[_type="product"]';
    const products = await client.fetch(query)

    const bannerQuery = '*[_type="banner"]';
    const bannerData = await client.fetch(bannerQuery)

    return {
        props: {products, bannerData}
    }
}

export default Home;