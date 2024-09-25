import { generateClient } from "aws-amplify/data";
import { getCurrentUser } from 'aws-amplify/auth';
import type { Schema } from "@amplify/data/resource";

const client = generateClient<Schema>();

const fetchUserScore = async (): Promise<number> => {
    try {
        const { userId } = await getCurrentUser();
        return client.models.UserScore.get({ id: userId }).then((result) => {
            if (result.errors) throw result.errors;
            return result.data?.score || 0;
        });
    }
    catch (e) {
        console.log(e);
        throw e;
    }
};
const saveUserScore = async (score: number): Promise<void> => {
    try {
        const { userId } = await getCurrentUser();
        const { data, errors: errorsOnGet } = await client.models.UserScore.get({ id: userId });
        if (!data || errorsOnGet) {
            const { errors: errorsOnCreate } = await client.models.UserScore.create({ id: userId, score });
            if (errorsOnCreate) throw errorsOnCreate;
        }
        else {
            const { errors: errorsOnUpdate } = await client.models.UserScore.update({ id: userId, score });
            if (errorsOnUpdate) throw errorsOnUpdate;
        }
    }
    catch (e) {
        console.log(e);
        throw e;
    }
};

const useServerData = () => {

    return {
        fetchUserScore,
        saveUserScore
    };
};

export default useServerData;