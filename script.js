const readline = require('readline');

// --- Função da Cifra de César ---
function caesarCipherASCII(text, key, mode) {
    // A validação interna da função já espera que 'key' seja um inteiro.
    // A validação da entrada do usuário deve garantir isso antes de chamar esta função.
    if (typeof text !== 'string' || !Number.isInteger(key)) {
        throw new Error("Entrada inválida para caesarCipherASCII: texto deve ser string e chave deve ser inteiro.");
    }

    let result = '';
    const shift = mode === 'encode' ? key : -key;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const originalCharCode = char.charCodeAt(0);

        // Verifica se é uma letra maiúscula (A-Z)
        if (originalCharCode >= 65 && originalCharCode <= 90) {
            let newCharCode = 65 + ( (originalCharCode - 65 + shift) % 26 + 26 ) % 26;
            result += String.fromCharCode(newCharCode);

        // Verifica se é uma letra minúscula (a-z)
        } else if (originalCharCode >= 97 && originalCharCode <= 122) {
            let newCharCode = 97 + ( (originalCharCode - 97 + shift) % 26 + 26 ) % 26;
            result += String.fromCharCode(newCharCode);

        } else {
            result += char;
        }
    }

    return result;
}

// --- Interface de Linha de Comando ---

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function displayHeader() {
    console.log("\n=========================================================");
    console.log("      <<< C R I P T O G R A F I A   D E   C E S A R >>>");
    console.log("=========================================================");
    console.log("      Um algoritmo clássico para codificar mensagens!");
    console.log("---------------------------------------------------------");
    console.log(" REGRAS:");
    console.log("   - Texto: Apenas letras (A-Z, a-z) e espaços.");
    console.log("   - Chave: Número inteiro entre -25 e 25 (sem decimais)."); // Regra atualizada
    console.log("---------------------------------------------------------\n");
}

function displayError(message) {
    const separatorLine = "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";

    console.log("\n");
    console.log(separatorLine);
    console.log("                    >>>   E R R O   <<<");
    console.log("\n   [Problema]: " + message);
    console.log("\n" + separatorLine);
    console.log();
}

function displayResult(mode, key, originalText, processedText) {
     console.log("\n----------<<< ✨ RESULTADO ✨ >>----------");
     console.log(`   Operação Escolhida: ${mode}`);
     console.log(`   Chave Utilizada:    ${key}`);
     console.log("   ........................................");
     console.log(`   Texto Original:     ${originalText}`);
     console.log(`   Texto Processado:   ${processedText}`);
     console.log("------------------------------------------\n");
}

// --- Execução da Interface ---

displayHeader();

console.log("--- [ PASSO 1: Operação ] ---");
rl.question("   > Escolha (encode/decode): ", (mode) => {
    mode = mode.trim().toLowerCase();
    if (mode !== 'encode' && mode !== 'decode') {
        displayError('Operação inválida. Escolha "encode" ou "decode".');
        rl.close();
        process.exit(1);
        return;
    }
    console.log("   OK.\n");

    console.log("--- [ PASSO 2: Texto ] ---");
    rl.question("   > Digite o texto: ", (text) => {
        const containsNumbers = /\d/.test(text);
        // Verifica se há algo que NÃO seja letra ou espaço.
        const containsSymbols = /[^a-zA-Z\s]/.test(text);

        if (containsNumbers || containsSymbols) {
            let errorMsg = 'O texto só pode conter letras (a-z, A-Z) e espaços.';
            if (containsNumbers && containsSymbols) {
                errorMsg += ' (Números e símbolos não são permitidos).';
            } else if (containsNumbers) {
                errorMsg += ' (Números não são permitidos).';
            } else if (containsSymbols) {
                errorMsg += ' (Símbolos não são permitidos).';
            }
            displayError(errorMsg);
            rl.close();
            process.exit(1);
            return;
        }
        console.log("   Texto válido.\n");

        console.log("--- [ PASSO 3: Chave ] ---");
        rl.question("   > Digite a chave (-25 a 25): ", (keyInput) => {
            const trimmedKeyInput = keyInput.trim();
            let key; // Variável para armazenar a chave validada

            if (trimmedKeyInput === "") {
                displayError('Chave inválida. A chave não pode ser vazia.');
                rl.close();
                process.exit(1);
                return;
            }

            // Tenta converter a entrada para um número.
            // Number() é mais estrito que parseInt() para strings não numéricas inteiras.
            // Ex: Number("1.3") é 1.3, Number("5x") é NaN.
            const numericAttempt = Number(trimmedKeyInput);

            // Verifica se a conversão resultou em NaN OU se o número não é um inteiro.
            if (isNaN(numericAttempt) || !Number.isInteger(numericAttempt)) {
                displayError('Chave inválida. Deve ser um número inteiro (ex: 3, -5, sem decimais ou letras).');
                rl.close();
                process.exit(1);
                return;
            }

            key = numericAttempt; // Se passou nas validações, 'key' recebe o valor inteiro.

            // Agora verifica o intervalo da chave
            if (key < -25 || key > 25) {
                displayError(`A chave (${key}) está fora do intervalo permitido (-25 a 25).`);
                rl.close();
                process.exit(1);
                return;
            }
            console.log("   Chave válida.\n");

            try {
                console.log("... Calculando resultado ...");
                const calculatedResult = caesarCipherASCII(text, key, mode);

                 displayResult(mode, key, text, calculatedResult);

                rl.close();

            } catch (error) {
                // Este catch é mais para erros inesperados da própria função caesarCipherASCII,
                // já que a validação de tipo da chave é feita antes.
                displayError(`Erro durante o processamento: ${error.message}`);
                rl.close();
                process.exit(1);
            }
        });
    });
});

// Mensagem final
rl.on('close', () => {
    console.log(">> Programa encerrado. <<");
});