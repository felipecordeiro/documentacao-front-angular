// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// import { HttpErrorResponse } from '@angular/common/http';
// import { LoadingController } from 'ionic-angular';
// import { Injectable } from '@angular/core';
// import { EstruturaTabelaRelatorio, EstruturaTabelasRelatorio } from '../../modelo/estrutura-tabelas-relatorio.modelo';
// import { TelasRelatorioPdf } from '../../enums/telas-relatorio-pdf.enum';
// import { ErrorController } from '../../core/erro/error-controller';

// @Injectable()
// export class PdfService {

//     private LOGO: string
//     temErro: boolean
//     private loader: any;
//     private content: any[]
//     pdfReady: boolean

//     constructor(
//         private errorCtrl: ErrorController,
//         private loadingCtrl: LoadingController) {

//     }

//     private iniciar(nomeRelatorio: TelasRelatorioPdf, listaDados: any[]) {
//         this.pdfReady = false
//         this.temErro = false
//         this.loader = null
//         this.content = []
//         this.gerarRelatorios(nomeRelatorio, listaDados)
//     }

//     /**
//      * Criar e baixar o PDF
//      */
//     createAndDownloadPdf(nomeRelatorio: TelasRelatorioPdf, listaDados: any[], listaPathImagem?: string[]) {

//         let loader = this.loadingCtrl.create({
//             content: 'Gerando PDF...'
//         });
//         loader.present();
//         let imagePromises = []
//         imagePromises.push(this.getBase64Image("assets/imgs/logo.jpg"))
//         if (listaPathImagem && listaPathImagem.length > 0) {
//             listaPathImagem.forEach(obj => {
//                 imagePromises.push(this.getBase64Image(obj))
//             })
//         }

//         Promise.all(imagePromises).then(r => {

//             this.LOGO = r[0];
//             let listaImagem = []
//             let prefixImage = '' //'data:image/jpeg;base64,'
//             for (let index = 1; index < r.length; index++) {
//                 listaImagem.push(prefixImage + r[index])
//             }

//             this.iniciar(nomeRelatorio, listaDados)

//             this.downloadPdf(nomeRelatorio);

//             if (loader) loader.dismiss();

//         }, (error) => {
//             if (loader) loader.dismiss();
//             this.errorCtrl.exibirErro(error)
//         });

//     }

//     private downloadPdf(nomeRelatorio: string) {
//         try {
//             pdfMake.vfs = pdfFonts.pdfMake.vfs;
//             let docDefinition = this.getRelatorio(nomeRelatorio);
//             let pdfObj = pdfMake.createPdf(docDefinition);
//             let dataHoraAtual = DateUtil.parseToString(DateUtil.getToday(), DateUtil.DDMMYYYYHHMMSS)
//             pdfObj.download(`APP_${nomeRelatorio}_${dataHoraAtual}.pdf`);

//         } catch (error) {
//             this.temErro = true;
//             if (this.loader) this.loader.dismiss();
//             let erro: HttpRetorno = new HttpRetorno(null, null, new HttpErrorResponse({ error: {} }));
//             erro.errorResponse.error.message = "Erro ao gerar o relatório PDF.";
//             erro.errorResponse.error.stack = error;
//             this.errorCtrl.exibirErro(error)
//         }
//     }

//     /**
//      * Monta um subheader
//      * @param titulo
//      */
//     private getSubheader(titulo: string) {
//         return { text: titulo, style: 'subheader' };
//     }

//     /**
//      * Monta a exibição de um texto
//      * @param text 
//      */
//     // private getText(text: string) {
//     //     if (text) return { text: text };
//     //     return { text: "Nenhum registro.", italics: true, color: 'gray' };
//     // }

//     /**
//     * @param nomeRelatorio Tipo do relatório
//     * @return Relatório preenchido
//     */
//     private getRelatorio(nomeRelatorio: string) {

//         let tipoRelatorio = nomeRelatorio + " - Gerado em: " + DateUtil.parseToString(DateUtil.getToday(), DateUtil.DDMMYYYYHHMMSS);

