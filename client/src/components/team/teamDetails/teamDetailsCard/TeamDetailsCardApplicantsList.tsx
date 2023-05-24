import { Applicant } from "../../../../types/team";
import ApplicantDetailsModal from "./applicantDetailsModal/ApplicantDetailsModal";

interface TeamDetailsCardApplicantsListProps {
  applicants: Applicant[];
  handleUpdateStatusOfApplication: (
    applicantId: string,
    newStatus: string
  ) => any;
}

const TeamDetailsCardApplicantsList = ({
  applicants,
  handleUpdateStatusOfApplication,
}: TeamDetailsCardApplicantsListProps): JSX.Element => {
  const determineApplicationStatusColor = (status: string): string => {
    switch (status) {
      case "accepted":
        return "text-green-700";
      case "pending":
        return "text-yellow-300";
      case "rejected":
        return "text-redi-700";
      default:
        return "text-gray-100";
    }
  };

  const renderApplicantsList = (): JSX.Element => {
    if (applicants.length !== 0) {
      return (
        <>
          {applicants.map((applicant: Applicant) => {
            return (
              <div key={applicant._id}>
                <div className="mb-2 w-1/2 rounded-xl bg-gray-800 px-4 py-2 text-gray-100">
                  <li className="pb-3 sm:pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">img</div>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-start">
                          <ApplicantDetailsModal
                            username={applicant._user.username}
                            applicantId={applicant._user._id}
                          />
                          <p className="truncate text-sm font-medium dark:text-white">
                            -
                          </p>
                          <p
                            className={`ml-1 truncate text-sm font-medium ${determineApplicationStatusColor(
                              "pending"
                            )}`}
                          >
                            {applicant.status}
                          </p>
                        </div>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                          {/* @TODO Change it to user rank in particular game */}
                          {applicant._user.email}
                        </p>
                      </div>
                      <div className="flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <div>
                          <button
                            className="mr-2 rounded-lg bg-green-700 px-2 py-1 font-bold text-white duration-200 hover:bg-green-600 disabled:bg-green-900"
                            onClick={() =>
                              handleUpdateStatusOfApplication(
                                applicant._id,
                                "accepted"
                              )
                            }
                          >
                            Accept
                          </button>
                        </div>
                        <div
                          className="mr-2 rounded-lg bg-red-800 px-2 py-1 font-bold text-white duration-200 hover:bg-red-700"
                          onClick={() =>
                            handleUpdateStatusOfApplication(
                              applicant._id,
                              "rejected"
                            )
                          }
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
      <p className="mb-2 mt-4 text-xl font-bold text-gray-200">Applicants:</p>
      <ul>{renderApplicantsList()}</ul>
    </div>
  );
};

export default TeamDetailsCardApplicantsList;
