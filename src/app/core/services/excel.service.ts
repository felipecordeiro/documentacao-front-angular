import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { DateUtil } from '../utils/date-util';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
    providedIn: 'root'
})
export class ExcelService {

    constructor() { }

    public exportarExcel(data: any[], headers: { header?: string, property?: string }[], excelFileName: string, datePatternXlsx: 'dd/MM/yyyy' | 'dd/MM/yyyy hh:mm:ss'): void {

        if (headers && headers.length > 0) {
            let newData: any[] = data.map(item => {
                let obj: any = {}
                headers.forEach(headerItem => {
                    if (headerItem['header'] && headerItem['property'])
                        obj[headerItem['header']] = item[headerItem['property']]
                })
                return obj
            })
            const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(newData,
                { cellDates: true, dateNF: datePatternXlsx ? datePatternXlsx : DateUtil.DDMMYYYYHHMMSS });
            const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.salvarExcel(excelBuffer, excelFileName);
        } else {
            const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
            const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.salvarExcel(excelBuffer, excelFileName);
        }

    }

    private salvarExcel(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
        FileSaver.saveAs(data, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
    }
}