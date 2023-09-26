# CPF/CNPJ Validation/Generator Code

This is a simple code to study and understand how to validate and Create Brazilian CPF (Cadastro de Pessoas Físicas) numbers. It's intended for educational purposes to help understand the validation process.

## How CPF/CNPJ Validation Works

The Brazilian CPF/CNPJ is a unique identifier for individuals/companys. It consists of 11/14 digits in the format `XXX.XXX.XXX-XX`/`XX.XXX.XXX/XXXX-XX`. This code checks if a given CPF/CNPJ number is valid according to the CPF/CNPJ algorithm.

## Usage

1. Clone the repository:
```bash 
git clone https://github.com/pedrohenriquebl/cpf-validation.git
```
2. Navigate to the directory and create an new instance of the CPF with the current number:
```bash
const cpf = new CPF('705.484.450-52');
console.log(cpf.validateCpf());
```
3. Creating CPF
``` bash
const newCpf = new CreateCPF();
console.log(newCpf.generateCpf());
console.log(newCpf.validateCpf()) verify if its a valid CPF generated number;
``

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Create a pull request

## Acknowledgments

- The CPF validation algorithm used in this code is based on [specifications provided by the Brazilian government](https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/cadastros/cadastro-de-pessoas-fisicas-cpf).
