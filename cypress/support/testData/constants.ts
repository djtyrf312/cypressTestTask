export const callFormFieldIds = {
    callType: '#call-type',
    phoneNumber: '#phone-number',
    callResult: '#call-result',
    resultType: '#result-type',
    callReason: '#call-reason',
};

export function generateRandomString(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}