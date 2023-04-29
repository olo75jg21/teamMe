import { useEffect, useState } from 'react';
import axios from '../../plugins/axios';
import useGetLoggedUserData from '../../hooks/useGetLoggedUserData';
import { forEach } from 'lodash';
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

	useEffect(() => {
		(async () => {
			if (activeTab === tabs[0].id) {
				const { data } = await axios.get('/offer/allUserOffers', {
					params: {
						userId: userData.user._id
					}
				});

				setTabData(data);
			} else {
				const { data } = await axios.get('/offer/userApplications', {
					params: {
						userId: userData.user._id
					}
				});
				setTabData(data);
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
		<div className="border border-gray-300 rounded-lg w-3/4 mx-auto">
			<div className="flex justify-center border-b border-gray-300">
				{renderTabs()}
			</div>
			<div className="p-4 bg-white rounded-b-lg">
				{tabData && <OffersList offers={tabData} />}
			</div>
		</div>
	);
};