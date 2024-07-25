import React, { useEffect, useState } from 'react';
import localhost from "../../config";

export default function Carousel() {
    const [trending, setTrending] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayPreviousArrow, setDisplayPreviousArrow] = useState(false)
    const [displayNextArrow, setDisplayNextArrow] = useState(true)
    const [displayCarousel, setDisplayCarousel] = useState(false)

    useEffect(() => {
        getTrendingProducts();
    }, []);

    const getTrendingProducts = async () => {

        const response = await fetch(`${localhost}/api/getStats/trending`);
        const data = await response.json();

        const trending_data = [];
        data.forEach((obj) => {
            obj.forEach((product) => {
                let data = {
                    image: product[0].images,
                    id: product[0].id,
                }
                trending_data.push(data);
            });
        });
        setTrending(trending_data);
    }

    const previousSlide = () => {
        if (currentIndex === 1) {
            setCurrentIndex(currentIndex - 1)
            setDisplayPreviousArrow(false);
        } else {
            setCurrentIndex(currentIndex - 1)
            setDisplayNextArrow(true)
        }
    };

    const nextSlide = () => {
        const lastIndex = trending.length - 3;
        if (currentIndex === lastIndex - 1) {
            setCurrentIndex(currentIndex + 1)
            setDisplayNextArrow(false);
        } else {
            setCurrentIndex(currentIndex + 1)
            setDisplayPreviousArrow(true)
        }
    };

    const activeImages = trending.slice(currentIndex, currentIndex + 3);
    console.log(activeImages)

    function canRender () {
        if(activeImages && activeImages[0] && activeImages[1] && activeImages[2])
            setDisplayCarousel(true);
        else 
            return false;
    }

    useEffect(()=>{
        canRender();
    }, [activeImages])
    
    return (
        <div className="space-y-4 flex flex-col items-start m-20">
            <h1 className="text-gold text-5xl mb-9 font-primary">
                Trending now
            </h1>
            <div className="flex">
                {displayPreviousArrow && <button className="" onClick={previousSlide}>❮</button>}
                <div className="flex">
                    {displayCarousel &&
                        <>
                            <img key={activeImages[0].id} src={activeImages[0].image} alt={`Image ${activeImages[0].id}`} className="w-full h-full" />
                            <img key={activeImages[1].id} src={activeImages[1].image} alt={`Image ${activeImages[1].id}`} className="w-full h-full" />
                            <img key={activeImages[2].id} src={activeImages[2].image} alt={`Image ${activeImages[2].id}`} className="w-full h-full" />
                        </>
                    }
                    {/* {!displayCarousel &&
                    <div className='flex flex-col'>
                    <h1>You need to see at least 6 products !</h1>
                    <h1>Tu as besoin de voir au moins 6 produits !</h1>
                    <a href="/product/1">--produit 1--</a>
                    <a href="/product/2">--produit 2--</a>
                    <a href="/product/3">--produit 3--</a>
                    <a href="/product/4">--produit 4--</a>
                    <a href="/product/5">--produit 5--</a>
                    <a href="/product/6">--produit 6--</a>
                    </div>
                    } */}
                </div>
                {displayNextArrow && <button className="" onClick={nextSlide}>❯</button>}
            </div>
        </div>
    );
};