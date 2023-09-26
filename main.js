function CPF (cpf) {
    this.cpf = cpf;
    Object.defineProperty(this, 'sanitizedCpf', {
        enumerable: true,
        get: () => cpf.replace(/\D+/g, '')
    })
}

function CreateCPF () {
    CPF.call(this,'')
}

CreateCPF.prototype = Object.create(CPF.prototype);

function CreateCNPJ () {
    CPF.call(this,'')
}

CreateCNPJ.prototype = Object.create(CPF.prototype)

CPF.prototype.validateCpf = function () {
       try {
           if (cpf.sanitizedCpf.length !== 11) {
               throw new Error('Length of CPF is incorrect')
           }

           if(this.isSequence()) {
               throw new Error('CPF must not have contains same numbers')
           }

           const partialCpf = cpf.sanitizedCpf.slice(0, -2);
           const firstDigit = cpf.calculateVerificationDigit(partialCpf);
           const secondDigit = cpf.calculateVerificationDigit(partialCpf + firstDigit);
           const verifiedCpf = `${partialCpf}${firstDigit}${secondDigit}`;

           return verifiedCpf === cpf.sanitizedCpf;
       } catch (e) {
           console.log(e.message)
           return false;
       }
}

CPF.prototype.calculateVerificationDigit = function(cpf) {
    const cpfArray = Array.from(cpf)
    let counter = cpfArray.length + 1;

    const total = cpfArray.reduce((accumulator, currentValue ) => {
        accumulator += (counter * Number(currentValue))
        counter--;
        return accumulator;
    },0)

    const digit = 11 - (total % 11)
    return digit > 9 ? 0 : digit;
}

CPF.prototype.isSequence = function() {
    const sequence = cpf.sanitizedCpf[0].repeat(cpf.sanitizedCpf.length)
    return (sequence === cpf.sanitizedCpf);
}

CreateCPF.prototype.generateCpf = function() {
    const partialCpf = this.generateFirstNineCpfNumbers();
    partialCpf.push(this.calculateVerificationDigit(partialCpf));
    partialCpf.push(this.calculateVerificationDigit(partialCpf));
    return this.CpfMask(partialCpf.toString());
}

CreateCPF.prototype.generateFirstNineCpfNumbers = function() {
    const MAX_COUNTER = 8;
    let cpfArray = [];

    for (i = 0; i <= MAX_COUNTER; i++) {
        cpfArray.push(Math.floor(Math.random() * (9) + 1))
    }

    return cpfArray;
}

CreateCPF.prototype.CpfMask = function(cpf) {
    cpf=cpf.replace(/\D/g,"")
    cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
    return cpf
}

CreateCNPJ.prototype.generateCnpj = function() {
    const partialCnpj = this.generateFirstTwelveCnpjNumbers();
    partialCnpj.push(this.calculateVerificationDigitOneCnpj(partialCnpj));
    partialCnpj.push(this.calculateVerificationDigitTwoCnpj(partialCnpj));
    return this.CnpjMask(partialCnpj.toString());
}

CreateCNPJ.prototype.generateFirstTwelveCnpjNumbers = function() {
    const randomDigits = [...Array(8)].map(() => Math.floor(Math.random() * 10));

    return [...randomDigits, 0, 0, 0, 1];
}

CreateCNPJ.prototype.calculateVerificationDigitOneCnpj = function(cnpj) {
    const cnpjArray = Array.from(cnpj)
    const weight = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const total = cnpjArray.reduce((accumulator, currentValue, index) => {
        accumulator += (currentValue * weight[index])
        return accumulator;
    },0)

    const digit = 11 - (total % 11)
    return digit > 9 ? 0 : digit;
}

CreateCNPJ.prototype.calculateVerificationDigitTwoCnpj = function(cnpj) {
    const cnpjArray = Array.from(cnpj)
    const weight = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const total = cnpjArray.reduce((accumulator, currentValue, index) => {
        accumulator += (currentValue * weight[index])
        return accumulator;
    },0)

    const digit = 11 - (total % 11)
    return digit > 9 ? 0 : digit;
}

CreateCNPJ.prototype.CnpjMask = function(cnpj) {
    cnpj=cnpj.replace(/\D/g,"")
    cnpj=cnpj.replace(/(\d{2})(\d)/,"$1.$2")
    cnpj=cnpj.replace(/(\d{3})(\d)/,"$1.$2")
    cnpj=cnpj.replace(/(\d{3})(\d)/,"$1/$2")
    cnpj=cnpj.replace(/(\d{4})(\d{1,2})$/,"$1-$2")
    return cnpj;
}

const cpf = new CPF('705.484.450-52');
const newCpf = new CreateCPF();
console.log(newCpf.generateCpf());
console.log(newCpf.validateCpf());
const cnpj = new CreateCNPJ();
console.log(cnpj.generateCnpj());