//         return {
//             pageSize: 'A4',
//             pageOrientation: 'landscape',
//             header: function (currentPage, pageCount) {
//                 return {
//                     table: {
//                         widths: ['100%'],
//                         body: [
//                             [
//                                 { text: tipoRelatorio + " (" + currentPage.toString() + '/' + pageCount + ")", alignment: 'right', border: [false, false, false, true] }
//                             ]
//                         ]
//                     },
//                     style: 'header'
//                 };
//             },
//             content: this.content,
//             styles: {
//                 textBox: {
//                     alignment: 'center',
//                     fontSize: 10, // default 13
//                     bold: true,
//                     //fillColor: '#DDDDDD',
//                     margin: [0, 0, 0, 5] // [ESQ,TOP,DIR,BOT]
//                 },
//                 subheader: {
//                     fontSize: 12, // default 15
//                     bold: true,
//                     margin: [0, 5, 0, 5]
//                 },
//                 tableHeader: {
//                     fillColor: '#DDDDDD',
//                     bold: true,
//                     fontSize: 10, // default 13
//                     alignment: 'center'
//                 },
//                 header: {
//                     fontSize: 8,
//                     fontColor: 'grey',
//                     border: [false, false, false, true],
//                     margin: [30, 10, 30, 10],
//                     bold: true
//                 },
//                 headerPagina: {
//                     fontSize: 15,
//                     color: 'red',
//                     alignment: 'center',
//                     margin: [0, 8, 0, 0],
//                 }
//             },
//             defaultStyle: {
//                 columnGap: 20,
//                 fontSize: 8
//             }
//         };

//     }

//     /**
//      * Adiciona as informações passadas por parâmetro em colunas
//      * @param columns 
//      */
//     // private createColumns(columns: any[]) {
//     //     return {
//     //         columns: columns
//     //     }
//     // }

//     private getHeaderBox(text: any) {

//         return [{
//             style: 'textBox',
//             table: {
//                 //widths: ['80%', '20%'],
//                 widths: ['*', 'auto'],
//                 body: [
//                     [
//                         {
//                             text: text,
//                             border: [true, true, false, true],
//                             style: 'headerPagina'
//                         },
//                         {
//                             image: this.LOGO,
//                             width: '80',
//                             border: [false, true, true, true],
//                             alignment: 'right'
//                         }
//                     ]
//                 ]
//             }
//         }];
//     }

//     // private getImage(image: any, width = '200') {
//     //     return [{
//     //         style: 'textBox',
//     //         table: {
//     //             //widths: ['80%', '20%'],
//     //             widths: ['*'],
//     //             body: [
//     //                 [
//     //                     {
//     //                         image: image,
//     //                         width: width,
//     //                         border: [false, false, false, false],
//     //                         alignment: 'center'
//     //                     }
//     //                 ]
//     //             ]
//     //         }
//     //     }];
//     // }

//     /**
//      * Método que monta a estrutura de tabela, populada
//      * @param estrutura Estrutura da tabela
//      * @param list Lista de dados
//      * @param headerColspan Campos opcional. Título do header inicial que ocupa todas as colunas (colspan = list.length)
//      */
//     private getTable(estrutura: EstruturaTabelaRelatorio[], list: any[], headerColspan?: string) {

//         /* Unbreakable: true tem problema quando a tabela não cabe em uma única página (a tabela não é incluída no PDF)
//          * Até o momento, esse problema não foi resolvido no PDFMake.
//          * Deixei o unbreakable quando a tabela tem length <= 2 para não dividir quando é uma tabela pequena/sem resultado.
//          */

//         let body = this.getBodyTable(estrutura, list, headerColspan);

//         return {
//             unbreakable: body.length <= 2,
//             table: {
//                 headerRows: headerColspan ? 2 : 1,
//                 widths: estrutura.map(item => item.width),
//                 body: body
//             },
//             margin: [0, 5, 0, 5]
//         }

//     }

//     /**
//      * Método que adiciona os dados da tabela na estrutura
//      * @param estrutura Estrutura da tabela
//      * @param list Lista de dados
//      * @param headerColspan Campos opcional. Título do header inicial que ocupa todas as colunas (colspan = list.length)
//      */
//     private getBodyTable(estrutura: EstruturaTabelaRelatorio[], list: any[], headerColspan?: string) {

//         let rows = [];

//         if (headerColspan) rows.push(this.getHeaderTableColspanTotal(headerColspan, estrutura.length));

//         rows.push(this.getHeaderTable(estrutura.map(item => item.titulo)));

//         if (list != null && list != undefined && list.length > 0) {

//             list.forEach(r => {

//                 let column = [];

//                 estrutura.forEach(element => {

//                     column.push({ text: r[element.valueAttr] ? r[element.valueAttr] : ' ', alignment: 'center' })

//                 });

//                 rows.push(column);

//             })

//         } else {

//             let column = [];
//             column.push({ text: "Nenhum registro.", alignment: 'center', colSpan: estrutura.length, italics: true, color: 'gray' });
//             rows.push(column);

//         }

//         return rows;

//     }

//     /**
//      * Método que monta o header com os títulos dos campos
//      * @param header Todos os headers da tabela
//      */
//     private getHeaderTable(header) {

//         let column = []

//         header.forEach(element => {
//             column.push({ text: element, style: 'tableHeader' })
//         });

//         return column;
//     }

