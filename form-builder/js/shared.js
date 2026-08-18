/* ============================================================
   HealthEquity Form Builder — shared core
   Schema, URL encoding, web form rendering, validation,
   and fillable-PDF generation (pdf-lib).
   Everything runs in the browser; no data leaves the page.
   ============================================================ */
window.HQFB = (function () {
  'use strict';

  /* ---------------- Field type registry ---------------- */
  const FIELD_TYPES = {
    heading:       { name: 'Heading',           icon: 'title',                 layout: true },
    textblock:     { name: 'Text block',        icon: 'notes',                 layout: true },
    divider:       { name: 'Divider',           icon: 'horizontal_rule',       layout: true },
    text:          { name: 'Text field',        icon: 'text_fields',           simple: true },
    textarea:      { name: 'Multi-line text',   icon: 'subject' },
    email:         { name: 'Email',             icon: 'mail',                  simple: true },
    phone:         { name: 'Phone',             icon: 'call',                  simple: true },
    number:        { name: 'Number',            icon: 'tag',                   simple: true },
    date:          { name: 'Date',              icon: 'calendar_month',        simple: true },
    dropdown:      { name: 'Dropdown',          icon: 'arrow_drop_down_circle', simple: true, options: true },
    radio:         { name: 'Radio buttons',     icon: 'radio_button_checked',  options: true },
    checkboxgroup: { name: 'Checkboxes',        icon: 'check_box',             options: true },
    checkbox:      { name: 'Single checkbox',   icon: 'check_box_outline_blank' },
    signature:     { name: 'Signature',         icon: 'draw' },
  };

  let idCounter = 0;
  function newId() {
    idCounter += 1;
    return 'f' + Date.now().toString(36) + idCounter.toString(36) + Math.random().toString(36).slice(2, 5);
  }

  function newField(type) {
    const t = FIELD_TYPES[type];
    const f = { id: newId(), type };
    if (type === 'heading') f.label = 'Section heading';
    else if (type === 'textblock') f.content = 'Add explanatory text for the person filling out the form.';
    else if (type === 'divider') { /* nothing else */ }
    else {
      f.label = t.name;
      f.required = false;
      if (t.simple) f.width = 'full';
      if (['text', 'textarea', 'email', 'phone', 'number'].includes(type)) f.placeholder = '';
      f.help = '';
      if (t.options) f.options = ['Option 1', 'Option 2', 'Option 3'];
      if (type === 'checkbox') f.label = 'I confirm the statement above.';
      if (type === 'signature') f.label = 'Signature';
    }
    return f;
  }

  function newForm() {
    return {
      v: 1,
      title: 'Untitled form',
      description: '',
      clientName: '',
      clientLogo: null,      // data URL (png/jpeg), already downscaled
      showClientLogo: true,
      fields: [],
    };
  }

  /* ---------------- URL encoding ---------------- */
  function encodeForm(form) {
    return LZString.compressToEncodedURIComponent(JSON.stringify(form));
  }
  function decodeForm(str) {
    try {
      const json = LZString.decompressFromEncodedURIComponent(str);
      if (!json) return null;
      const form = JSON.parse(json);
      if (!form || !Array.isArray(form.fields)) return null;
      return form;
    } catch (e) {
      return null;
    }
  }
  function readFormFromHash() {
    const m = location.hash.match(/[#&]d=([^&]+)/);
    return m ? decodeForm(m[1]) : null;
  }

  /* ---------------- Small utils ---------------- */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function slugify(s) {
    return (String(s || 'form').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'form');
  }
  function downloadBytes(bytes, filename, mime) {
    const blob = new Blob([bytes], { type: mime || 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  /* Downscale an uploaded logo image to keep share URLs small.
     Returns a PNG data URL (preserves transparency). */
  function processLogoFile(file, maxW, maxH) {
    maxW = maxW || 480; maxH = maxH || 200;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Could not read the file.'));
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error('That file is not a supported image.'));
        img.onload = () => {
          const scale = Math.min(1, maxW / img.naturalWidth, maxH / img.naturalHeight);
          const w = Math.max(1, Math.round(img.naturalWidth * scale));
          const h = Math.max(1, Math.round(img.naturalHeight * scale));
          const c = document.createElement('canvas');
          c.width = w; c.height = h;
          c.getContext('2d').drawImage(img, 0, 0, w, h);
          resolve(c.toDataURL('image/png'));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  /* Rasterize an SVG string to a PNG data URL (for PDF embedding). */
  function svgToPngDataUrl(svgText, targetW) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(new Blob([svgText], { type: 'image/svg+xml' }));
      img.onload = () => {
        const ratio = img.naturalHeight / img.naturalWidth || 0.162;
        const c = document.createElement('canvas');
        c.width = targetW; c.height = Math.round(targetW * ratio);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        resolve(c.toDataURL('image/png'));
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Logo failed to load.')); };
      img.src = url;
    });
  }

  let heLogoPngPromise = null;
  function getHeLogoPng(basePath) {
    if (!heLogoPngPromise) {
      heLogoPngPromise = fetch((basePath || '') + 'assets/healthequity-purple.svg')
        .then(r => r.text())
        .then(svg => svgToPngDataUrl(svg, 900)); // 900px wide → crisp at print size
    }
    return heLogoPngPromise;
  }

  /* ---------------- Web rendering (viewer + preview) ---------------- */

  function renderHeaderHTML(form, basePath) {
    const client = form.showClientLogo !== false && form.clientLogo
      ? `<img class="hq-clientlogo" src="${esc(form.clientLogo)}" alt="${esc(form.clientName || 'Client')} logo">`
      : (form.clientName ? `<div class="hq-clientname">${esc(form.clientName)}</div>` : '');
    return `
      <div class="hq-formhead">
        <img class="hq-helogo" src="${esc((basePath || '') + 'assets/healthequity-purple.svg')}" alt="HealthEquity">
        ${client}
      </div>
      <div class="hq-formrule"></div>
      <h1 class="hq-formtitle">${esc(form.title || 'Untitled form')}</h1>
      ${form.description ? `<p class="hq-formdesc">${esc(form.description)}</p>` : ''}
      ${form.fields.some(f => f.required) ? '<p class="hq-reqnote"><span class="req">*</span> Required field</p>' : ''}
    `;
  }

  function optionsOf(f) {
    return (f.options || []).map(o => String(o).trim()).filter(Boolean);
  }

  function fieldHTML(f, fillable) {
    const dis = fillable ? '' : ' tabindex="-1"';
    const req = f.required ? ' <span class="req" aria-hidden="true">*</span>' : '';
    const help = f.help ? `<div class="ff-help" id="${f.id}-help">${esc(f.help)}</div>` : '';
    const helpAttr = f.help ? ` aria-describedby="${f.id}-help"` : '';
    const reqAttr = f.required ? ' required' : '';
    const wrap = (inner, cls) =>
      `<div class="ff ${cls || ''} ${f.width === 'half' ? 'ff-half' : ''}" data-fid="${f.id}" data-ftype="${f.type}">${inner}<div class="ff-error" hidden></div></div>`;
    const label = `<label class="ff-label" for="${f.id}">${esc(f.label || '')}${req}</label>`;

    switch (f.type) {
      case 'heading':
        return wrap(`<h2 class="ff-heading">${esc(f.label || '')}</h2>`, 'ff-layout');
      case 'textblock':
        return wrap(`<p class="ff-text">${esc(f.content || '').replace(/\n/g, '<br>')}</p>`, 'ff-layout');
      case 'divider':
        return wrap(`<hr class="ff-divider">`, 'ff-layout');
      case 'textarea':
        return wrap(`${label}${help}<textarea id="${f.id}" name="${f.id}" rows="4" placeholder="${esc(f.placeholder || '')}"${reqAttr}${helpAttr}${dis}></textarea>`);
      case 'dropdown': {
        const opts = optionsOf(f).map(o => `<option value="${esc(o)}">${esc(o)}</option>`).join('');
        return wrap(`${label}${help}<select id="${f.id}" name="${f.id}"${reqAttr}${helpAttr}${dis}><option value="">Select…</option>${opts}</select>`);
      }
      case 'radio': {
        const opts = optionsOf(f).map((o, i) => `
          <label class="ff-choice"><input type="radio" name="${f.id}" value="${esc(o)}" id="${f.id}-${i}"${dis}><span>${esc(o)}</span></label>`).join('');
        return wrap(`<fieldset><legend class="ff-label">${esc(f.label || '')}${req}</legend>${help}${opts}</fieldset>`);
      }
      case 'checkboxgroup': {
        const opts = optionsOf(f).map((o, i) => `
          <label class="ff-choice"><input type="checkbox" name="${f.id}" value="${esc(o)}" id="${f.id}-${i}"${dis}><span>${esc(o)}</span></label>`).join('');
        return wrap(`<fieldset><legend class="ff-label">${esc(f.label || '')}${req}</legend>${help}${opts}</fieldset>`);
      }
      case 'checkbox':
        return wrap(`<label class="ff-choice ff-single"><input type="checkbox" name="${f.id}" id="${f.id}" value="Yes"${dis}><span>${esc(f.label || '')}${req}</span></label>${help}`);
      case 'signature':
        return wrap(`${label}${help}<input class="ff-signature" type="text" id="${f.id}" name="${f.id}" placeholder="Type your full legal name" autocomplete="name"${reqAttr}${helpAttr}${dis}>`);
      case 'date':
        return wrap(`${label}${help}<input type="date" id="${f.id}" name="${f.id}"${reqAttr}${helpAttr}${dis}>`);
      case 'email':
        return wrap(`${label}${help}<input type="email" id="${f.id}" name="${f.id}" placeholder="${esc(f.placeholder || '')}" autocomplete="email"${reqAttr}${helpAttr}${dis}>`);
      case 'phone':
        return wrap(`${label}${help}<input type="tel" id="${f.id}" name="${f.id}" placeholder="${esc(f.placeholder || '')}" autocomplete="tel"${reqAttr}${helpAttr}${dis}>`);
      case 'number':
        return wrap(`${label}${help}<input type="number" id="${f.id}" name="${f.id}" placeholder="${esc(f.placeholder || '')}" inputmode="decimal"${reqAttr}${helpAttr}${dis}>`);
      default: /* text */
        return wrap(`${label}${help}<input type="text" id="${f.id}" name="${f.id}" placeholder="${esc(f.placeholder || '')}"${reqAttr}${helpAttr}${dis}>`);
    }
  }

  /* Render the whole fill experience into a container. */
  function renderForm(form, mount, opts) {
    opts = opts || {};
    mount.innerHTML = `
      <div class="hq-sheet">
        ${renderHeaderHTML(form, opts.basePath)}
        <form class="hq-fields" novalidate>
          ${form.fields.map(f => fieldHTML(f, opts.fillable !== false)).join('')}
        </form>
      </div>`;
    return mount.querySelector('form');
  }

  /* Read + validate values from a rendered form. Returns {ok, values}. */
  function collectResponses(formEl, form) {
    let ok = true;
    let firstBad = null;
    const values = {};
    form.fields.forEach(f => {
      const box = formEl.querySelector(`[data-fid="${f.id}"]`);
      if (!box) return;
      const errEl = box.querySelector('.ff-error');
      let val = '';
      let missing = false;
      if (FIELD_TYPES[f.type].layout) return;
      if (f.type === 'radio') {
        const sel = formEl.querySelector(`input[name="${f.id}"]:checked`);
        val = sel ? sel.value : '';
        missing = f.required && !val;
      } else if (f.type === 'checkboxgroup') {
        val = [...formEl.querySelectorAll(`input[name="${f.id}"]:checked`)].map(i => i.value);
        missing = f.required && val.length === 0;
      } else if (f.type === 'checkbox') {
        const el = formEl.querySelector(`input[name="${f.id}"]`);
        val = el && el.checked ? 'Yes' : '';
        missing = f.required && !val;
      } else {
        const el = formEl.querySelector(`[name="${f.id}"]`);
        val = el ? String(el.value).trim() : '';
        missing = f.required && !val;
        if (!missing && val && f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          missing = true;
          if (errEl) errEl.textContent = 'Enter a valid email address.';
        }
      }
      values[f.id] = val;
      if (errEl) {
        if (missing) {
          if (!errEl.textContent) errEl.textContent = f.type === 'checkboxgroup' ? 'Select at least one option.' : 'This field is required.';
          errEl.hidden = false;
          box.classList.add('ff-invalid');
          ok = false;
          if (!firstBad) firstBad = box;
        } else {
          errEl.textContent = '';
          errEl.hidden = true;
          box.classList.remove('ff-invalid');
        }
      }
    });
    if (firstBad) firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return { ok, values };
  }

  /* ---------------- PDF generation (pdf-lib) ---------------- */

  const PAGE_W = 612, PAGE_H = 792;          // US Letter, points
  const MARGIN = 54, GUTTER = 16;
  const CONTENT_W = PAGE_W - MARGIN * 2;     // 504
  const HALF_W = (CONTENT_W - GUTTER) / 2;   // 244

  // Strip characters Helvetica (WinAnsi) cannot encode.
  function ansi(s) {
    return String(s == null ? '' : s)
      .replace(/[‐-‒]/g, '-')
      .replace(/[^\x20-\x7E\xA0-\xFF–—‘’“”•…\n]/g, '');
  }

  function wrapText(text, font, size, maxW) {
    const out = [];
    ansi(text).split('\n').forEach(para => {
      const words = para.split(/\s+/).filter(Boolean);
      if (!words.length) { out.push(''); return; }
      let line = '';
      words.forEach(w => {
        const test = line ? line + ' ' + w : w;
        if (font.widthOfTextAtSize(test, size) <= maxW || !line) line = test;
        else { out.push(line); line = w; }
      });
      out.push(line);
    });
    return out;
  }

  function isoToUS(v) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || '');
    return m ? `${m[2]}/${m[3]}/${m[1]}` : (v || '');
  }

  /* Generate a fillable AcroForm PDF for `form`.
     `values` (optional) pre-fills fields; pass null/{} for a blank form.
     Returns Uint8Array of PDF bytes. */
  async function generatePdf(form, values, opts) {
    values = values || {};
    opts = opts || {};
    const { PDFDocument, StandardFonts, rgb } = PDFLib;
    const PURPLE = rgb(0x4F / 255, 0x28 / 255, 0x83 / 255);
    const BLACK = rgb(0, 0, 0);
    const GRAY = rgb(0.42, 0.44, 0.47);
    const BORDER = rgb(0.62, 0.64, 0.68);
    const RED = rgb(0.72, 0.11, 0.11);
    const WHITE = rgb(1, 1, 1);

    const doc = await PDFDocument.create();
    doc.setTitle(form.title || 'Form');
    doc.setCreator('HealthEquity form builder');
    const helv = await doc.embedFont(StandardFonts.Helvetica);
    const bold = await doc.embedFont(StandardFonts.HelveticaBold);
    const acro = doc.getForm();

    let page = doc.addPage([PAGE_W, PAGE_H]);
    let y = PAGE_H - MARGIN;

    function addPage() {
      page = doc.addPage([PAGE_W, PAGE_H]);
      y = PAGE_H - MARGIN;
    }
    function ensure(h) {
      if (y - h < MARGIN + 18) addPage();
    }
    function drawLines(lines, x, size, font, color, lineH) {
      lines.forEach((ln, i) => {
        page.drawText(ln, { x, y: y - size - i * lineH, size, font, color });
      });
    }

    /* ---- Header (page 1) ---- */
    try {
      const hePng = await getHeLogoPng(opts.basePath);
      const heImg = await doc.embedPng(hePng);
      const heW = 150, heH = heW * (heImg.height / heImg.width);
      page.drawImage(heImg, { x: MARGIN, y: y - heH, width: heW, height: heH });
      let headerBottom = y - heH;
      if (form.showClientLogo !== false && form.clientLogo) {
        try {
          const cImg = form.clientLogo.startsWith('data:image/jpeg')
            ? await doc.embedJpg(form.clientLogo)
            : await doc.embedPng(form.clientLogo);
          const scale = Math.min(150 / cImg.width, 40 / cImg.height, 1);
          const cw = cImg.width * scale, ch = cImg.height * scale;
          page.drawImage(cImg, { x: PAGE_W - MARGIN - cw, y: y - ch, width: cw, height: ch });
          headerBottom = Math.min(headerBottom, y - ch);
        } catch (e) { /* skip a bad client logo rather than fail the export */ }
      } else if (form.clientName) {
        const t = ansi(form.clientName);
        page.drawText(t, {
          x: PAGE_W - MARGIN - bold.widthOfTextAtSize(t, 11),
          y: y - 14, size: 11, font: bold, color: BLACK,
        });
      }
      y = headerBottom - 14;
    } catch (e) {
      // If the logo can't be rasterized, fall back to a wordmark.
      page.drawText('HealthEquity', { x: MARGIN, y: y - 16, size: 16, font: bold, color: PURPLE });
      y -= 30;
    }
    page.drawLine({ start: { x: MARGIN, y }, end: { x: PAGE_W - MARGIN, y }, thickness: 1.5, color: PURPLE });
    y -= 24;

    /* ---- Title & description ---- */
    const titleLines = wrapText(form.title || 'Untitled form', bold, 18, CONTENT_W);
    drawLines(titleLines, MARGIN, 18, bold, PURPLE, 22);
    y -= titleLines.length * 22 + 4;
    if (form.description) {
      const descLines = wrapText(form.description, helv, 10.5, CONTENT_W);
      drawLines(descLines, MARGIN, 10.5, helv, BLACK, 14);
      y -= descLines.length * 14 + 4;
    }
    if (form.fields.some(f => f.required)) {
      page.drawText('* Required field', { x: MARGIN, y: y - 8.5, size: 8.5, font: helv, color: GRAY });
      y -= 18;
    }
    y -= 6;

    /* ---- Field measurement + drawing ---- */
    const LABEL_SIZE = 10, HELP_SIZE = 8.5, INPUT_H = 24, OPT_H = 18;

    function labelBlockH(f, colW) {
      let h = 0;
      if (f.label) h += wrapText(f.label, bold, LABEL_SIZE, colW).length * 13 + 3;
      if (f.help) h += wrapText(f.help, helv, HELP_SIZE, colW).length * 11 + 2;
      return h;
    }
    function measure(f, colW) {
      switch (f.type) {
        case 'heading': return wrapText(f.label, bold, 14, colW).length * 18 + 6;
        case 'textblock': return wrapText(f.content, helv, 10, colW).length * 13.5 + 4;
        case 'divider': return 14;
        case 'textarea': return labelBlockH(f, colW) + 76;
        case 'radio':
        case 'checkboxgroup': return labelBlockH(f, colW) + optionsOf(f).length * OPT_H + 2;
        case 'checkbox': return Math.max(16, wrapText(f.label, helv, LABEL_SIZE, colW - 22).length * 13) + (f.help ? wrapText(f.help, helv, HELP_SIZE, colW).length * 11 + 3 : 0) + 4;
        case 'signature': return labelBlockH(f, colW) + 30;
        default: return labelBlockH(f, colW) + INPUT_H;
      }
    }

    function drawLabelBlock(f, x, colW) {
      let used = 0;
      if (f.label) {
        const lines = wrapText(f.label, bold, LABEL_SIZE, colW);
        lines.forEach((ln, i) => {
          page.drawText(ln, { x, y: y - used - LABEL_SIZE - i * 13, size: LABEL_SIZE, font: bold, color: BLACK });
        });
        if (f.required) {
          const last = lines[lines.length - 1];
          page.drawText(' *', {
            x: x + bold.widthOfTextAtSize(last, LABEL_SIZE),
            y: y - used - LABEL_SIZE - (lines.length - 1) * 13,
            size: LABEL_SIZE, font: bold, color: RED,
          });
        }
        used += lines.length * 13 + 3;
      }
      if (f.help) {
        const lines = wrapText(f.help, helv, HELP_SIZE, colW);
        lines.forEach((ln, i) => {
          page.drawText(ln, { x, y: y - used - HELP_SIZE - i * 11, size: HELP_SIZE, font: helv, color: GRAY });
        });
        used += lines.length * 11 + 2;
      }
      return used;
    }

    const fieldStyle = { borderColor: BORDER, borderWidth: 1, backgroundColor: WHITE };
    const usedNames = new Set();
    function uname(base) {
      let n = base, i = 1;
      while (usedNames.has(n)) n = base + '_' + (i++);
      usedNames.add(n);
      return n;
    }

    function drawField(f, x, colW) {
      const v = values[f.id];
      switch (f.type) {
        case 'heading': {
          const lines = wrapText(f.label, bold, 14, colW);
          lines.forEach((ln, i) => page.drawText(ln, { x, y: y - 15 - i * 18, size: 14, font: bold, color: PURPLE }));
          break;
        }
        case 'textblock': {
          const lines = wrapText(f.content, helv, 10, colW);
          lines.forEach((ln, i) => page.drawText(ln, { x, y: y - 10.5 - i * 13.5, size: 10, font: helv, color: BLACK }));
          break;
        }
        case 'divider':
          page.drawLine({ start: { x, y: y - 7 }, end: { x: x + colW, y: y - 7 }, thickness: 0.75, color: BORDER });
          break;
        case 'textarea': {
          const used = drawLabelBlock(f, x, colW);
          const tf = acro.createTextField(uname(f.id));
          tf.enableMultiline();
          if (v) tf.setText(ansi(v));
          tf.addToPage(page, { x, y: y - used - 72, width: colW, height: 72, ...fieldStyle });
          tf.setFontSize(10);
          break;
        }
        case 'dropdown': {
          const used = drawLabelBlock(f, x, colW);
          const dd = acro.createDropdown(uname(f.id));
          const opts2 = optionsOf(f).map(ansi);
          dd.setOptions(opts2);
          if (v && opts2.includes(ansi(v))) dd.select(ansi(v));
          dd.addToPage(page, { x, y: y - used - INPUT_H, width: colW, height: INPUT_H, ...fieldStyle });
          dd.setFontSize(10);
          break;
        }
        case 'radio': {
          const used = drawLabelBlock(f, x, colW);
          const rg = acro.createRadioGroup(uname(f.id));
          const seen = new Set();
          optionsOf(f).forEach((o, i) => {
            let val = ansi(o) || ('Option ' + (i + 1));
            while (seen.has(val)) val += ' ';
            seen.add(val);
            const oy = y - used - (i + 1) * OPT_H + 3;
            rg.addOptionToPage(val, page, { x, y: oy, width: 13, height: 13, borderColor: BORDER, borderWidth: 1, backgroundColor: WHITE });
            page.drawText(val.trim(), { x: x + 20, y: oy + 2.5, size: LABEL_SIZE, font: helv, color: BLACK });
          });
          if (v && seen.has(ansi(v))) rg.select(ansi(v));
          break;
        }
        case 'checkboxgroup': {
          const used = drawLabelBlock(f, x, colW);
          const chosen = Array.isArray(v) ? v.map(ansi) : [];
          optionsOf(f).forEach((o, i) => {
            const cb = acro.createCheckBox(uname(f.id + '__' + i));
            const oy = y - used - (i + 1) * OPT_H + 3;
            cb.addToPage(page, { x, y: oy, width: 13, height: 13, borderColor: BORDER, borderWidth: 1, backgroundColor: WHITE });
            if (chosen.includes(ansi(o))) cb.check();
            page.drawText(ansi(o), { x: x + 20, y: oy + 2.5, size: LABEL_SIZE, font: helv, color: BLACK });
          });
          break;
        }
        case 'checkbox': {
          const cb = acro.createCheckBox(uname(f.id));
          cb.addToPage(page, { x, y: y - 16, width: 13, height: 13, borderColor: BORDER, borderWidth: 1, backgroundColor: WHITE });
          if (v) cb.check();
          const lines = wrapText(f.label, helv, LABEL_SIZE, colW - 22);
          lines.forEach((ln, i) => page.drawText(ln, { x: x + 20, y: y - 13 - i * 13, size: LABEL_SIZE, font: helv, color: BLACK }));
          if (f.required) {
            const last = lines[lines.length - 1] || '';
            page.drawText(' *', { x: x + 20 + helv.widthOfTextAtSize(last, LABEL_SIZE), y: y - 13 - (lines.length - 1) * 13, size: LABEL_SIZE, font: bold, color: RED });
          }
          if (f.help) {
            const hl = wrapText(f.help, helv, HELP_SIZE, colW);
            hl.forEach((ln, i) => page.drawText(ln, { x: x + 20, y: y - 13 - lines.length * 13 - i * 11, size: HELP_SIZE, font: helv, color: GRAY }));
          }
          break;
        }
        case 'signature': {
          const used = drawLabelBlock(f, x, colW);
          const tf = acro.createTextField(uname(f.id));
          if (v) tf.setText(ansi(v));
          tf.addToPage(page, { x, y: y - used - 26, width: colW, height: 26, borderWidth: 0, backgroundColor: undefined });
          tf.setFontSize(12);
          page.drawLine({ start: { x, y: y - used - 27 }, end: { x: x + colW, y: y - used - 27 }, thickness: 0.9, color: BLACK });
          break;
        }
        default: { // text, email, phone, number, date
          const help = f.type === 'date' && !f.help ? { ...f, help: 'MM/DD/YYYY' } : f;
          const used = drawLabelBlock(help, x, colW);
          const tf = acro.createTextField(uname(f.id));
          let val = v ? String(v) : '';
          if (f.type === 'date') val = isoToUS(val);
          if (val) tf.setText(ansi(val));
          tf.addToPage(page, { x, y: y - used - INPUT_H, width: colW, height: INPUT_H, ...fieldStyle });
          tf.setFontSize(10);
        }
      }
    }

    /* Group consecutive half-width simple inputs into two-column rows. */
    const rows = [];
    for (let i = 0; i < form.fields.length; i++) {
      const f = form.fields[i];
      const half = g => g && g.width === 'half' && FIELD_TYPES[g.type] && FIELD_TYPES[g.type].simple;
      if (half(f) && half(form.fields[i + 1])) { rows.push([f, form.fields[i + 1]]); i++; }
      else rows.push([f]);
    }

    rows.forEach(row => {
      const colW = row.length === 2 ? HALF_W : CONTENT_W;
      const h = Math.max(...row.map(f => measure(f, colW)));
      ensure(h + 10);
      row.forEach((f, ci) => drawField(f, MARGIN + ci * (HALF_W + GUTTER), colW));
      y -= h + 12;
    });

    acro.updateFieldAppearances(helv);
    if (opts.flatten) acro.flatten();

    /* ---- Footer on every page ---- */
    const pages = doc.getPages();
    pages.forEach((p, i) => {
      const t = ansi(form.title || 'Form');
      p.drawText(t, { x: MARGIN, y: 30, size: 7.5, font: helv, color: GRAY });
      const pn = `Page ${i + 1} of ${pages.length}`;
      p.drawText(pn, { x: PAGE_W - MARGIN - helv.widthOfTextAtSize(pn, 7.5), y: 30, size: 7.5, font: helv, color: GRAY });
    });

    return doc.save();
  }

  return {
    FIELD_TYPES, newId, newField, newForm,
    encodeForm, decodeForm, readFormFromHash,
    esc, slugify, downloadBytes, processLogoFile,
    renderForm, collectResponses, generatePdf, optionsOf,
  };
})();
