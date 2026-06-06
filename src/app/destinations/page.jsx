import DestinationCard from '@/components/DestinationCard';
import React from 'react';

const DestinationPage = async () => {

    const res = await fetch('http://localhost:6001/destinations');
    const destinations = await res.json();
    console.log("Fetched Destinations:", destinations);

    return (
        <div className='p-5 max-w-7xl mx-auto'>
            <h1 className='text-2xl font-bold mb-5'>All Destinations</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    destinations.map(d => <DestinationCard key={d._id} destination={d} />)
                }
            </div>
        </div>
    );
};

export default DestinationPage;