import { useEffect, useState } from 'react';
import axios from '../../plugins/axios';
import useGetLoggedUserData from '../../hooks/useGetLoggedUserData';
import { OffersList } from '../offer/offersList/OffersList';

export const OfferTabs = (): JSX.Element => {
	const tabs = [
		{
			id: "offers",
			label: "My offers",
		},
		{
			id: "applications",
			label: "My applications",
		}
	];

	const [activeTab, setActiveTab] = useState(tabs[0].id);
	const [tabData, setTabData] = useState([]);

	const { userData } = useGetLoggedUserData();
	const userId = userData.user._id;

	useEffect(() => {
		(async () => {
			console.log(userId);
			if (activeTab === tabs[0].id) {
				setTabData([]);
				try {
					console.log('tab1');
					const { data } = await axios.get('/offers/user', {
						params: {
							userId
						}
					});
					console.log(data);

					setTabData(data);
				} catch (error) {
					console.log(error);
				}
			} else {
				try {
					console.log('tab2');
					setTabData([]);
					const { data } = await axios.get('/offers/applications', {
						params: {
							userId
						}
					});
					console.log(data);
					console.log('after request');
					setTabData(data);
				} catch (error) {
					console.log(error);
				}
			}
		})();
	}, [activeTab])

	const renderTabs = () => {
		return tabs.map((tab) => (
			<button
				key={tab.id}
				className={`py-2 w-full px-4 ${activeTab === tab.id
					? "bg-blue-500 text-white"
					: "bg-white text-blue-500 hover:bg-gray-100"
					} rounded-t-lg focus:outline-none`}
				onClick={() => setActiveTab(tab.id)}
			>
				{tab.label}
			</button>
		))
	};

	return (
		<div className="bg-gray-700 border border-gray-300 rounded-lg w-3/4 mx-auto">
			<div className="bg-gray-700 flex justify-center border-b border-gray-300">
				{renderTabs()}
			</div>
			<div className="p-4 bg-gray-700 rounded-b-lg">
				{tabData && <OffersList offers={tabData} />}
			</div>
		</div>
	);
};