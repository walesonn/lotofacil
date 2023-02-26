export const info = `Este algorítmo ajudará você a gerar jogos da lotofácil de 15 números cada.\n
Deseja continuar? \nTecle [1] SIM\nTecle [2] NÃO\n?:`

export function drawHeader(): void {
    console.log("\x1b[36m=======================\x1b[0m")
    console.log('\x1b[36m= Lotofácil generator =\x1b[0m');
    console.log("\x1b[36m=======================\x1b[0m")
}

export function drawBoardNumbers(excluded: number[] = []): void {
    let count = 1;
    let board: number[] = [];
    for (let column = 1; column <= 5; column++) {
        for (let row = 1; row <= 5; row++) {
            if (count < 10) {
                process.stdout.write(`${excluded.includes(count) ? '\x1b[31m' : '\x1b[32m'}[0${count}]\x1b[0m`)
            } else {
                process.stdout.write(`${excluded.includes(count) ? '\x1b[31m' : '\x1b[32m'}[${count}]\x1b[0m`)
            }
            board.push(count)
            count++
        }
        console.log('')
    }
}

export function isValidNumbers(numbers: number[]) {
    const max = 25;
    const min = 1;
    for (let num of numbers) {
        if (num > max || num < min) {
            return false
        }
    }
    return true
}

export function drawErrorInfo(message: string) {
    console.log(`\x1b[31m${message}\x1b[0m`)
}

export function randomNumbers(numbers: number[]): number[] {
    const rendered: number[] = [];
    const board = boardNumbers(1, 25)

    while (rendered.length < 15) {
        const currentNumberRandom = Math.floor(Math.random() * (board[board.length - 1] - board[0] + 1) + board[0])
        if (!rendered.includes(currentNumberRandom) && !numbers.includes(currentNumberRandom)) {
            rendered.push(currentNumberRandom);
        }
    }
    return rendered
}

export function boardNumbers(init: number, finish: number): number[] {
    if (init > finish || init === finish) {
        throw new Error('Range de números do jogo é inválido')
    }

    const boardNumbers: number[] = []
    let min = init;

    while (min <= finish) {
        boardNumbers.push(min);
        min++
    }

    return boardNumbers
}