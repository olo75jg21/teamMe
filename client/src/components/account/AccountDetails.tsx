import { useEffect } from 'react';
import { IUser } from '../../types/user';

interface AccountDetailsProps {
    user: IUser;
};

export const AccountDetails = ({ user }: AccountDetailsProps): JSX.Element => {
    useEffect(() => {
        console.log(user);
    });

    if (!user) {
        return <h1>XD</h1>;
    }

    return (
        <div>
            {user._id}
        </div>
    );
};