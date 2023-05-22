import { NavLink } from 'react-router-dom';
import { Applicant } from '../../../../types/offer';

interface OfferDetailsCardApplicantsListProps {
  applicants: Applicant[];
  handleUpdateStatusOfApplication: (applicantId: string, newStatus: string) => any
};

const TeamDetailsCardApplicantsList = ({ applicants, handleUpdateStatusOfApplication }: OfferDetailsCardApplicantsListProps): JSX.Element => {
  const determineApplicationStatusColor = (status: string): string => {
    switch (status) {
      case 'accepted':
        return 'text-green-700'
      case 'pending':
        return 'text-yellow-300'
      case 'rejected':
        return 'text-redi-700'
      default:
        return 'text-gray-100'
    }
  };

  const renderApplicantsList = (): JSX.Element => {
    if (applicants.length !== 0) {
      return (
        <>
          {applicants.map((applicant: Applicant) => {
            return (
              <div
                key={applicant._id}
              >
                <div className='text-gray-100 bg-gray-800 w-1/2 px-4 py-2 mb-2 rounded-xl'>
                  <li className="pb-3 sm:pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        img
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className='flex justify-start'>
                          <NavLink
                            to={`/applicantProfile/${applicant._user._id}`}
                            className="text-sm font-medium truncate dark:text-white mr-1 hover:text-gray-300 hover:underline duration-200"
                          >
                            {applicant._user.username}
                          </NavLink>
                          <p
                            className="text-sm font-medium truncate dark:text-white"
                          >
                            -
                          </p>
                          <p className={`text-sm font-medium truncate ml-1 ${determineApplicationStatusColor('pending')}`}>
                            {applicant.status}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {/* @TODO Change it to user rank in particular game */}
                          {applicant._user.email}
                        </p>
                      </div>
                      <div className="flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <div
                          className='bg-green-800 hover:bg-green-600 text-white font-bold py-1 px-2 rounded-lg mr-2 duration-200'
                          onClick={() => handleUpdateStatusOfApplication(applicant._id, 'accepted')}
                        >
                          <button
                          >Accept</button>
                        </div>
                        <div
                          className='bg-red-800 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-lg mr-2 duration-200'
                          onClick={() => handleUpdateStatusOfApplication(applicant._id, 'rejected')}
                        >
                          <button>Reject</button>
                        </div>
                      </div>
                    </div>
                  </li>
                </div>
              </div>
            );
          })}
        </>
      );
    } else {
      return <div>No applicants</div>;
    }
  };

  return (
    <div>
      <p className="text-gray-200 text-xl font-bold mb-2 mt-4">Applicants:</p>
      <ul>
        {renderApplicantsList()}
      </ul>
    </div>
  );
};

export default TeamDetailsCardApplicantsList;