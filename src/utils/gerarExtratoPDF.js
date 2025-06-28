import jsPDF from 'jspdf';

export function gerarExtratoPDF(extrato) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Extrato – SenaiBank', 20, 20);

  doc.setFontSize(12);
  let y = 40;

  extrato.forEach((linha, i) => {
    doc.text(linha, 20, y);
    y += 10;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save('extrato-senaibank.pdf');
}
