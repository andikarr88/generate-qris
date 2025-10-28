//payload QR
    let currentPayload = '';

    function formatTLV(id, value) {
      return id + value.length.toString().padStart(2, '0') + value;
    }

    function calculateCRC(payload) {
      const POLY = 0x1021;
      let crc = 0xFFFF;
      for (let i = 0; i < payload.length; i++) {
        crc ^= payload.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
          if ((crc & 0x8000) !== 0) {
            crc = (crc << 1) ^ POLY;
          } else {
            crc <<= 1;
          }
          crc &= 0xFFFF;
        }
      }
      return crc.toString(16).toUpperCase().padStart(4, '0');
    }

    function generatePayload() {
    const pan = document.getElementById('pan').value.trim();
    const name = document.getElementById('name').value.trim().toUpperCase();
    const city = document.getElementById('city').value.trim().toUpperCase();
    const postalcode = document.getElementById('postalcode').value.trim().toUpperCase();
    const amount = document.getElementById('amount').value.trim();
    const isDynamic = amount !== '';
    const mcc = document.getElementById('mcc').value;
    // FEE
    const feeActive = document.getElementById('feeActive').value === 'yes';
    const feeType = document.getElementById('feeType').value;
    const feeValue = document.getElementById('feeValue').value.trim();

    let tag55 = '';
    let tag56 = '';
    let tag57 = '';

    if (feeActive) {
      tag55 = formatTLV('55', feeType);

      if (feeType === '02' && feeValue !== '') {
        tag56 = formatTLV('56', feeValue); // Fixed amount
      } else if (feeType === '03' && feeValue !== '') {
        tag57 = formatTLV('57', feeValue); // Percentage
      }
    }

    const payload = [
      formatTLV('00', '01'),
      formatTLV('01', isDynamic ? '12' : '11'),
      formatTLV('26',
        formatTLV('00', 'ID.CO.QRIS.WWW') +
        formatTLV('01', pan) +
        formatTLV('02', 'ID1022208552615') +
        formatTLV('03', mcc)
      ),
      formatTLV('51', // Tambahan Tag 51
        formatTLV('00', 'ID.CO.QRIS.WWW') +  // Ganti dengan info relevan jika ada
        formatTLV('02', 'ID1022208552615') +  // Ganti dengan info relevan jika ada
        formatTLV('03', mcc)  // Ganti dengan info relevan jika ada
      ),
      formatTLV('52', '5821'),
      formatTLV('53', '360'),
      amount ? formatTLV('54', amount) : '',
      tag55,
      tag56,
      tag57,
      formatTLV('58', 'ID'),
      formatTLV('59', name.slice(0, 25)),
      formatTLV('60', city.slice(0, 15)),
      formatTLV('61', postalcode.slice(0, 15)),
      formatTLV('62', formatTLV('07', 'A01')),
      '6304'
    ].join('');

    const crc = calculateCRC(payload);
    return payload + crc;
  }

  function generatePayloadTag51() {
  const pan = document.getElementById('pan').value.trim();
  const name = document.getElementById('name').value.trim().toUpperCase();
  const city = document.getElementById('city').value.trim().toUpperCase();
  const postalcode = document.getElementById('postalcode').value.trim().toUpperCase();
  const amount = document.getElementById('amount').value.trim();
  const isDynamic = amount !== '';
  const mcc = document.getElementById('mcc').value;

  const payload = [
    formatTLV('00', '01'),
    formatTLV('01', isDynamic ? '12' : '11'),
    formatTLV('51', // Tambahan Tag 51
      formatTLV('00', 'ID.CO.QRIS.WWW') +  // Ganti dengan info relevan jika ada
      formatTLV('02', 'ID1022208552615') +  // Ganti dengan info relevan jika ada
      formatTLV('03', mcc)  // Ganti dengan info relevan jika ada
    ),
    formatTLV('52', '5821'),
    formatTLV('53', '360'),
    amount ? formatTLV('54', amount) : '',
    formatTLV('58', 'ID'),
    formatTLV('59', name.slice(0, 25)),
    formatTLV('60', city.slice(0, 15)),
    formatTLV('61', postalcode.slice(0, 15)),
    formatTLV('62', formatTLV('07', 'A01')),
    '6304'
  ].join('');

  const crc = calculateCRC(payload);
  return payload + crc;
  }

  function generatePayloadTag26Only() {
  const pan = document.getElementById('pan').value.trim();
  const name = document.getElementById('name').value.trim().toUpperCase();
  const city = document.getElementById('city').value.trim().toUpperCase();
  const postalcode = document.getElementById('postalcode').value.trim().toUpperCase();
  const amount = document.getElementById('amount').value.trim();
  const isDynamic = amount !== '';
  const mcc = document.getElementById('mcc').value;

  const payload = [
    formatTLV('00', '01'),
    formatTLV('01', isDynamic ? '12' : '11'),
    formatTLV('26',
        formatTLV('00', 'ID.CO.QRIS.WWW') +
        formatTLV('01', pan) +
        formatTLV('02', 'ID1022208552615') +
        formatTLV('03', mcc)
    ),
    formatTLV('52', '5821'),
    formatTLV('53', '360'),
    amount ? formatTLV('54', amount) : '',
    formatTLV('58', 'ID'),
    formatTLV('59', name.slice(0, 25)),
    formatTLV('60', city.slice(0, 15)),
    formatTLV('61', postalcode.slice(0, 15)),
    formatTLV('62', formatTLV('07', 'A01')),
    '6304'
  ].join('');

  const crc = calculateCRC(payload);
  return payload + crc;
  }

    function generate() {
      const payload = generatePayload();
      currentPayload = payload;
      document.getElementById('payload').value = payload;

      QRCode.toCanvas(document.getElementById('qrisCanvas'), payload, function (error) {
        if (error) console.error(error);
      });
    }

    function generatetag51ON() {
      const payload = generatePayloadTag51();
      currentPayload = payload;
      document.getElementById('payload').value = payload;

      QRCode.toCanvas(document.getElementById('qrisCanvas'), payload, function (error) {
        if (error) console.error(error);
      });
    }

    function generatetag26ONLY() {
      const payload = generatePayloadTag26Only();
      currentPayload = payload;
      document.getElementById('payload').value = payload;

      QRCode.toCanvas(document.getElementById('qrisCanvas'), payload, function (error) {
        if (error) console.error(error);
      });
    }

    async function downloadPDF() {
      const canvas = document.getElementById('qrisCanvas');
      const imgData = canvas.toDataURL('image/png');

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      doc.setFontSize(16);
      doc.text('QRIS Payment', 105, 20, null, null, 'center');
      doc.addImage(imgData, 'PNG', 55, 30, 100, 100);
      doc.setFontSize(10);
      doc.text(currentPayload, 10, 140);

      doc.save('qris.pdf');
    }



// Fungsi untuk buka popup tertentu
    function openPopup(id) {
      document.getElementById(id).style.display = 'flex';
    }
    function closePopup(id) {
      document.getElementById(id).style.display = 'none';
    }

// Klik tombol membuka popup
    document.getElementById('btnSetA').onclick = () => openPopup('popupA');
    document.getElementById('btnSetB').onclick = () => openPopup('popupB');
    document.getElementById('btnSetC').onclick = () => openPopup('popupC');
    document.getElementById('btnSetD').onclick = () => openPopup('popupD');
    document.getElementById('btnSetE').onclick = () => openPopup('popupE');

// Fungsi untuk menyembunyikan popup
function hidePopup() {
    popup.style.display = "none"; // Ubah display menjadi none untuk menyembunyikannya
}

// Menambahkan event listener ke tombol "Tutup"
closePopupBtn.addEventListener("click", hidePopup);

// Anda juga bisa menyembunyikan popup jika pengguna mengklik di luar konten popup
window.addEventListener("click", function(event) {
    if (event.target === popup) { // Jika target klik adalah area popup itu sendiri
        hidePopup();
    }
});