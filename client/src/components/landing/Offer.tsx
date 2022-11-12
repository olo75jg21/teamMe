import { useState, useEffect } from 'react';
import axios from 'axios';

export interface IOffer {
    // _id: string;
    _user: string;
    // createdAd: string;
    // updatedAt: string;
    title: string;
    description: string;
    game: string;
    rank: string;
};

export const Offer = ({ _user, title, game, description, rank }: IOffer): JSX.Element => {
    const [creator, setCreator] = useState<any>('');

    useEffect(() => {
        (async () => {
            const res = await axios.get('/users/getOneUser/' + _user);
            setCreator(res.data);
        })();
    }, []);

    return (
        <div className="border p-5 rounded-sm">
            <div>
                <div className="flex">
                    <div className="p-2 w-12 h-12 border rounded">
                        <img src={game === "League of legends" ? require("../../img/lol_logo.png") : null} alt="GI" className="" />
                    </div>

                    <div className="text-md font-semibold p-2 w-80 mx-6">
                        {title}
                    </div>

                </div>
                <div className="text-sm mt-2">{description}</div>
                <div className="text-sm mt-2">
                    <p>Added by: {creator.email}</p>
                </div>
            </div>
        </div>
    );
};