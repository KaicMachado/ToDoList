const formulario = document.querySelector("form");
const ul = document.querySelector(".listaTarefas");
const listaTarefas = [];
const totalTarefas = document.querySelector(".totalTarefas");

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

  if (listaTarefas.length === 0)
   // coloco quantas tarefas ainda tenho
   totalTarefas.innerText = `Você não tem nenhuma tarefa`;
  else if (listaTarefas.length <= 1)
   totalTarefas.innerText = `Você tem uma tarefa`;
  else totalTarefas.innerText = `Você ainda tem ${listaTarefas.length} tarefas`;

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

  // excluir tarefa
  botao.addEventListener("click", () => {
   botao.parentElement.classList.add("removendo");

   botao.parentElement.addEventListener("transitionend", () => {
    botao.parentElement.remove();
   });

   const itemRemovido = listaTarefas.indexOf(botao.parentElement.textContent);
   if (itemRemovido !== -1) listaTarefas.splice(itemRemovido, 1);

   if (listaTarefas.length === 0)
    totalTarefas.textContent = `Você não tem nenhuma tarefa`;
   else if (listaTarefas.length === 1)
    totalTarefas.textContent = `Você tem uma tarefa`;
   else
    totalTarefas.textContent = `Você ainda tem ${listaTarefas.length} tarefas`;
  });
 }
});
