export const formatFloatFloor = (value: number, digits = 2): number => Number(`${Math.floor(Number(`${value}e${digits}`))}e-${digits}`);

export const formatFloatRound = (value: number, digits = 2): number => Number(`${Math.round(Number(`${value}e${digits}`))}e-${digits}`);
