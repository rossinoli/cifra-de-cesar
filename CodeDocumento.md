# Documentação do Código: Criptografia de César via Terminal (Node.js)

Este documento descreve o funcionamento interno do script `cifra_cesar.js`, que implementa a Cifra de César por meio de uma interface de linha de comando (CLI) em Node.js.

## Sumário

1.  [Visão Geral](#1-visão-geral)
2.  [Dependências](#2-dependências)
3.  [Função Principal de Criptografia (`caesarCipherASCII`)](#3-função-principal-de-criptografia-caesarcipherascii)
    *   [Parâmetros](#parâmetros)
    *   [Validação de Entrada](#validação-de-entrada)
    *   [Lógica de Deslocamento (Shift)](#lógica-de-deslocamento-shift)
    *   [Iteração e Processamento de Caracteres](#iteração-e-processamento-de-caracteres)
    *   [Retorno](#retorno)
4.  [Interface de Linha de Comando (CLI)](#4-interface-de-linha-de-comando-cli)
    *   [Configuração do `readline`](#configuração-do-readline)
    *   [Funções Auxiliares de Exibição](#funções-auxiliares-de-exibição)
        *   [`displayHeader()`](#displayheader)
        *   [`displayError(message)`](#displayerrormessage)
        *   [`displayResult(mode, key, originalText, processedText)`](#displayresultmode-key-originaltext-processedtext)
    *   [Fluxo Principal de Execução (Interação com Usuário)](#fluxo-principal-de-execução-interação-com-usuário)
        *   [Passo 1: Escolha da Operação](#passo-1-escolha-da-operação)
        *   [Passo 2: Entrada do Texto](#passo-2-entrada-do-texto)
        *   [Passo 3: Entrada da Chave](#passo-3-entrada-da-chave)
        *   [Processamento e Exibição do Resultado](#processamento-e-exibição-do-resultado)
    *   [Encerramento do Programa](#encerramento-do-programa)

---

## 1. Visão Geral

O script é dividido em duas partes principais:
*   A lógica de criptografia/descriptografia da Cifra de César.
*   A interface de usuário no terminal para coletar entradas e exibir resultados.

## 2. Dependências

O script utiliza apenas um módulo nativo do Node.js:

*   **`readline`**: Módulo usado para criar uma interface de leitura de dados a partir de um stream de entrada (como `process.stdin`) linha por linha. Essencial para a interatividade no terminal.

```javascript
const readline = require('readline');
Use code with caution.
Markdown
3. Função Principal de Criptografia (caesarCipherASCII)
Esta função é o coração do algoritmo da Cifra de César.

function caesarCipherASCII(text, key, mode) {
    // ... implementação ...
}
Use code with caution.
JavaScript
Parâmetros
text (String): O texto a ser codificado ou decodificado.

key (Integer): O número de posições para deslocar cada letra. Pode ser positivo (para codificar "para frente") ou negativo.

mode (String): Define a operação a ser realizada.

'encode': Para codificar o texto.

'decode': Para decodificar o texto.

Validação de Entrada
No início da função, há uma verificação básica para garantir que os tipos de text e key sejam os esperados.

if (typeof text !== 'string' || !Number.isInteger(key)) {
    throw new Error("Entrada inválida para caesarCipherASCII: texto deve ser string e chave deve ser inteiro.");
}
Use code with caution.
JavaScript
Isso ajuda a prevenir erros inesperados durante o processamento se a função for chamada com tipos de dados incorretos.

Lógica de Deslocamento (Shift)
A variável shift determina o valor real do deslocamento a ser aplicado.
Se o mode for 'decode', o shift é o negativo da key fornecida, efetivamente revertendo a operação de codificação.

const shift = mode === 'encode' ? key : -key;
Use code with caution.
JavaScript
Iteração e Processamento de Caracteres
A função itera sobre cada caractere do text de entrada.

for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const originalCharCode = char.charCodeAt(0); // Obtém o código ASCII do caractere
    // ... lógica de cifragem ...
}
Use code with caution.
JavaScript
Para cada caractere:

Verifica se é uma Letra Maiúscula (A-Z):

Os códigos ASCII para A-Z vão de 65 a 90.

Se for maiúscula, o cálculo do novo código do caractere é:

let newCharCode = 65 + ( (originalCharCode - 65 + shift) % 26 + 26 ) % 26;
Use code with caution.
JavaScript
originalCharCode - 65: Normaliza o caractere para uma base 0 (A=0, B=1, ...).

+ shift: Aplica o deslocamento.

% 26: Garante que o resultado "gire" ao redor do alfabeto (26 letras).

+ 26 ) % 26: Esta é uma técnica para garantir que o resultado do módulo seja sempre positivo, mesmo que (originalCharCode - 65 + shift) seja negativo (acontece ao decodificar com chaves negativas ou ao codificar com grandes chaves negativas).

+ 65: Converte de volta para o intervalo ASCII das letras maiúsculas.

Verifica se é uma Letra Minúscula (a-z):

Os códigos ASCII para a-z vão de 97 a 122.

A lógica é análoga à das letras maiúsculas, mas usando 97 como base.

let newCharCode = 97 + ( (originalCharCode - 97 + shift) % 26 + 26 ) % 26;
Use code with caution.
JavaScript
Outros Caracteres:

Se o caractere não for uma letra maiúscula nem minúscula (ex: espaços, pontuação, números), ele é adicionado ao resultado sem modificação.

} else {
    result += char;
}
Use code with caution.
JavaScript
Observação: A validação de entrada na interface do usuário atualmente restringe o texto a apenas letras e espaços, então esta cláusula else primariamente lidaria com espaços.

Retorno
A função retorna a string result, que contém o texto processado (codificado ou decodificado).

return result;
Use code with caution.
JavaScript
4. Interface de Linha de Comando (CLI)
Esta seção do código gerencia a interação com o usuário no terminal.

Configuração do readline
Uma instância do readline.Interface é criada para ler a entrada do usuário (process.stdin) e escrever a saída (process.stdout).

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
Use code with caution.
JavaScript
Funções Auxiliares de Exibição
Existem três funções para formatar e exibir informações no console:

displayHeader()
Exibe um cabeçalho de boas-vindas, o nome do algoritmo e as regras básicas de entrada.

function displayHeader() {
    console.log("\n=========================================================");
    // ... mais console.log para formatação ...
    console.log("---------------------------------------------------------\n");
}
Use code with caution.
JavaScript
displayError(message)
Exibe uma mensagem de erro formatada de forma destacada, facilitando a identificação de problemas pelo usuário.

function displayError(message) {
    const separatorLine = "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";
    // ... mais console.log para formatação ...
    console.log("\n" + separatorLine);
}
Use code with caution.
JavaScript
displayResult(mode, key, originalText, processedText)
Exibe o resultado da operação de forma clara, mostrando a operação escolhida, a chave utilizada, o texto original e o texto processado.

function displayResult(mode, key, originalText, processedText) {
     console.log("\n----------<<< ✨ RESULTADO ✨ >>----------");
     // ... mais console.log para formatação ...
     console.log("------------------------------------------\n");
}
Use code with caution.
JavaScript
Fluxo Principal de Execução (Interação com Usuário)
O programa começa exibindo o cabeçalho e, em seguida, usa uma série de chamadas aninhadas a rl.question() para coletar as informações do usuário de forma sequencial e assíncrona.

displayHeader();

console.log("--- [ PASSO 1: Operação ] ---");
rl.question("   > Escolha (encode/decode): ", (mode) => {
    // ... Lógica para PASSO 1 ...
    rl.question("   > Digite o texto: ", (text) => {
        // ... Lógica para PASSO 2 ...
        rl.question("   > Digite a chave (-25 a 25): ", (keyInput) => {
            // ... Lógica para PASSO 3 e processamento final ...
        });
    });
});
Use code with caution.
JavaScript
Passo 1: Escolha da Operação
Prompt: Pede ao usuário para escolher entre encode ou decode.

Entrada: A string mode é lida.

Validação:

mode.trim().toLowerCase(): Remove espaços extras e converte para minúsculas para uma comparação insensível a maiúsculas/minúsculas.

Verifica se mode é estritamente 'encode' ou 'decode'.

Se inválido: displayError() é chamada, rl.close() encerra a interface readline, e process.exit(1) termina o script com um código de erro.

Passo 2: Entrada do Texto
Prompt: Pede ao usuário para digitar o texto.

Entrada: A string text é lida.

Validação:

/\d/.test(text): Testa se a string contém algum dígito numérico.

/[^a-zA-Z\s]/.test(text): Testa se a string contém qualquer caractere que NÃO seja uma letra (maiúscula ou minúscula) ou um espaço.

Se inválido (contém números ou símbolos): displayError() é chamada com uma mensagem específica, rl.close() e process.exit(1).

Passo 3: Entrada da Chave
Prompt: Pede ao usuário para digitar a chave (um número entre -25 e 25).

Entrada: A string keyInput é lida.

Validação:

parseInt(keyInput.trim(), 10): Converte a entrada para um número inteiro (base 10) após remover espaços.

isNaN(key): Verifica se a conversão resultou em NaN (Not-a-Number), indicando entrada não numérica.

key < -25 || key > 25: Verifica se a chave está fora do intervalo permitido.

Se inválido: displayError(), rl.close() e process.exit(1).

Processamento e Exibição do Resultado
Se todas as entradas forem válidas:

Uma mensagem "Calculando resultado..." é exibida.

Um bloco try...catch é usado para executar a função caesarCipherASCII e lidar com quaisquer erros potenciais que possam ocorrer dentro dela (embora a validação atual da função seja simples, isso é uma boa prática).

try {
    const calculatedResult = caesarCipherASCII(text, key, mode);
    displayResult(mode, key, text, calculatedResult); // Exibe o resultado formatado
    rl.close(); // Encerra a interface readline, pois a tarefa está concluída
} catch (error) {
    displayError(`Erro durante o processamento: ${error.message}`);
    rl.close();
    process.exit(1);
}
Use code with caution.
JavaScript
Encerramento do Programa
Um ouvinte de evento é configurado para o evento 'close' da interface readline. Este evento é disparado quando rl.close() é chamado.

rl.on('close', () => {
    console.log(">> Programa encerrado. <<");
});
Use code with caution.
JavaScript
Isso garante que uma mensagem final de encerramento seja exibida quando o programa termina, seja por conclusão bem-sucedida ou após um erro que levou ao fechamento da interface.

process.exit(1) (usado nos blocos de erro) força o término imediato do processo Node.js com um código de status que indica falha. Se o programa chega ao rl.close() após uma execução bem-sucedida, ele terminará naturalmente com um código de status 0 (sucesso) após o evento 'close' ser processado.