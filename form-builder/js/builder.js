/* ============================================================
   HealthEquity Form Builder — builder UI
   ============================================================ */
(function () {
  'use strict';
  const { FIELD_TYPES, newField, newForm, encodeForm, readFormFromHash,
          esc, slugify, downloadBytes, processLogoFile,
          renderForm, generatePdf } = HQFB;

  const STORAGE_KEY = 'hqy-form-builder-draft-v1';
  const $ = sel => document.querySelector(sel);

  let form = loadInitialForm();
  let selectedId = null;
  let saveTimer = null;

  /* ---------------- persistence ---------------- */
  function loadInitialForm() {
    const fromLink = readFormFromHash();
    if (fromLink) {
      history.replaceState(null, '', location.pathname + location.search);
      return fromLink;
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const f = JSON.parse(raw);
        if (f && Array.isArray(f.fields)) return f;
      }
    } catch (e) { /* fall through to sample */ }
    return sampleForm();
  }

  function sampleForm() {
    const f = newForm();
    f.title = 'Member information form';
    f.description = 'Sample form — edit or delete these fields, or start over from the menu. Use the palette to add more.';
    const mk = (type, patch) => Object.assign(newField(type), patch);
    f.fields = [
      mk('heading', { label: 'Your information' }),
      mk('text', { label: 'First name', width: 'half', required: true, placeholder: '' }),
      mk('text', { label: 'Last name', width: 'half', required: true }),
      mk('email', { label: 'Email address', width: 'half', required: true }),
      mk('phone', { label: 'Phone number', width: 'half' }),
      mk('date', { label: 'Date of birth', width: 'half' }),
      mk('dropdown', { label: 'Benefit type', width: 'half', required: true, options: ['HSA', 'FSA', 'HRA', 'COBRA', 'Commuter'] }),
      mk('divider', {}),
      mk('heading', { label: 'Your request' }),
      mk('radio', { label: 'How would you like to be contacted?', required: true, options: ['Email', 'Phone', 'Mail'] }),
      mk('checkboxgroup', { label: 'Which topics apply?', options: ['Enrollment', 'Contributions', 'Claims or reimbursements', 'Account access'] }),
      mk('textarea', { label: 'Tell us more', placeholder: 'Add any details that will help us assist you.' }),
      mk('checkbox', { label: 'I confirm the information provided is accurate.', required: true }),
      mk('signature', { label: 'Signature', required: true }),
      mk('date', { label: 'Date signed', width: 'half', required: true }),
    ];
    return f;
  }

  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(form)); } catch (e) { /* storage full */ }
    }, 250);
  }

  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove('show'), 2200);
  }

  /* ---------------- settings panel ---------------- */
  function renderSettings() {
    $('#set-title').value = form.title || '';
    $('#set-desc').value = form.description || '';
    $('#set-client').value = form.clientName || '';
    $('#set-showlogo').checked = form.showClientLogo !== false;
    const img = $('#clientlogo-preview');
    if (form.clientLogo) { img.src = form.clientLogo; img.hidden = false; $('#btn-removelogo').hidden = false; }
    else { img.hidden = true; $('#btn-removelogo').hidden = true; }
  }

  function bindSettings() {
    $('#set-title').addEventListener('input', e => { form.title = e.target.value; save(); });
    $('#set-desc').addEventListener('input', e => { form.description = e.target.value; save(); });
    $('#set-client').addEventListener('input', e => { form.clientName = e.target.value; save(); });
    $('#set-showlogo').addEventListener('change', e => { form.showClientLogo = e.target.checked; save(); });
    $('#clientlogo-file').addEventListener('change', async e => {
      const file = e.target.files[0];
      e.target.value = '';
      if (!file) return;
      try {
        form.clientLogo = await processLogoFile(file);
        save(); renderSettings();
        toast('Client logo added');
      } catch (err) { toast(err.message); }
    });
    $('#btn-removelogo').addEventListener('click', () => {
      form.clientLogo = null; save(); renderSettings();
    });
  }

  /* ---------------- palette ---------------- */
  function renderPalette() {
    $('#palette').innerHTML = Object.entries(FIELD_TYPES).map(([type, t]) =>
      `<button type="button" class="pal" data-type="${type}"><span class="msr">${t.icon}</span>${t.name}</button>`
    ).join('');
    $('#palette').addEventListener('click', e => {
      const btn = e.target.closest('.pal');
      if (!btn) return;
      const f = newField(btn.dataset.type);
      form.fields.push(f);
      selectedId = f.id;
      save(); renderCanvas();
      const card = document.querySelector(`.fcard[data-fid="${f.id}"]`);
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  /* ---------------- canvas ---------------- */
  function fieldSummary(f) {
    if (f.type === 'textblock') return (f.content || '').slice(0, 90) || 'Text block';
    if (f.type === 'divider') return 'Horizontal divider';
    return f.label || FIELD_TYPES[f.type].name;
  }

  function cardHTML(f, idx, total) {
    const t = FIELD_TYPES[f.type];
    const selected = f.id === selectedId;
    return `
    <div class="fcard ${selected ? 'selected' : ''}" data-fid="${f.id}" draggable="true">
      <div class="fcard-head">
        <span class="msr handle" title="Drag to reorder">drag_indicator</span>
        <span class="typebadge"><span class="msr">${t.icon}</span>${t.name}</span>
        <span class="flabel">${esc(fieldSummary(f))}${f.required ? ' <span class="reqdot">*</span>' : ''}</span>
        <span class="fcard-actions">
          <button type="button" class="iconbtn" data-act="up" title="Move up" ${idx === 0 ? 'disabled' : ''}><span class="msr">arrow_upward</span></button>
          <button type="button" class="iconbtn" data-act="down" title="Move down" ${idx === total - 1 ? 'disabled' : ''}><span class="msr">arrow_downward</span></button>
          <button type="button" class="iconbtn" data-act="dup" title="Duplicate"><span class="msr">content_copy</span></button>
          <button type="button" class="iconbtn danger" data-act="del" title="Delete"><span class="msr">delete</span></button>
        </span>
      </div>
      ${selected ? editorHTML(f) : ''}
    </div>`;
  }

  function editorHTML(f) {
    const t = FIELD_TYPES[f.type];
    if (f.type === 'divider') {
      return `<div class="editor"><div class="full" style="color:var(--ink-soft);font-size:13px">A horizontal rule — nothing to configure.</div></div>`;
    }
    let rows = '';
    if (f.type === 'textblock') {
      rows += `<label class="fld full">Text<textarea data-prop="content" rows="4">${esc(f.content || '')}</textarea></label>`;
    } else {
      rows += `<label class="fld full">${f.type === 'heading' ? 'Heading text' : 'Label'}<input type="text" data-prop="label" value="${esc(f.label || '')}"></label>`;
    }
    if (['text', 'textarea', 'email', 'phone', 'number'].includes(f.type)) {
      rows += `<label class="fld">Placeholder<input type="text" data-prop="placeholder" value="${esc(f.placeholder || '')}"></label>`;
    }
    if (!t.layout) {
      rows += `<label class="fld">Help text<input type="text" data-prop="help" value="${esc(f.help || '')}"></label>`;
    }
    if (t.options) {
      rows += `<label class="fld full">Options (one per line)<textarea data-prop="options" rows="4">${esc((f.options || []).join('\n'))}</textarea></label>`;
    }
    if (t.simple) {
      rows += `<label class="fld">Width<select data-prop="width">
        <option value="full" ${f.width !== 'half' ? 'selected' : ''}>Full width</option>
        <option value="half" ${f.width === 'half' ? 'selected' : ''}>Half width</option>
      </select></label>`;
    }
    if (!t.layout) {
      rows += `<label class="check"><input type="checkbox" data-prop="required" ${f.required ? 'checked' : ''}> Required</label>`;
    }
    return `<div class="editor">${rows}</div>`;
  }

  function renderCanvas() {
    const canvas = $('#canvas');
    if (!form.fields.length) {
      canvas.innerHTML = `<div class="canvas-empty"><span class="msr">post_add</span>
        Your form is empty.<br>Add fields from the palette${window.innerWidth <= 860 ? ' above' : ' on the left'}.</div>`;
      return;
    }
    canvas.innerHTML = form.fields.map((f, i) => cardHTML(f, i, form.fields.length)).join('');
  }

  function idx(fid) { return form.fields.findIndex(f => f.id === fid); }

  function bindCanvas() {
    const canvas = $('#canvas');

    canvas.addEventListener('click', e => {
      const card = e.target.closest('.fcard');
      if (!card) return;
      const fid = card.dataset.fid;
      const i = idx(fid);
      const act = e.target.closest('[data-act]');
      if (act) {
        e.stopPropagation();
        if (act.dataset.act === 'del') {
          form.fields.splice(i, 1);
          if (selectedId === fid) selectedId = null;
        } else if (act.dataset.act === 'dup') {
          const copy = JSON.parse(JSON.stringify(form.fields[i]));
          copy.id = HQFB.newId();
          form.fields.splice(i + 1, 0, copy);
          selectedId = copy.id;
        } else if (act.dataset.act === 'up' && i > 0) {
          [form.fields[i - 1], form.fields[i]] = [form.fields[i], form.fields[i - 1]];
        } else if (act.dataset.act === 'down' && i < form.fields.length - 1) {
          [form.fields[i + 1], form.fields[i]] = [form.fields[i], form.fields[i + 1]];
        }
        save(); renderCanvas();
        return;
      }
      if (e.target.closest('.editor')) return; // clicks inside editor don't toggle
      selectedId = selectedId === fid ? null : fid;
      renderCanvas();
    });

    // live property editing
    canvas.addEventListener('input', e => {
      const propEl = e.target.closest('[data-prop]');
      const card = e.target.closest('.fcard');
      if (!propEl || !card) return;
      const f = form.fields[idx(card.dataset.fid)];
      if (!f) return;
      const prop = propEl.dataset.prop;
      if (prop === 'required') f.required = propEl.checked;
      else if (prop === 'options') f.options = propEl.value.split('\n');
      else f[prop] = propEl.value;
      // live-update the card summary without re-rendering (keeps focus)
      const lbl = card.querySelector('.flabel');
      if (lbl) lbl.innerHTML = esc(fieldSummary(f)) + (f.required ? ' <span class="reqdot">*</span>' : '');
      save();
    });
    canvas.addEventListener('change', e => {
      if (e.target.matches('[data-prop="width"], [data-prop="required"]')) save();
    });

    // drag & drop reorder (desktop)
    let dragId = null;
    canvas.addEventListener('dragstart', e => {
      const card = e.target.closest('.fcard');
      if (!card) return;
      dragId = card.dataset.fid;
      e.dataTransfer.effectAllowed = 'move';
      try { e.dataTransfer.setData('text/plain', dragId); } catch (err) {}
    });
    canvas.addEventListener('dragover', e => {
      const card = e.target.closest('.fcard');
      if (!card || !dragId || card.dataset.fid === dragId) return;
      e.preventDefault();
      const r = card.getBoundingClientRect();
      const before = e.clientY < r.top + r.height / 2;
      card.classList.toggle('dragover-top', before);
      card.classList.toggle('dragover-bottom', !before);
    });
    canvas.addEventListener('dragleave', e => {
      const card = e.target.closest('.fcard');
      if (card) card.classList.remove('dragover-top', 'dragover-bottom');
    });
    canvas.addEventListener('drop', e => {
      const card = e.target.closest('.fcard');
      if (!card || !dragId) return;
      e.preventDefault();
      const from = idx(dragId);
      let to = idx(card.dataset.fid);
      if (from < 0 || to < 0) return;
      const r = card.getBoundingClientRect();
      if (e.clientY >= r.top + r.height / 2) to += 1;
      if (to > from) to -= 1;
      const [moved] = form.fields.splice(from, 1);
      form.fields.splice(to, 0, moved);
      dragId = null;
      save(); renderCanvas();
    });
    canvas.addEventListener('dragend', () => {
      dragId = null;
      canvas.querySelectorAll('.dragover-top,.dragover-bottom').forEach(c => c.classList.remove('dragover-top', 'dragover-bottom'));
    });
  }

  /* ---------------- top actions ---------------- */
  function shareUrl() {
    const u = new URL('form.html', location.href);
    u.hash = 'd=' + encodeForm(form);
    return u.toString();
  }

  function bindActions() {
    $('#btn-preview').addEventListener('click', () => {
      const dlg = $('#dlg-preview');
      renderForm(form, $('#preview-mount'), { fillable: true, basePath: '' });
      dlg.showModal();
    });

    $('#btn-share').addEventListener('click', () => {
      const url = shareUrl();
      $('#share-url').value = url;
      $('#share-open').href = url;
      $('#share-len').textContent = `${form.fields.length} field${form.fields.length === 1 ? '' : 's'} · link length ${url.length.toLocaleString()} characters`;
      $('#share-warn').hidden = url.length < 8000;
      $('#dlg-share').showModal();
    });
    $('#btn-copyurl').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText($('#share-url').value);
        toast('Link copied');
      } catch (e) {
        $('#share-url').select();
        document.execCommand('copy');
        toast('Link copied');
      }
    });

    $('#btn-pdf').addEventListener('click', async () => {
      const btn = $('#btn-pdf');
      btn.disabled = true;
      try {
        const bytes = await generatePdf(form, null, { basePath: '' });
        downloadBytes(bytes, slugify(form.title) + '-fillable.pdf', 'application/pdf');
        toast('Fillable PDF downloaded');
      } catch (e) {
        console.error(e);
        toast('PDF generation failed: ' + e.message);
      } finally { btn.disabled = false; }
    });

    $('#btn-export').addEventListener('click', () => {
      downloadBytes(JSON.stringify(form, null, 2), slugify(form.title) + '.form.json', 'application/json');
    });
    $('#import-file').addEventListener('change', e => {
      const file = e.target.files[0];
      e.target.value = '';
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const f = JSON.parse(reader.result);
          if (!f || !Array.isArray(f.fields)) throw new Error('Not a form file.');
          form = f; selectedId = null;
          save(); renderSettings(); renderCanvas();
          toast('Form loaded');
        } catch (err) { toast('Could not load that file.'); }
      };
      reader.readAsText(file);
    });

    $('#btn-new').addEventListener('click', () => {
      if (!confirm('Start over with a blank form? Your current draft will be cleared from this browser.')) return;
      form = newForm(); selectedId = null;
      save(); renderSettings(); renderCanvas();
    });

    document.querySelectorAll('dialog [data-close]').forEach(b =>
      b.addEventListener('click', () => b.closest('dialog').close()));
    document.querySelectorAll('dialog').forEach(d =>
      d.addEventListener('click', e => { if (e.target === d) d.close(); }));
  }

  /* ---------------- init ---------------- */
  renderSettings();
  bindSettings();
  renderPalette();
  renderCanvas();
  bindCanvas();
  bindActions();
})();
