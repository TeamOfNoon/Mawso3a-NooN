// Sorting utilities
function getPartition(a_aRows, i, j, a_funcComp, a_funcSwap) {
    var pivot = a_aRows[i];
    while (i < j) {
        while (i < j && a_funcComp(pivot, a_aRows[j]))
            j--;
        if (i < j)
            a_funcSwap(a_aRows, i++, a_aRows[j]);
        while (i < j && a_funcComp(a_aRows[i], pivot))
            i++;
        if (i < j)
            a_funcSwap(a_aRows, j--, a_aRows[i]);
    }
    a_funcSwap(a_aRows, i, pivot);
    return i;
}

function quickSort(a_aRows, a_nLow, a_nHigh, a_funcComp, a_funcSwap) {
    if (a_nLow < a_nHigh) {
        var nPivotpos = getPartition(a_aRows, a_nLow, a_nHigh, a_funcComp, a_funcSwap);
        quickSort(a_aRows, a_nLow, nPivotpos - 1, a_funcComp, a_funcSwap);
        quickSort(a_aRows, nPivotpos + 1, a_nHigh, a_funcComp, a_funcSwap);
    }
}