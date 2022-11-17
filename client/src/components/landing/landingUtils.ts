const calculateTimePassed = (createdAt: string) => {
    const differenceInTime = new Date().getTime() - new Date(createdAt).getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return Math.ceil(differenceInDays);
};

export const renderPassedDays = (createdAt: string) => {
    if (calculateTimePassed(createdAt) === 0) {
        return 'Today';
    }

    if (calculateTimePassed(createdAt) === 1) {
        return 'Yesterday';
    }

    return `${calculateTimePassed(createdAt)} days ago`;
};