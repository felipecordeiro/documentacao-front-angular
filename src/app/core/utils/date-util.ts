import { DatePipe } from "@angular/common";
import { StringUtil } from "./string-util";
import * as moment from 'moment';

export abstract class DateUtil {

    static hourInMillis: number = 3600000;
    static dayInMillis: number = 86400000;
    static DOMINGO_NUMBER = 0;
    static SEGUNDA_NUMBER = 1;
    static TERCA_NUMBER = 2;
    static QUARTA_NUMBER = 3;
    static QUINTA_NUMBER = 4;
    static SEXTA_NUMBER = 5;
    static SABADO_NUMBER = 6;

    static semanaNomes = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
    static mesNomes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    static DDMMYYYY = "dd/MM/yyyy";
    static HHMMSS = "hh:mm:ss";
    static DDMMYYYYHHMMSS = "dd/MM/yyyy hh:mm:ss";

    static BR = "BR";
    static US = "US";

    static getToday(): Date {
        return new Date();
    }

    static getTodayInMillis(): number {
        return Date.now();
    }

    static getYesterday(): Date {
        return new Date(this.getTodayInMillis() - this.dayInMillis);
    }

    static getTodayHoursEarlier(hours: number): Date {
        return new Date(this.getTodayInMillis() - (this.hourInMillis * hours));
    }

    static getYesterdayHoursEarlier(hours: number): Date {
        return new Date(this.getTodayInMillis() - this.dayInMillis - (this.hourInMillis * hours));
    }

    static isDiffBetweenBiggerThan(date1: Date, date2: Date, days: number): boolean {
        return this.getDiffInDays(date1, date2) > days;
    }

    static isDiffBetweenLowerThan(date1: Date, date2: Date, days: number): boolean {
        return this.getDiffInDays(date1, date2) < days;
    }

    static isBiggerThan(date1: Date, date2: Date): boolean {
        return date1 > date2;
    }

    static getDiffInDays(date1: Date, date2: Date): number {
        let diff = Math.abs(date1.getTime() - date2.getTime());
        let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        return diffDays;
    }

    static getAddHours(date: Date, hours: number): Date {
        date.setHours(date.getHours() + hours);
        return date;
    }

    static getWeekName(semana: number) {
        return this.semanaNomes[semana];
    }

    static getMonthName(mes: number) {
        return this.mesNomes[mes];
    }

    static getMonthNameByDate(date: Date) {
        if (!date) return null;
        return this.mesNomes[date.getMonth()];
    }

    static getMonthNameAndYear(date: Date) {
        if (!date) return null;
        return this.getMonthNameByDate(date) + ' de ' + date.getFullYear();
    }

    static getFirstDate(date: Date) {
        if (!date) return null;
        return new Date(date.getFullYear(), date.getMonth(), 1);;
    }

    static getLastDate(date: Date) {
        if (!date) return null;
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }

    static addMonth(date, months) {
        if (!date) return null;
        let dateAtualizada = new Date(date);
        let dateString = this.parseToString(dateAtualizada);
        let arrData = dateString.split('/');
        let mesNumber: number = Number(arrData[1]) + months;
        let mesString = StringUtil.leftPad(mesNumber, 2, 0);
        return this.parseToDate(StringUtil.leftPad(arrData[0], 2, 0) + '/' + mesString + '/' + arrData[2]);
    }

    static addYear(date, years) {
        if (!date) return null;
        let dateAtualizada = new Date(date)
        dateAtualizada.setFullYear(date.getFullYear() + years);
        return dateAtualizada;
    }

    static addDay(date, days) {
        if (!date) return null;
        let dateAtualizada = new Date(date)
        dateAtualizada.setDate(date.getDate() + days);
        return dateAtualizada;
    }

    static addSecond(date, seconds){
        if (!date) return null;
        let dateAtualizada = new Date(date)
        dateAtualizada.setSeconds(date.getSeconds() + seconds);
        return dateAtualizada;
    }

    static getZeroTimeDate(date?): Date {
        let dateAtualizada;
        if (date) {
            dateAtualizada = new Date(date)
        } else {
            dateAtualizada = new Date();
        }
        dateAtualizada.setMilliseconds(0);
        dateAtualizada.setSeconds(0);
        dateAtualizada.setMinutes(0);
        dateAtualizada.setHours(0);
        return dateAtualizada;
    }