//     /**
//      * Método que monta um header inicial (primeira linha) que ocupa todas as colunas da tabela
//      * @param titulo Título
//      * @param qtdeColunasTabela Quantidade de colunas que a tabela possui
//      */
//     private getHeaderTableColspanTotal(titulo: string, qtdeColunasTabela: number) {

//         let column = [];
//         column.push({ text: titulo, style: 'tableHeader', colSpan: qtdeColunasTabela });

//         for (let i = 0; i < qtdeColunasTabela - 1; i++) {
//             column.push({});
//         }

//         return column;
//     }

//     /**
//      * Método que monta a estrutura de tabela, populada
//      * @param estrutura Estrutura da tabela
//      * @param list Lista de dados
//      * @param headerColspan Campos opcional. Título do header inicial que ocupa todas as colunas (colspan = list.length)
//      */
//     // private getFooter(estrutura: EstruturaTabelaRelatorio[], list: any[], headerColspan?: string) {

//     //     /* Unbreakable: true tem problema quando a tabela não cabe em uma única página (a tabela não é incluída no PDF)
//     //      * Até o momento, esse problema não foi resolvido no PDFMake.
//     //      * Deixei o unbreakable quando a tabela tem length <= 2 para não dividir quando é uma tabela pequena/sem resultado.
//     //      */

//     //     let body = this.getBodyTable(estrutura, list, headerColspan);

//     //     return {
//     //         unbreakable: body.length <= 2,
//     //         table: {
//     //             headerRows: headerColspan ? 2 : 1,
//     //             widths: estrutura.map(item => item.width),
//     //             body: body
//     //         },
//     //         margin: [0, -6, 0, 10] // [ESQ,TOP,DIR,BOT]
//     //     }

//     // }

//     private gerarRelatorios(nomeRelatorio: TelasRelatorioPdf, listaDados: any[]) {

//         this.content = []

//         if (nomeRelatorio == TelasRelatorioPdf.VOLUME_ATM_AGUARDANDO_SDPA) {
//             this.pushAll(this.getHeaderBox(TelasRelatorioPdf.VOLUME_ATM_AGUARDANDO_SDPA))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.VOLUME_ATM_AGUARDANDO_SDPA.FILTRO, listaDados[0]))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.VOLUME_ATM_AGUARDANDO_SDPA.DADOS, listaDados[1]))
//         }
//         else if (nomeRelatorio == TelasRelatorioPdf.AMOSTRAS_LABORATORIO) {
//             this.pushAll(this.getHeaderBox(TelasRelatorioPdf.AMOSTRAS_LABORATORIO))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.AMOSTRAS_LABORATORIO.LINHA_1, listaDados[0]))
//             this.pushAll(this.getSubheader('Geração Acabado'))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.AMOSTRAS_LABORATORIO.GERACAO_ACABADO, listaDados[1]))
//             this.pushAll(this.getSubheader('Metalurgia - Teste'))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.AMOSTRAS_LABORATORIO.METARLURGIA_INFO_TESTE, listaDados[2]))
//             this.pushAll(this.getSubheader('Metalurgia - Resultado'))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.AMOSTRAS_LABORATORIO.METARLURGIA_INFO_RESULTADO, listaDados[3]))
//             this.pushAll(this.getSubheader('Laminação'))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.AMOSTRAS_LABORATORIO.LAMINACACAO_INFO, listaDados[4]))
//         }
//         else if (nomeRelatorio == TelasRelatorioPdf.OBSERVACAO_AJUSTE_CP) {
//             this.pushAll(this.getHeaderBox(TelasRelatorioPdf.OBSERVACAO_AJUSTE_CP))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.OBSERVACAO_AJUSTE_CP.FILTRO, listaDados[0]))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.OBSERVACAO_AJUSTE_CP.DADOS, listaDados[1]))
//         }
//         else if (nomeRelatorio == TelasRelatorioPdf.TONELAGEM_NAO_LIBERADA) {
//             this.pushAll(this.getHeaderBox(TelasRelatorioPdf.TONELAGEM_NAO_LIBERADA))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.TONELAGEM_NAO_LIBERADA.DADOS, listaDados[0]))
//             this.pushAll(this.getSubheader('Metalurgia'))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.TONELAGEM_NAO_LIBERADA.METALURGIA_LAMINACAO, listaDados[1]))
//             this.pushAll(this.getSubheader('Laminação'))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.TONELAGEM_NAO_LIBERADA.METALURGIA_LAMINACAO, listaDados[2]))
//         }
//         else if (nomeRelatorio == TelasRelatorioPdf.SIUACAO_AMOSTRA) {
//             this.pushAll(this.getHeaderBox(TelasRelatorioPdf.SIUACAO_AMOSTRA))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.SITUACAO_AMOSTRA.FILTRO, listaDados[0]))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.SITUACAO_AMOSTRA.DADOS, listaDados[1]))
//         }
//         else if (nomeRelatorio == TelasRelatorioPdf.AMOSTRA_DEVOLVIDA) {
//             this.pushAll(this.getHeaderBox(TelasRelatorioPdf.AMOSTRA_DEVOLVIDA))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.AMOSTRA_DEVOLVIDA.FILTRO, listaDados[0]))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.AMOSTRA_DEVOLVIDA.DADOS, listaDados[1]))
//         }
//         else if (nomeRelatorio == TelasRelatorioPdf.AGUARDANDO_LIBERACAO_CP) {
//             this.pushAll(this.getHeaderBox(TelasRelatorioPdf.AGUARDANDO_LIBERACAO_CP))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.AGUARDANDO_LIBERACAO_CP.FILTRO, listaDados[0]))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.AGUARDANDO_LIBERACAO_CP.DADOS, listaDados[1]))
//         }
//         else if (nomeRelatorio == TelasRelatorioPdf.HISTORICO_AMOSTRA_PILHA) {
//             this.pushAll(this.getHeaderBox(TelasRelatorioPdf.HISTORICO_AMOSTRA_PILHA))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.HISTORICO_AMOSTRA_PILHA.FILTRO, listaDados[0]))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.HISTORICO_AMOSTRA_PILHA.DADOS, listaDados[1]))
//         }

