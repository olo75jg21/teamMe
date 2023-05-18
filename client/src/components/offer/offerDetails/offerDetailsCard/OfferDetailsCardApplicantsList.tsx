import { Applicant } from '../../../../types/offer';

interface OfferDetailsCardApplicantsListProps {
  applicants: Applicant[];
};

const OfferDetailsCardApplicantsList = ({ applicants }: OfferDetailsCardApplicantsListProps): JSX.Element => {

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
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white mr-1">
                            {applicant._user.username + ' -'}
                          </p>
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {applicant.status}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {applicant._user.email}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        $320
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

export default OfferDetailsCardApplicantsList;