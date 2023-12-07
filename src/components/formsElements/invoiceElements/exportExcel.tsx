import Excel from 'exceljs'
import { saveAs } from 'file-saver';
import Invoice from '../../../models/invoices/model.invoice';
import Event from '../../../models/event/model.event';
import StandsPartnerInfo from '../../../models/partnersInformation/model.partnerInfo';

export default class ExportExcel {

  async exportInvoice(data?: Array<Invoice>, event?: Event){

    const  workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Invoices');

    const invoiceColumns:any = [{key: "Fecha de Factura/Recibo", header: "Fecha de Factura/Recibo"},
    {key: "Forzar número", header: "Forzar número"},
    {key: "Líneas de factura / Descripción", header: "Líneas de factura / Descripción"},
    {key: "Líneas de factura / Cuenta analítica / Id. de la BD", header: "Líneas de factura / Cuenta analítica / Id. de la BD"},
    {key: "Empresa", header: "Empresa"},
    {key: "C.P.", header: "C.P."},
    {key: "Líneas de factura/precio unitario", header: "Líneas de factura/precio unitario"},
    {key: "Líneas de factura/cantidad", header: "Líneas de factura/cantidad"},
    {key: "Discount", header: "Discount"},
    {key: "Impuesto", header: "Impuesto"},
    {key: "Total", header: "Total"},
    {key: "Paid", header: "Paid"}]

    worksheet.columns = invoiceColumns;

    data?.forEach((invoice:Invoice, i:any) => {
      worksheet.addRow([invoice.invoice_date,
      invoice.invoice_number,
      (event?.event_name + ' - ' + invoice.category  +' - '+ invoice.location +' - ' + ' - ' + invoice.pricetype),
      'INGRESAR CUENTA ANALÍTICA ODOO',
      invoice.company_name,
      invoice.zip, invoice.subtotal,
      invoice.quantity,
      '',
      invoice.iva,
      invoice.total,
      invoice.payment_status == "Payed" ?  'Yes' : 'No'
    ])
    })


    await workbook.xlsx.writeBuffer()
    .then(buffer => saveAs(new Blob([buffer]), new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/'+ new Date().getFullYear() + '_invoices.xlsx'))
    .catch(err => console.log('Error writing excel export', err))
      
  }


  async exportStandInformation(data: Array<any>){
    const  workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('StandInformation');

    const standInfoColumns:any = [{key: "invoice", header: "invoice"},
    {key: "location", header: "location"},
    {key: "logo", header: "logo"},
    {key: "city_1", header: "city_1"},
    {key: "headline_1", header: "headline_1"},
    {key: "bullet1_1", header: "bullet1_1"},
    {key: "bullet2_1", header: "bullet2_1"},
    {key: "bullet3_1", header: "bullet3_1"},
    {key: "city_2", header: "city_2"},
    {key: "headline_2", header: "headline_2"},
    {key: "bullet1_2", header: "bullet1_2"},
    {key: "bullet2_2", header: "bullet2_2"},
    {key: "bullet3_2", header: "bullet3_2"},
    {key: "city_3", header: "city_3"},
    {key: "headline_3", header: "headline_3"},
    {key: "bullet1_3", header: "bullet1_3"},
    {key: "bullet2_3", header: "bullet2_3"},
    {key: "bullet3_3", header: "bullet3_3"},
    {key: "companyname", header: "companyname"},
    {key: "document1", header: "document1"}, 
    {key: "document2", header: "document2"}, 
    {key: "document3", header: "document3"}, 
    {key: "video1", header: "video1"}, 
    {key: "video2", header: "video2"}, 
    {key: "contactemail", header: "contactemail"}, 
    {key: "companydescription", header: "companydescription"}, 
    {key: "companywebsite", header: "companywebsite"}, 
    {key: "socialmedia1", header: "socialmedia1"}, 
    {key: "socialmedia2", header: "socialmedia2"}, 
    {key: "socialmedia3", header: "socialmedia3"}, 
    {key: "socialmedia4", header: "socialmedia4"}, 
    {key: "socialmedia5", header: "socialmedia5"}]

    worksheet.columns = standInfoColumns;

    data?.forEach((standInfo:any, i:any) => {
      worksheet.addRow([standInfo.invoice_number,standInfo.location,standInfo.logo,standInfo.city_1,standInfo.headline_1,standInfo.bullet1_1,standInfo.bullet2_1,standInfo.bullet3_1,standInfo.city_2,standInfo.headline_2,standInfo.bullet1_2,standInfo.bullet2_2,standInfo.bullet3_2,standInfo.city_3,standInfo.headline_3,standInfo.bullet1_3,standInfo.bullet2_3,standInfo.bullet3_3,standInfo.companyname,standInfo.document1,standInfo.document2,standInfo.document3,standInfo.video1,standInfo.video2, standInfo.contactemail,standInfo.companydescription,standInfo.companywebsite,standInfo.socialmedia1,standInfo.socialmedia2,standInfo.socialmedia3,standInfo.socialmedia4,standInfo.socialmedia5])      
    });



    await workbook.xlsx.writeBuffer()
    .then(buffer => saveAs(new Blob([buffer]), new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/'+ new Date().getFullYear() + '_StandInformation.xlsx'))
    .catch(err => console.log('Error writing excel export', err))

  }
}