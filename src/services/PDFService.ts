import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Order, Cari } from '../types';

class PDFService {
  // Türkçe karakter dönüşümü
  private turkishToLatin(text: string): string {
    const map: { [key: string]: string } = {
      'ç': 'c', 'Ç': 'C',
      'ğ': 'g', 'Ğ': 'G',
      'ı': 'i', 'İ': 'I',
      'ö': 'o', 'Ö': 'O',
      'ş': 's', 'Ş': 'S',
      'ü': 'u', 'Ü': 'U'
    };
    return text.replace(/[çÇğĞıİöÖşŞüÜ]/g, (match) => map[match] || match);
  }

  generateOrderPDF(order: Order, cari: Cari): void {
    // A5 Landscape (210mm x 148mm)
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a5'
    });

    // Firma bilgilerini LocalStorage'dan al
    const pdfSettings = localStorage.getItem('pdfSettings');
    const firmaInfo = pdfSettings ? JSON.parse(pdfSettings) : null;

    // Header - En üstte, ortada
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(this.turkishToLatin('SIPARIS FORMU'), 105, 10, { align: 'center' });

    // Çizgi ekle (başlığın altına)
    doc.setLineWidth(0.5);
    doc.line(10, 13, 200, 13);

    let currentY = 20; // Başlangıç Y pozisyonu (başlığın altından)

    // Logo ekle (sol üst, başlığın altında)
    const logoUrl = firmaInfo?.logoUrl;

    if (logoUrl) {
      try {
        // Logo'yu PDF'e ekle (20mm x 15mm boyutunda)
        doc.addImage(logoUrl, 'PNG', 10, currentY, 20, 15);
      } catch (error) {
        console.log('Logo yuklenemedi, devam ediliyor...', error);
      }
    }

    // Firma Bilgileri - Logo'nun yanında (sağda)
    if (firmaInfo && firmaInfo.firmaAdi) {
      const firmaStartX = logoUrl ? 35 : 10; // Logo varsa sağa kaydır

      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(this.turkishToLatin(firmaInfo.firmaAdi), firmaStartX, currentY + 2);

      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      let yPos = currentY + 7;
      if (firmaInfo.firmaAdres) {
        doc.text(this.turkishToLatin(firmaInfo.firmaAdres), firmaStartX, yPos);
        yPos += 4;
      }
      if (firmaInfo.firmaTelefon) {
        doc.text(`Tel: ${firmaInfo.firmaTelefon}`, firmaStartX, yPos);
        yPos += 4;
      }
      if (firmaInfo.firmaEmail) {
        doc.text(`E-posta: ${firmaInfo.firmaEmail}`, firmaStartX, yPos);
      }
    }

    // Sipariş Bilgileri - Sol alt (logo'nun altında)
    currentY = logoUrl ? currentY + 18 : currentY + 10;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(this.turkishToLatin(`Siparis No: ${order.siparisNo}`), 10, currentY);
    doc.text(`Tarih: ${new Date(order.createdAt).toLocaleDateString('tr-TR')}`, 10, currentY + 5);

    // Cari Bilgileri - Sağ üst
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(this.turkishToLatin('MUSTERI BILGILERI'), 140, 25);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(this.turkishToLatin(cari.ad), 140, 30);
    doc.text(`Kod: ${cari.kod}`, 140, 34);
    if (cari.telefon) {
      doc.text(`Tel: ${cari.telefon}`, 140, 38);
    }

    // TL Format fonksiyonu
    const formatTL = (amount: number) => {
      return amount.toLocaleString('tr-TR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }) + ' TL';
    };

    // Ürün Tablosu
    const tableData = order.items.map((item, index) => [
      index + 1,
      item.productAd,
      item.miktar + ' ' + item.birim,
      formatTL(item.birimFiyat),
      `%${item.kdvOrani}`,
      formatTL(item.genelToplam)
    ]);

    autoTable(doc, {
      startY: currentY + 10,
      head: [['#', 'Urun', 'Miktar', 'Birim Fiyat', 'KDV', 'Toplam']],
      body: tableData,
      theme: 'striped',
      headStyles: {
        fillColor: [37, 99, 235],
        fontSize: 9,
        fontStyle: 'bold'
      },
      styles: {
        fontSize: 8,
        cellPadding: 2,
        halign: 'left'
      },
      columnStyles: {
        0: { cellWidth: 8, halign: 'center' },
        1: { cellWidth: 70 },
        2: { cellWidth: 25, halign: 'center' },
        3: { cellWidth: 30, halign: 'right' },
        4: { cellWidth: 15, halign: 'center' },
        5: { cellWidth: 35, halign: 'right', fontStyle: 'bold' }
      }
    });

    // Toplam Bilgileri - Sağ alt
    const finalY = (doc as any).lastAutoTable.finalY + 5;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Ara Toplam:', 140, finalY);
    doc.text(formatTL(order.araToplam), 195, finalY, { align: 'right' });

    doc.text('KDV:', 140, finalY + 5);
    doc.text(formatTL(order.toplamKdv), 195, finalY + 5, { align: 'right' });

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('GENEL TOPLAM:', 140, finalY + 12);
    doc.text(formatTL(order.genelToplam), 195, finalY + 12, { align: 'right' });

    // Notlar - Sol alt
    if (order.notlar) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text('Notlar:', 10, finalY);
      const splitNotes = doc.splitTextToSize(order.notlar, 120);
      doc.text(splitNotes, 10, finalY + 5);
    }

    // Footer
    doc.setFontSize(7);
    doc.setFont('helvetica', 'italic');
    doc.text('Bu belge elektronik ortamda olusturulmustur.', 105, 143, { align: 'center' });

    // PDF'i indir
    doc.save(`siparis-${order.siparisNo}.pdf`);
  }
}

export default new PDFService();
