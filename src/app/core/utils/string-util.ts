export abstract class StringUtil {

    static leftPad(value, totalWidth, paddingChar) {
        var length = totalWidth - value.toString().length + 1;
        return Array(length).join(paddingChar || '0') + value;
    };

    static abreviarNome(nome: string) {
        let nomeArray = nome.split(' ');
        let nomeAbreviado = nomeArray[0];
        let primeiraLetraSegundoNome = ''
        if (nomeArray.length >= 2) {
            primeiraLetraSegundoNome = nomeArray[1]
            primeiraLetraSegundoNome = primeiraLetraSegundoNome.substr(0, 1) + '.';
        }
        return nomeAbreviado + ' ' + primeiraLetraSegundoNome;
    }

    static isTemLetraTexto(texto: string, letra: string) {
        if (texto) {
            if (texto.indexOf(letra) >= 0)
                return true;
            else return false;
        }
    }

    static isTemLetraPrimeiroCaractere(texto: String, letra: string) {
        if (texto) {
            let primeiroChar = texto[0];
            if (primeiroChar === letra)
                return true;
            else return false;
        }
    }

    static query(key, value) {

        if (key && value) {
            return `${key}=${value}`;
        }
        return '';
    }

    static gerarFiltroLabel(label, value) {

        if (label && value) {
            return `${label} ${value}`;
        }
        return '';
    }

    static transformarParaValorMonetario(valor: string) {
        if (valor.includes(",")) {
            let arrValor = valor.split(',');
            if (arrValor[1].length == 1) {
                return valor + '0';
            }
        } else {
            return valor + ',00';
        }
        return valor;
    }

    static formatarNumeroValorMonetario(valor: number, casasDecimais = 2, simboloReal = false) {
        if (valor) {
            if (!simboloReal) {
                return valor.toFixed(casasDecimais).replace('.', ',');
            }
            return ("R$ " + valor.toFixed(casasDecimais)).replace('.', ',');
        }
        return null;
    }

    static converterStringToDecimal(value: string) {
        return value ? parseFloat(StringUtil.transformarVirgulaParaPonto(value)) : value;
    }

    static transformarVirgulaParaPonto(param: any) {
        let base = param;
        let re = /\,/gi;
        return base.replace(re, ".");
    }

    static transformarPontoParaVirgula(param: any) {
        let base = param;
        let re = /\./gi;
        return base.replace(re, ",");
    }

    static gerarQueryFiltro(filtro: any) {
        let queryString = "?";
        if (filtro) {
            Object.keys(filtro).forEach(function (item) {
                let objeto = filtro[item];
                if (objeto instanceof Object) {
                    Object.keys(objeto).forEach(function (obj) {
                        let parametro = StringUtil.query(obj, objeto[obj]);
                        if (parametro) {
                            queryString = queryString.concat(parametro).concat("&");
                        }
                    });
                } else {
                    let parametro = StringUtil.query(item, filtro[item]);
                    if (parametro) {
                        queryString = queryString.concat(parametro).concat("&");
                    }
                }
            });
        }
        return queryString;
    }

    static isNumber(texto: string) {
        // Expressão regular para verificar números nos formatos:
        // +dddddd | -dddddd |
        //  ddddd.dddddd... | dddddd,dddd... | .ddddddd...... 
        //  ,dddddd... | +dddddd.ddddddd... | -dddd.dddddd....
        // +.dddddd...... | -,ddddddd......
        let er = /^[0-9]*\,[0-9]+$|^[0-9]*\.[0-9]+$|^[0-9]+$|^[+-][0-9]+$|^[+-][0-9]*\.[0-9]+$|^[+-][0-9]*\,[0-9]+$/
        return (er.test(texto.replace(/\s/g, '')));
    }

    static toNumber(texto: string): number {
        // Remove espaços da string
        let texto_sem_espaco: string = texto.replace(/\s/g, '')

        // Verifica se é número e se não for, dispara um erro.
        if (!this.isNumber(texto_sem_espaco)) {
            throw Error(`Não é um número: ${texto}`)
        }

        // Verifica pela vírgula
        if (texto_sem_espaco.includes(',')) {
            // Troca "," por "."
            texto_sem_espaco = this.transformarVirgulaParaPonto(texto_sem_espaco)
        }

        // Retorna o número convertido
        return Number(texto_sem_espaco)
    }

    static replaceAll(find, replace, str) {
        while (str.indexOf(find) > -1) {
            str = str.replace(find, replace);
        }
        return str;
    }

    static isCampoMinMaiorIgualCampoMax(campoMin: any, campoMax: any) {
        return campoMin && campoMax &&
            StringUtil.toNumber(campoMin.toString()) >= StringUtil.toNumber(campoMax.toString())
    }
    
    static isCampoMinMaiorCampoMax(campoMin: any, campoMax: any) {
        return campoMin && campoMax &&
            StringUtil.toNumber(campoMin.toString()) > StringUtil.toNumber(campoMax.toString())
    }

    static isArraysIguais(a, b) {
        a = Array.isArray(a) ? a : [];
        b = Array.isArray(b) ? b : [];
        return a.length === b.length && a.every(el => b.includes(el));
    }

}