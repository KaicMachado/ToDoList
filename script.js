const formulario = document.querySelector("form");
const ul = document.querySelector(".listaTarefas");
let listaTarefas = [];
const totalTarefas = document.querySelector(".totalTarefas");
window.onload = () => {
 if (localStorage.length > 0) {
  for (let i = 0; i < localStorage.length; i++) {
   const chave = localStorage.key(i);
   const valor = localStorage.getItem(chave);
   listaTarefas.push(valor);

   const botao = criarTarefa(valor);
   excluirTarefa(botao);
  }
 }
 criaTxtDeTarefasRestantes(listaTarefas);
};

formulario.addEventListener("submit", (e) => {
 e.preventDefault();
 const tarefa = document.querySelector("#tarefa").value;

 // verifico se essa tarefa já foi adicionada
 if (listaTarefas.includes(tarefa)) {
  confirm("Está tarefa ja foi adicionada");
  document.querySelector("#tarefa").value = "";
 } else {
  // seleciono o texto do input e coloco no array
  listaTarefas.push(tarefa);

  // Criar tarefa
  const botao = criarTarefa(tarefa);

  // excluir tarefa
  excluirTarefa(botao);

  if (listaTarefas.length === 0)
   totalTarefas.textContent = `Você não tem nenhuma tarefa`;
  else if (listaTarefas.length === 1)
   totalTarefas.textContent = `Você tem uma tarefa`;
  else
   totalTarefas.textContent = `Você ainda tem ${listaTarefas.length} tarefas`;
 }
});

// Função para excluir tarefa
function excluirTarefa(botao) {
 botao.addEventListener("click", () => {
  const txtBtn = botao.parentElement.innerText;
  const key = pegarValue(txtBtn);
  const listaAtualizada = listaTarefas.filter((txt) => txt !== txtBtn);
  listaTarefas = listaAtualizada;
  console.log(listaTarefas);
  botao.parentElement.classList.add("removendo");
  localStorage.removeItem(key);

  criaTxtDeTarefasRestantes(listaTarefas);
  botao.parentElement.addEventListener("transitionend", () => {
   botao.parentElement.remove();
  });
 });
}

function criarTarefa(tarefa) {
 // crio um li para a lista e coloca no html
 const item = document.createElement("li");
 item.textContent = tarefa;
 const botao = document.createElement("button");
 botao.type = "button";
 botao.setAttribute("class", "btnExcluir");
 botao.innerHTML = '<img src="assets/lixeira.svg" alt="Icone Lixeira">';
 item.appendChild(botao);

 item.classList.add("adicionando");
 ul.insertAdjacentElement("afterbegin", item);

 requestAnimationFrame(() => {
  item.classList.remove("adicionando");
  window.localStorage.setItem(listaTarefas.length, tarefa);
 });
 document.querySelector("#tarefa").value = "";
 criaTxtDeTarefasRestantes(listaTarefas);

 return botao;
}

function criaTxtDeTarefasRestantes(listaTarefas) {
 if (listaTarefas.length === 0)
  // coloco quantas tarefas ainda tenho
  totalTarefas.innerText = `Você não tem nenhuma tarefa`;
 else if (listaTarefas.length <= 1)
  totalTarefas.innerText = `Você tem uma tarefa`;
 else totalTarefas.innerText = `Você ainda tem ${listaTarefas.length} tarefas`;
}

function pegarValue(value) {
 // Itera sobre todas as chaves do localStorage
 for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i); // Obtém a chave no índice i
  const storedValue = localStorage.getItem(key); // Obtém o valor armazenado para essa chave

  // Verifica se o valor armazenado é igual ao valor que estamos buscando
  if (storedValue === value) {
   return key; // Retorna a chave correspondente ao valor
  } else null;
 }
}
