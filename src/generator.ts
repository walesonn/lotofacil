import * as readline from "readline"
import { drawBoardNumbers, drawErrorInfo, drawHeader, info, isValidNumbers, randomNumbers } from "./helpers";

drawHeader();

const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let excluded: number[] = []

prompt.question(info, (option: string) => {
    if (option != '1') {
        prompt.close()
    } else {
        drawBoardNumbers();
        console.log('Ok! Vamos lá! Selecione 7 números que você acredita que não serão sorteados?:')
    }
})

prompt.on('line', (input: string) => {
    const chooseNumber = Number(input.toString())
    if (!Number.isInteger(chooseNumber)) {
        drawErrorInfo('Por favor selecione apenas números')
    } else {
        if (chooseNumber < 1 || chooseNumber > 25) {
            drawErrorInfo('Por favor selecione apenas números que aparecem no quadro.')
        } else {
            if (!excluded.includes(chooseNumber)) {
                excluded.push(Number(input.toString()))
            }
            drawHeader();
            drawBoardNumbers(excluded)
        }
    }

    if (excluded.length === 7) {
        console.log('aguarde...');
        setTimeout(() => {
            process.stdout.write(randomNumbers(excluded).join())
            prompt.close()
        }, 5000)
    } else {
        process.stdout.write('?:')
    }
})