import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../core/services/excel.service';
import { DateUtil } from '../core/utils/date-util';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.scss']
})
export class ExcelComponent implements OnInit {

  listaExcel = [
    { attrA: 'ffff', attrB: '1,32', attrD: '26/06/2022', attrE: '2345', attrF: '1243.54', attrG: '][;?/112ddsc1', attrH: '0,3 - 8' },
    { attrA: 'ddd', attrB: '1,82', attrD: '27/06/2022', attrE: '112', attrF: '454', attrG: '$][;?/112ddsc1', attrH: '0,5 - 8' },
    { attrA: null, attrB: null, attrD: null, attrE: null, attrF: null, attrG: null, attrH: null },
    { attrA: 'jjjj9', attrB: '1,54', attrD: '26/06/2022', attrE: '678865', attrF: '121335', attrG: '@][;?/112ddsc1', attrH: '2,3 - 4' },
    { attrA: 'ttt', attrB: '1,34', attrD: '11/07/2022', attrE: '44422', attrF: '5', attrG: '112ddsc1][;?/', attrH: '0,6 - 12' },
    { attrA: '5gfe', attrB: '-1,22', attrD: '29/06/2022', attrE: '4', attrF: '98788,32', attrG: 'ff1112ds#@6dsc1!134$', attrH: '0,3 - 1' },
    { attrA: '5gfe', attrB: '-0,004', attrD: '11/07/2022 15:45:00', attrE: '4', attrF: '98788,32', attrG: 'ff1112ds#@6dsc1!134$', attrH: '0,54 - 1234' },
    { attrA: '5gfe', attrB: '-0,37', attrD: '26/06/2022 10:30:10', attrE: '4', attrF: '98788,32', attrG: 'ff1112ds#@6dsc1!134$', attrH: '12,3 - 10' },
    { attrA: '5gfe', attrB: '-0,03', attrD: '26/06/2022 00:00:00', attrE: '4', attrF: '98788,32', attrG: 'ff1112ds#@6dsc1!134$', attrH: '8,41 - 8' },
  ]

  constructor(
    private excelService: ExcelService,
  ) { }

  ngOnInit(): void {
  }

  exportarExcel(){
    let keys = Object.keys(this.listaExcel[0])
    let headers = keys.map(obj => {
      let objHeader = {}
      objHeader['header'] = obj
      objHeader['property'] = obj
      return objHeader
    })
    let typedList = this.listaExcel.map(obj => {
      keys.forEach(key => {
        obj[key] = this.getTypedValue(DateUtil.DDMMYYYYHHMMSS, obj[key])
      })
      return obj
    })
    this.excelService.exportarExcel(typedList, headers, 'teste', 'dd/MM/yyyy hh:mm:ss')
  }

  private getTypedValue(dateSortFormat: string, value: string): string | Date | number {

    if (!value){
      return null
    }

    // verifica se tem letra ou se tem caractere especial (exceto . , / : -)
    // corrige bug que ocorria ao receber valor numérico separado por caractere não decimal. Ex: 0 ~ 2 ou até 0 - 2.
    let letterMatches = value.match(/[a-zA-Z]/g)
    let specialsMatches = value.match(/[!@#$%^&*()_+\=\[\]{};'"\\|<>?]+/);
    if ((letterMatches && letterMatches.length > 0) || (specialsMatches && specialsMatches.length > 0)) {
      return value // string
    }

    // verifica se está no padrão de data dd/MM/yyyy hh:mm:ss ou dd/MM/yyyy
    let dateMatches = value.match(/\b\d\d\/\d\d\/\d\d\d\d \d\d:\d\d:\d\d\b|\b\d\d\/\d\d\/\d\d\d\d\b/g)
    if (dateMatches && dateMatches.length > 0) {
      let datePattern = dateSortFormat ? dateSortFormat : DateUtil.DDMMYYYYHHMMSS
      let date = this.stringToDateExcel(value, datePattern)
      return date // date
    }

    // verifica se pode ser transformado em float number
    if (!Number.isNaN(parseFloat(value.trim().replace(',', '.')))) {
      return parseFloat(value.trim().replace(',', '.')) // number
    }

    return value // string
  }

  private stringToDateExcel(string: string, format: string): Date {
    if (format == null) format = 'dd/MM/yyyy';
    const baseDate = new Date(1899, 11, 30, 0, 0, 0);
    const baseDateUtc = new Date(Date.UTC(1899, 11, 30, 0, 0, 0));
    const timezoneOffsetFix = baseDateUtc.valueOf() + baseDate.getTimezoneOffset() * 60000
      - baseDate.valueOf();
    const date = DateUtil.parseToDate(string, format);
    const needFix = new Date(date.valueOf() - timezoneOffsetFix).getTimezoneOffset()
      !== baseDate.getTimezoneOffset();
    const fixedDate = needFix ? new Date(date.valueOf() - timezoneOffsetFix) : date;
    return fixedDate;
  }

}
