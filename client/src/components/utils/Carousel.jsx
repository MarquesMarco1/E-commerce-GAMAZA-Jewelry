import React, { useEffect, useState } from "react";
import localhost from "../../config";

export default function Carousel() {
    const [trending, setTrending] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayCarousel, setDisplayCarousel] = useState(false);

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
                    image: JSON.parse(product[0].images),
                    id: product[0].id,
                };
                trending_data.push(data);
            });
        });

        setTrending(trending_data);
    };

    const previousSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? trending.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === trending.length - 1 ? 0 : prevIndex + 1));
    };

    const getActiveImages = (index) => {
        const lastIndex = trending.length - 1;
        const prevIndex = index === 0 ? lastIndex : index - 1;
        const nextIndex = index === lastIndex ? 0 : index + 1;
        return [trending[prevIndex], trending[index], trending[nextIndex]];
    }

    const activeImages = getActiveImages(currentIndex);

    function canRender() {
        if (activeImages && activeImages[0] && activeImages[1] && activeImages[2])
            setDisplayCarousel(true);
        else
            return false;
    }

useEffect(() => {
    canRender();
}, [activeImages]);

return (
    <div className="space-y-4 flex flex-col items-start justify-center m-24">
        <h1 className="text-black text-5xl font-primary">
            Trending now
        </h1>
        <div className="flex justify-center">
            <button className="" onClick={previousSlide}>❮</button>
            <div className="flex items-center w-10/12 transition-transform duration-500 ease-in-out">
                {displayCarousel &&
                    <>
                        <img className='w-4/5 h-4/5 border-grey border-4 rounded-2xl z-0 left-28 relative' key={activeImages[0].id} src={activeImages[0].image} alt={`Image ${activeImages[0].id}`} />
                        <a href={`/product/${activeImages[1].id}`} className='z-10' style={{ transform: 'scale(1.25)' }}><img className='border-grey border-4 rounded-2xl' key={activeImages[1].id} src={activeImages[1].image} alt={`Image ${activeImages[1].id}`} /></a>
                        <img className='w-4/5 h-4/5 border-grey border-4 rounded-2xl z-0 right-16 relative' key={activeImages[2].id} src={activeImages[2].image} alt={`Image ${activeImages[2].id}`} />
                    </>
                }
            </div>
            <button className="" onClick={nextSlide}>❯</button>
        </div>
    </div>
);
};
