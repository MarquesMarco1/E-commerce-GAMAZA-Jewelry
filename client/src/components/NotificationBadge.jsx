import React from 'react';

const NotificationBadge = ({ count }) => {
    if (count <= 0) {
        return null;
    }
    return (
        <div className="absolute top-0 right-0 bg-black text-white rounded-full h-6 w-6 flex items-center justify-center">
        {count}
        </div>
    );
};

export default NotificationBadge;
