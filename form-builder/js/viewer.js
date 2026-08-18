/* ============================================================
   HealthEquity Form Builder — hosted form viewer/filler
   Loads a form definition from the URL hash (#d=...), renders
   it, validates, and produces a completed PDF. All processing
   happens in this browser tab; nothing is transmitted.
   ============================================================ */
(function () {
  'use strict';
  const { readFormFromHash, renderForm, collectResponses, generatePdf,
          slugify, downloadBytes, esc } = HQFB;

  const mount = document.getElementById('form-mount');

  function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove('show'), 2600);
  }

  function showError() {
    mount.innerHTML = `
      <div class="notice">
        <span class="msr">link_off</span>
        <h1>This form link isn't valid</h1>
        <p>The link may be incomplete — make sure the full address was copied, including everything after the “#”.</p>
        <a class="btn btn-primary" href="index.html">Open the form builder</a>
      </div>`;
  }

  function render() {
    const form = readFormFromHash();
    if (!form) { showError(); return; }
    document.title = (form.title || 'Form') + ' — HealthEquity';

    const formEl = renderForm(form, mount, { fillable: true, basePath: '' });

    const actions = document.createElement('div');
    actions.innerHTML = `
      <div class="viewer-actions">
        <button type="button" class="btn btn-primary" id="btn-complete"><span class="msr">download</span> Download completed PDF</button>
        <button type="button" class="btn" id="btn-blank"><span class="msr">picture_as_pdf</span> Blank fillable PDF</button>
        <button type="button" class="btn" id="btn-print"><span class="msr">print</span> Print</button>
      </div>
      <p class="viewer-note">Your answers stay in this browser — nothing is submitted online. Download the completed
      PDF and return it as directed${form.clientName ? ' by ' + esc(form.clientName) : ''}.</p>`;
    formEl.parentElement.appendChild(actions);

    document.getElementById('btn-complete').addEventListener('click', async e => {
      const { ok, values } = collectResponses(formEl, form);
      if (!ok) { toast('Please complete the highlighted fields.'); return; }
      e.target.disabled = true;
      try {
        const bytes = await generatePdf(form, values, { basePath: '' });
        downloadBytes(bytes, slugify(form.title) + '-completed.pdf', 'application/pdf');
        toast('Completed PDF downloaded');
      } catch (err) {
        console.error(err);
        toast('PDF generation failed: ' + err.message);
      } finally { e.target.disabled = false; }
    });

    document.getElementById('btn-blank').addEventListener('click', async e => {
      e.target.disabled = true;
      try {
        const bytes = await generatePdf(form, null, { basePath: '' });
        downloadBytes(bytes, slugify(form.title) + '-fillable.pdf', 'application/pdf');
      } catch (err) {
        console.error(err);
        toast('PDF generation failed: ' + err.message);
      } finally { e.target.disabled = false; }
    });

    document.getElementById('btn-print').addEventListener('click', () => window.print());
  }

  window.addEventListener('hashchange', render);
  render();
})();
