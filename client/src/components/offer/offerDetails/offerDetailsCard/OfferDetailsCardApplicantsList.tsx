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
              <div key={applicant._id}>
                {applicant._user.username}
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