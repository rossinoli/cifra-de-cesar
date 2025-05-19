# Criptografia de César via Terminal
 * Uma ferramenta CLI para codificar e decodificar mensagens.

## Descrição:
Este projeto é uma aplicação de linha de comando (CLI) desenvolvida em Node.js que implementa a Cifra de César, um algoritmo clássico de criptografia. O sistema permite ao usuário codificar (criptografar) ou decodificar (descriptografar) mensagens de texto diretamente no terminal, de forma interativa.

### Público-alvo
Estudantes de programação, entusiastas de criptografia, desenvolvedores que buscam um exemplo simples de CLI em Node.js, ou qualquer pessoa interessada em aprender sobre a Cifra de César.

### Funcionalidades
*   **Codificação (Encode):** Transforma um texto legível em um texto cifrado usando uma chave numérica.
*   **Decodificação (Decode):** Reverte um texto cifrado para o texto original usando a mesma chave numérica.
*   **Interface Interativa:** Guia o usuário através de prompts para entrada de modo, texto e chave.
*   **Validação de Entrada:** Verifica se o texto contém apenas letras e espaços, e se a chave está dentro do intervalo permitido (-25 a 25).
*   **Feedback Visual:** Apresenta cabeçalhos, mensagens de erro formatadas e resultados claros.

### Tecnologias Utilizadas:
 * Node.js
 * Módulo `readline` (para interface de linha de comando)
 * JavaScript (ES6+)

#### Instalação e Execução:
1.  **Pré-requisitos:** Certifique-se de ter o Node.js instalado em seu sistema. Você pode baixá-lo em [https://nodejs.org/](https://nodejs.org/).
2.  **Salve o Código:** Copie o código fornecido e salve-o em um arquivo com a extensão `.js` (por exemplo, `cifra_cesar.js`).
3.  **Abra o Terminal:** Navegue até o diretório onde você salvou o arquivo usando o seu terminal ou prompt de comando.
4.  **Execute o Script:** Digite o seguinte comando e pressione Enter:
    ```bash
    node cifra_cesar.js
    ```
    (Substitua `cifra_cesar.js` pelo nome que você deu ao arquivo).

##### Como Usar:
Após executar o script, o programa guiará você por três passos:
1.  **Escolha da Operação:**
    *   Digite `encode` para criptografar o texto.
    *   Digite `decode` para descriptografar o texto.
    *   Exemplo: `encode`
2.  **Entrada do Texto:**
    *   Digite a mensagem que deseja processar.
    *   **Regra:** Apenas letras (a-z, A-Z) e espaços são permitidos.
    *   Exemplo: `Ola Mundo`
3.  **Entrada da Chave:**
    *   Digite um número inteiro entre -25 e 25. Esta chave será usada para deslocar as letras.
    *   Exemplo: `3`

O programa então exibirá o resultado da operação. Se alguma entrada for inválida, uma mensagem de erro será mostrada.

<p align="center">
  <!-- Exemplo de como seria a interação (texto):
  =========================================================
        <<< C R I P T O G R A F I A   D E   C E S A R >>>
  =========================================================
        Um algoritmo clássico para codificar mensagens!
  ---------------------------------------------------------
   REGRAS:
     - Texto: Apenas letras (A-Z, a-z) e espaços.
     - Chave: Número inteiro entre -25 e 25.
  ---------------------------------------------------------

  --- [ PASSO 1: Operação ] ---
     > Escolha (encode/decode): encode
     OK.

  --- [ PASSO 2: Texto ] ---
     > Digite o texto: Hello World
     Texto válido.

  --- [ PASSO 3: Chave ] ---
     > Digite a chave (-25 a 25): 3
     Chave válida.

  ... Calculando resultado ...

  ----------<<< ✨ RESULTADO ✨ >>----------
     Operação Escolhida: encode
     Chave Utilizada:    3
     ........................................
     Texto Original:     Hello World
     Texto Processado:   Khoor Zruog
  ------------------------------------------

  >> Programa encerrado. <<
  -->
</p>

### Estrutura do Código (Principais Componentes):
*   **`caesarCipherASCII(text, key, mode)`:** Função principal que realiza a Cifra de César. Lida com letras maiúsculas, minúsculas e mantém outros caracteres (embora a validação de entrada atual restrinja a apenas letras e espaços).
*   **Interface de Linha de Comando (`readline`):**
    *   `displayHeader()`: Mostra o cabeçalho de boas-vindas e regras do programa.
    *   `displayError(message)`: Formata e exibe mensagens de erro de forma destacada.
    *   `displayResult(mode, key, originalText, processedText)`: Formata e exibe o resultado da operação de codificação/decodificação.
    *   **Lógica de `rl.question`:** Coleta interativamente as entradas do usuário (modo, texto, chave), realiza validações e gerencia o fluxo do programa.

### Autores
*   [Thaina L. Rossinoli] - Desenvolvedora do script de Cifra de César.

### Observações e Melhorias Futuras:
*   **Suporte a Caracteres Especiais e Números:** Atualmente, o sistema só aceita letras e espaços conforme as regras. Poderia ser estendido para lidar com uma gama maior de caracteres do padrão ASCII, decidindo como tratá-los (ignorar, cifrar com base no código ASCII, etc.).
*   **Tratamento de Erros Mais Granular:** Melhorar o tratamento de exceções internas na função `caesarCipherASCII`.
*   **Testes Unitários:** Implementar testes para garantir a corretude da função de cifra.

### Licença
Este projeto é licenciado sob a licença MIT.