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
                <Offer key={offer._id} game={offer.game} description={offer.description} rank={offer.rank}></Offer>
            );
        });
    };

    return (
        <div>
            {offers && renderOffers()}
        </div>
    );
};