    static parseToDate(dateString: string, pattern?, locale?) {
        if (!dateString) return null;
        if (!pattern) pattern = this.DDMMYYYY;
        if (!locale) locale = this.BR;
        let dateExclusao = dateString;
        if (locale == this.BR) {
            let str: string;
            if (pattern == this.DDMMYYYY || pattern == this.DDMMYYYYHHMMSS) {
                //str = arrDataExclusao[1] + '-' + arrDataExclusao[0] + '-' + arrDataExclusao[2];
                // alterando o parametro do new Date() pois estava dando "Invalid Date" no iOS

                let partes = dateExclusao.split(' ');
                let data = partes[0].split('/');
                let horario = partes.length > 1 && partes[1] ? partes[1].split(':') : null;

                str = data[2] + "-" + data[1] + "-" + data[0] + "T";
                if (horario){
                    if (horario.length > 2){
                        str += horario[0] + ":" + horario[1] + ":" + horario[2]
                    }
                    else {
                        str += horario[0] + ":" + horario[1]
                    }
                }
                else {
                    str += '00:00'
                }

                //return new Date(str); // estava dando problema no ios dependendo do horário, por conta do timezone
                return moment(str).toDate();
            }
            return new Date(str);
        } else if (locale == this.US) {
            let partes = dateExclusao.split(' ');
            let data = partes[0].split('-');
            let horario = partes.length > 1 && partes[1] ? partes[1].split(':') : null;
            let str = data[0] + "-" + data[1] + "-" + data[2] + "T" + (horario ? horario[0] + ":" + horario[1] : '00:00');
            //return new Date(Number(data[0]), Number(data[1]) - 1, Number(data[2]), Number(horario[0]), Number(horario[1]));
            //return new Date(str);
            return moment(str).toDate();
        }
        return null
    }

    static parseToString(date: Date, pattern?, locale?) {
        if (!date) return null;
        if (!pattern) pattern = this.DDMMYYYY;
        if (!locale) locale = this.BR;
        if (locale == this.BR) {
            let str: string;
            if (pattern == this.DDMMYYYY || pattern == this.DDMMYYYYHHMMSS) {
                str = StringUtil.leftPad(date.getDate(), 2, 0) + '/' + StringUtil.leftPad((date.getMonth() + 1), 2, 0) + '/' + date.getFullYear();
            }
            if (pattern == this.HHMMSS || pattern == this.DDMMYYYYHHMMSS) {
                str = (pattern != this.HHMMSS ? str + ' ' : '') + StringUtil.leftPad(date.getHours(), 2, 0) + ':' + StringUtil.leftPad(date.getMinutes(), 2, 0) + ':' + StringUtil.leftPad(date.getSeconds(), 2, 0)
            }
            return str.trim();
        } else if (locale == this.US) {
            let data = date;
            let day = data.getDate() + "";
            let month = (data.getMonth() + 1) + "";
            let year = data.getFullYear() + "";
            let stringFormatada = year + '-' + StringUtil.leftPad(month, 2, 0) + '-' + StringUtil.leftPad(day, 2, 0);
            if (pattern == this.DDMMYYYYHHMMSS) {
                let hour = data.getHours() + "";
                let minutes = data.getMinutes() + "";
                let seconds = data.getSeconds() + "";
                stringFormatada += 'T' + StringUtil.leftPad(hour, 2, 0) + ':' + StringUtil.leftPad(minutes, 2, 0);
            }
            return stringFormatada;
        }
        return null
    }

    static formatLocale(dateString: string, locale, pattern?) {
        if (!dateString) return null;
        if (!pattern) pattern = this.DDMMYYYY;
        if (locale == this.BR) {
            if (pattern == this.DDMMYYYY) {
                let datePipe = new DatePipe('pt-BR');
                let stringFormatada = datePipe.transform(dateString, pattern);
                return stringFormatada;
            } else if (pattern == this.DDMMYYYYHHMMSS) {
                if (dateString) {
                    let dataStringSplited = dateString.split('T');
                    let stringFormatada = this.formatLocale(dataStringSplited[0], this.BR, this.DDMMYYYY);
                    stringFormatada += " " + dataStringSplited[1] + ":00";
                    return stringFormatada;
                }
            }
        } else if (locale == this.US) {
            let data = this.parseToDate(dateString, pattern);
            let day = data.getDate() + "";
            let month = (data.getMonth() + 1) + "";
            let year = data.getFullYear() + "";
            let stringFormatada = year + '-' + StringUtil.leftPad(month, 2, 0) + '-' + StringUtil.leftPad(day, 2, 0);
            if (pattern == this.DDMMYYYYHHMMSS) {
                let hour = data.getHours() + "";
                let minutes = data.getMinutes() + "";
                let seconds = data.getSeconds() + "";
                stringFormatada += 'T' + StringUtil.leftPad(hour, 2, 0) + ':' + StringUtil.leftPad(minutes, 2, 0);
            }
            return stringFormatada;
        }
    }

}