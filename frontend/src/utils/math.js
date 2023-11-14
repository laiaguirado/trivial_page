export const getRandomNum = (max) => {
    const num = Math.floor(Math.random() * (max) + 1);
    return num;
}

export const getRandomNumAndSkipRepeat = (max, listOmitir) => {
    if (listOmitir.length === max + 1) {
        return 0;
    } else {
        let random = getRandomNum(max);
        while (listOmitir.includes(random)) {
            random = getRandomNum(max);
        }
        return random;
    }
}