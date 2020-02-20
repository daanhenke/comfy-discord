export const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds))

export const sleepWhile = async (expression, ms_between_tries = 50) =>
{
    let result

    do
    {
        result = expression()
        if (! result) return
        await sleep(ms_between_tries)
    }
    while (true)
}