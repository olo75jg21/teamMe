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
        // <div className="p-10">
        //     <div className=" w-full lg:max-w-full lg:flex">
        //         {/* <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="Mountain">
        //         </div> */}
        //         <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        //             <div className="mb-8">
        //                 {/* <p className="text-sm text-gray-600 flex items-center">
        //                 </p> */}
        //                 <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
        //                 <p className="text-gray-700 text-base">{description}</p>
        //             </div>
        //             <div className="flex items-center">
        //                 <div className="text-sm">
        //                     <p className="text-gray-900 leading-none">John Smith</p>
        //                     <p className="text-gray-600">Aug 18</p>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        // <div className="flex">
        //                     <div className="p-2 w-12 h-12 border rounded">
        //                         <img src={} alt="" className="" />
        //                     </div>
        //                     </div>
        //                     <div className="text-lg font-semibold mt-2">
        //                     {}
        //                     </div>
        //                     <div className="text-sm mt-2">{}</div>
        //                     <div className="text-sm mt-2 font-semibold">
        //                     Used by: {}
        //                     </div>
        <div>
            <div className="flex">
                <div className="p-2 w-12 h-12 border rounded">
                    <img alt="GI" className="" />
                </div>
            </div>
            <div className="text-lg font-semibold mt-2">
                { }
            </div>
            <div className="text-sm mt-2">{description}</div>
            <div className="text-sm mt-2 font-semibold">
                Used by: { }
            </div>
        </div>
    );
};