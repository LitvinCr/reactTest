import { moviesService } from '../services';

const fetchData = () => {
    return moviesService.getPopular()
        .then((res) => res.json().results)
        // Returning [] as a placeholder now so it does not error out when this service
        // fails. We should be handling this in our DISPATCH_REQUEST_FAILURE
        .catch(() => []);
};

export default fetchData;

