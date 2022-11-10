export interface IOffer {
    // _id: string;
    // _user: string;
    // createdAd: string;
    // updatedAt: string;
    title: string;
    description: string;
    game: string;
    rank: string;
};

export const Offer = ({ title, game, description, rank }: IOffer): JSX.Element => {
    return (
        <div className="border p-5 rounded-sm">
            <div>
                <div className="flex">
                    <div className="p-2 w-12 h-12 border rounded">
                        <img alt="GI" className="" />
                    </div>


                    <div className="text-md font-semibold p-2 w-80 mx-6">
                        {title}
                    </div>
                </div>
                <div className="text-sm mt-2">{description}</div>
                <div className="text-sm mt-2 font-semibold">
                    Used by: { }
                </div>
            </div>
        </div>
    );
};