import React from 'react';

const NotificationBadge = ({ count }) => {
    if (count <= 0) {
        console.log(count)
        return null;
    }
    return (
        <div className="absolute top-0 right-0 bg-black text-white rounded-full h-6 w-6 flex items-center justify-center">
        {count}
        </div>
    );
};

export default NotificationBadge;

// bulle nombre d'articles dans le panier mise à jour en direct (badge)