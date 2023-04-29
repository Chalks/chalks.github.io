export default (e) => {
    if (e.data && e.data.errors) {
        const errorSet = new Set(e.data.errors.map(({msg}) => msg));
        return Array.from(errorSet);
    }

    if (e.data && e.data.message) {
        return [e.data.message];
    }

    return ['Unknown error, try again'];
};

