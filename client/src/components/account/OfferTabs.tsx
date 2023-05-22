import { useEffect, useState } from 'react';
import axios from '../../plugins/axios';
import useGetLoggedUserData from '../../hooks/useGetLoggedUserData';
import { OffersList } from '../offer/offersList/OffersList';

export const OfferTabs = (): JSX.Element => {
	const tabs = [
		{
			id: "offers",
			label: "My Teams",
		},
		{
			id: "applications",
			label: "My Applications",
		}
	];

	const [activeTab, setActiveTab] = useState(tabs[0].id);
	const [tabData, setTabData] = useState([]);

	const { userData } = useGetLoggedUserData();
	const userId = userData.user._id;

	useEffect(() => {
		const getUserOffers = async () => {
			try {
				const { data } = await axios.get('/team/user', {
					params: {
						userId
					}
				});
				setTabData(data);
			} catch (error) {
				console.error(error);
			}
		};

		const getUserApplications = async () => {
			try {
				setTabData([]);
				const { data } = await axios.get('/team/applications', {
					params: {
						userId
					}
				});
				setTabData(data);
			} catch (error) {
				console.error(error);
			}
		};

		(async () => {
			if (activeTab === tabs[0].id) {
				await getUserOffers();
			} else {
				await getUserApplications();
			}
		})();
	}, [activeTab])

	const renderTabs = () => {
		return tabs.map((tab) => (
			<button
				key={tab.id}
				className={`py-2 w-full px-4 ${activeTab === tab.id
					? "bg-violet-700 text-gray-100"
					: "bg-white text-violet-700 hover:bg-gray-200"
					} rounded-t-lg focus:outline-none`}
				onClick={() => setActiveTab(tab.id)}
			>
				{tab.label}
			</button>
		))
	};

	return (
		<div className={`bg-gray-700 border border-gray-500 rounded-lg w-3/4 mx-auto`}>
			<div className="bg-gray-700 flex justify-center border-b border-gray-300">
				{renderTabs()}
			</div>
			<div className={`p-4 bg-gray-800 rounded-b-lg ${tabData.length <= 2 ? 'h-screen' : 'h-full'}`}>
				{tabData && <OffersList offers={tabData} />}
			</div>
		</div>
	);
};