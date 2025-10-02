const names = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]
export const index = ref(-1);
export const set = (n: number) => index.value = n
export const inc = () => index.value = (index.value + 1) % 12
export const dec = () => index.value = (index.value + 11) % 12
export const name = computed(() => names[index.value])