//         else if (nomeRelatorio == TelasRelatorioPdf.AMOSTRA_RECEBIDA) {
//             this.pushAll(this.getHeaderBox(TelasRelatorioPdf.AMOSTRA_RECEBIDA))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.AMOSTRA_RECEBIDA.FILTRO, listaDados[0]))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.AMOSTRA_RECEBIDA.DADOS, listaDados[1]))
//         }
//         else if (nomeRelatorio == TelasRelatorioPdf.SERVICO_FUNCIONARIO) {
//             this.pushAll(this.getHeaderBox(TelasRelatorioPdf.SERVICO_FUNCIONARIO))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.SERVICO_FUNCIONARIO.FILTRO, listaDados[0]))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.SERVICO_FUNCIONARIO.DADOS, listaDados[1]))
//         }
//         else if (nomeRelatorio == TelasRelatorioPdf.CP_APROVADO_MATRIZ) {
//             this.pushAll(this.getHeaderBox(TelasRelatorioPdf.CP_APROVADO_MATRIZ))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.CP_APROVADO_MATRIZ.FILTRO, listaDados[0]))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.CP_APROVADO_MATRIZ.DADOS, listaDados[1]))
//         }
//         else if (nomeRelatorio == TelasRelatorioPdf.VOLUME_AMOSTRA) {
//             this.pushAll(this.getHeaderBox(TelasRelatorioPdf.VOLUME_AMOSTRA))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.VOLUME_AMOSTRA.FILTRO, listaDados[0]))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.VOLUME_AMOSTRA.DADOS, listaDados[1]))
//         }
//         else if (nomeRelatorio == TelasRelatorioPdf.AMOSTRAS_CORRIDA) {
//             this.pushAll(this.getHeaderBox(TelasRelatorioPdf.AMOSTRAS_CORRIDA))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.AMOSTRAS_CORRIDA.FILTRO, listaDados[0]))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.AMOSTRAS_CORRIDA.DADOS, listaDados[1]))
//         }
//         else if (nomeRelatorio == TelasRelatorioPdf.CONSULTA_PILHAS_AMOSTRA) {
//             this.pushAll(this.getHeaderBox(TelasRelatorioPdf.CONSULTA_PILHAS_AMOSTRA))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.CONSULTA_PILHAS_AMOSTRA.FILTRO, listaDados[0]))
//             this.pushAll(this.getTable(EstruturaTabelasRelatorio.CONSULTA_PILHAS_AMOSTRA.DADOS, listaDados[1]))
//         }
        
//         this.pdfReady = true;
//     }

//     private pushAll(dados) {
//         this.content.push(dados)
//     }

//     /**
//  * @param url url da imagem
//  * @return Promise que converte imagem em base64
//  */
//     private getBase64Image = (url) => new Promise((resolve, reject) => {
//         const img = new Image();
//         img.setAttribute('crossOrigin', 'anonymous');
//         img.onload = () => {
//             const canvas = document.createElement("canvas");
//             canvas.width = img.width;
//             canvas.height = img.height;
//             const ctx = canvas.getContext("2d");
//             ctx.drawImage(img, 0, 0);
//             const dataURL = canvas.toDataURL();
//             console.log(dataURL)
//             resolve(dataURL)
//         }
//         img.onerror = () => {
//             reject(new Error('Erro na conversão de imagem para base64'))
//         }
//         img.src = url
//     })
// }