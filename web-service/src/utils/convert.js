export const convertSecondToTime = (secondsInit) => {
    let minutesProcess = Math.floor(secondsInit / 60);
    let secondsProcess = Math.floor(secondsInit % 60);
    return {
        minutes: minutesProcess < 10 ? '0' + minutesProcess : minutesProcess,
        seconds: secondsProcess < 10 ? '0' + secondsProcess : secondsProcess
    }
}