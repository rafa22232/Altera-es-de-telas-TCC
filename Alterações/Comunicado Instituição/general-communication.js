
document.addEventListener('DOMContentLoaded', () => {

  const TOTAL = 3; 
  const LS_KEY = 'comunicados_v1';

 
  const sidebar = document.getElementById('sidebar');
  const titulo = document.getElementById('titulo');
  const textarea = document.getElementById('texto');
  const btnEditar = document.getElementById('btnEditar');
  const btnRemover = document.getElementById('btnRemover');
  const btnAdicionar = document.getElementById('btnAdicionar');
  const btnSalvar = document.getElementById('btnSalvar');

  
  let atual = 1;
  let comunicados = loadComunicados();

  for (let i = 1; i <= TOTAL; i++) {
    const b = document.createElement('button');
    b.className = 'menu-item';
    b.type = 'button';
    b.dataset.index = i;
    b.textContent = `Comunicados ${i}`;
    b.addEventListener('click', () => mudarPara(i));
    sidebar.appendChild(b);
  }

 
  atualizarUI();

  
  btnEditar.addEventListener('click', () => {
    textarea.disabled = false;
    textarea.focus();
   
    textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
  });

  btnSalvar.addEventListener('click', () => {
    comunicados[String(atual)] = textarea.value;
    saveComunicados();
    textarea.disabled = true;
    alertaCurto('Comunicado salvo.');
    atualizarUI(); 
  });

  btnRemover.addEventListener('click', () => {
    const confirma = confirm('Deseja apagar o conteúdo deste comunicado?');
    if (!confirma) return;
    comunicados[String(atual)] = '';
    textarea.value = '';
    saveComunicados();
    alertaCurto('Comunicado removido.');
    textarea.disabled = true;
    atualizarUI();
  });

  btnAdicionar.addEventListener('click', () => {
   
    const textoNovo = prompt('Digite o texto a adicionar ao comunicado (ou cancele):');
    if (textoNovo === null) return;
    
    const chave = String(atual);
    comunicados[chave] = comunicados[chave] ? comunicados[chave] + '\n' + textoNovo : textoNovo;
    textarea.value = comunicados[chave];
    saveComunicados();
    textarea.disabled = false;
    textarea.focus();
    alertaCurto('Texto adicionado. Clique Salvar para persistir.');
  });

  
  textarea.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
      e.preventDefault();
      btnSalvar.click();
    }
  });

  function mudarPara(index) {
    atual = index;
    textarea.disabled = true; 
    atualizarUI();
  }

  function atualizarUI() {
   
    titulo.textContent = `Comunicados ${atual}`;
   
    textarea.value = comunicados[String(atual)] || '';
    
    document.querySelectorAll('.menu-item').forEach(btn => {
      btn.classList.toggle('active', Number(btn.dataset.index) === atual);
    });
  }

  function loadComunicados() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) {
        
        const obj = {};
        for (let i = 1; i <= TOTAL; i++) obj[String(i)] = '';
        return obj;
      }
      const parsed = JSON.parse(raw);
    
      for (let i = 1; i <= TOTAL; i++) {
        if (!(String(i) in parsed)) parsed[String(i)] = '';
      }
      return parsed;
    } catch (err) {
      console.error('Erro lendo comunicados do localStorage:', err);
      const obj = {};
      for (let i = 1; i <= TOTAL; i++) obj[String(i)] = '';
      return obj;
    }
  }

  function saveComunicados() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(comunicados));
    } catch (err) {
      console.error('Erro salvando comunicados:', err);
      alert('Não foi possível salvar localmente (localStorage indisponível).');
    }
  }

  function alertaCurto(msg) {
  
    const div = document.createElement('div');
    div.textContent = msg;
    div.style.position = 'fixed';
    div.style.bottom = '20px';
    div.style.left = '50%';
    div.style.transform = 'translateX(-50%)';
    div.style.background = '#111';
    div.style.color = '#fff';
    div.style.padding = '8px 14px';
    div.style.borderRadius = '8px';
    div.style.opacity = '0.95';
    div.style.zIndex = 9999;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 1400);
  }
});
