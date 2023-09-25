function CPF (cpf) {
    this.cpf = cpf;
    Object.defineProperty(this, 'sanitizedCpf', {
        enumerable: true,
        get: () => cpf.replace(/\D+/g, '')
    })
}

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

CPF.prototype.calculateVerificationDigit = (cpf) => {
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

CPF.prototype.isSequence = () => {
    const sequence = cpf.sanitizedCpf[0].repeat(cpf.sanitizedCpf.length)
    return (sequence === cpf.sanitizedCpf);
}

const cpf = new CPF('705.484.450-52');
console.log(cpf.validateCpf());





