const readline = require('readline');

function caesarASCII(text, key, mode) {
    if (typeof text !== 'string' || !Number.isInteger(key)) {
        throw new Error("Entrada inválida: texto deve ser string e chave deve ser inteiro.");
    }

    let result = '';
    const shift = mode === 'encode' ? key : -key;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const originalCharCode = char.charCodeAt(0);
        const newCharCode = originalCharCode + shift;
        const newChar = String.fromCharCode(newCharCode);
        result += newChar;
    }

    return result;
}

// --- Interface de Linha de Comando ---

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("***************************************************");
console.log("--- Criptografia de César (Baseada em ASCII) ---");
console.log("***************************************************");
console.log("Nota: O usuário é responsável por escolher, lembrar e");
console.log("      proteger a chave secreta.");
console.log(); 


console.log("--- Por favor, forneça os dados ---");


rl.question('1. Escolha a operação (encode/decode): ', (mode) => {
    mode = mode.trim().toLowerCase(); 
    if (mode !== 'encode' && mode !== 'decode') {
        console.error('\nErro: Operação inválida. Escolha "encode" ou "decode".');
        rl.close();
        return;
    }
    console.log(); 

    rl.question('2. Digite o texto a ser processado: ', (text) => {
        console.log(); 

        rl.question('3. Digite a chave (número inteiro para deslocamento): ', (keyInput) => {
            const key = parseInt(keyInput.trim(), 10); 

            if (isNaN(key)) {
                console.error('\nErro: Chave inválida. Deve ser um número inteiro.');
                rl.close();
                return;
            }

            try {
                const processedText = caesarASCII(text, key, mode);

                console.log("\n-------------------- Resultado --------------------"); 
                console.log(`> Operação Escolhida: ${mode}`);
                console.log(`> Chave Utilizada:    ${key}`);
                console.log(`> Texto Original:     ${text}`);
                console.log(`> Texto Processado:   ${processedText}`);
                console.log("---------------------------------------------------"); 

            } catch (error) {
                console.error(`\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);
                console.error(`!!! Erro ao processar: ${error.message}`);
                console.error(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);
            } finally {
                rl.close();
            }
        });
    });
});


rl.on('close', () => {
    console.log('\nPrograma encerrado.');
    process.exit(0);
});


