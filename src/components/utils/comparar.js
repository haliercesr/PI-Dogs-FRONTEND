const comparar = (a, b, campo) => {
    if (campo === 'name') {
        if (a[campo] < b[campo]) return -1;
        if (a[campo] > b[campo]) return 1;

        return a.id - b.id;
    }

    if (campo === 'weight') {
        if (a[campo].metric[0] < b[campo].metric[0]) return -1;
        if (a[campo].metric[0] > b[campo].metric[0]) return 1;

        return a.id - b.id;
    }
}

module.exports = { comparar }