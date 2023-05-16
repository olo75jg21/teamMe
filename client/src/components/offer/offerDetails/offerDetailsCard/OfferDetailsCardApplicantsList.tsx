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
                className='mt-4'
              >
                <div className='text-gray-100'>
                  <p className="text-gray-200 text-xl font-bold mb-2">Applicants:</p>
                  <div>
                    {applicant._user.username + ' '}
                  </div>
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
      {renderApplicantsList()}
    </div>
  );
};

export default OfferDetailsCardApplicantsList;