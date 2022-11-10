import axios from 'axios';
import { useState, useEffect } from 'react';

import { Offer } from './Offer';

export const OffersList = () => {
    const [offers, setOffers] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('/offer/getAll');
                setOffers(res.data);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    const renderOffers = (): any => {
        return offers.map((offer) => {
            return (
                <Offer key={offer._id} title={offer.title} game={offer.game} description={offer.description} rank={offer.rank}></Offer>
            );
        });
    };

    return (
        <div className='p-5'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'>
                {offers && renderOffers()}
            </div>
        </div>
    );
};