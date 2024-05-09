const btnAdicionarTarefa = document.querySelector(".app__button--add-task");
const formadicionarTarefa = document.querySelector(".app__form-add-task");
const textArea = document.querySelector(".app__form-textarea");
const ulTarfea = document.querySelector(".app__section-task-list");
const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas')
const btnRemoverTodas = document.querySelector('#btn-remover-todas')
const paragrafoDescricaoTarefa = document.querySelector(".app__section-active-task-description");
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let tarefaSelelacionada = null;
let liTarefaSelecionada = null;
function atualizarTarefa() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}
function criarElementoTarefa(tarefa) {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");

  const svg = document.createElement("svg");
  svg.innerHTML = `  
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
    <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
</svg>
`;
  const paragrafo = document.createElement("p");
  paragrafo.textContent = tarefa.descricao;

  const button = document.createElement("button");
  button.onclick = () => {
    const novaDescricao = prompt("Qual é o novop nome da tarefa?");
    if (novaDescricao) {
      paragrafo.textContent = novaDescricao;
      tarefa.descricao = novaDescricao;
      atualizarTarefa();
    }
  };
  button.classList.add("app_button-edit");
  const imgbutton = document.createElement("img");
  imgbutton.setAttribute("src", "./imagens/edit.png");
  paragrafo.classList.add("app__section-task-list-item-description");
  button.append(imgbutton);
  li.append(svg);
  li.append(paragrafo);
  li.append(button);

  if (tarefa.completa) {
    li.classList.add("app__section-task-list-item-complete");
    button.setAttribute("disabled", "disabled");
  } else {
  }
  li.onclick = () => {
    document
      .querySelectorAll(".app__section-task-list-item-active")
      .forEach((elemento) => {
        elemento.classList.remove("app__section-task-list-item-active");
      });
    if (tarefaSelelacionada == tarefa) {
      paragrafoDescricaoTarefa.textContent = "";
      tarefaSelelacionada = null;
      liTarefaSelecionada = null;
      return;
    }
    tarefaSelelacionada = tarefa;
    liTarefaSelecionada = li;
    paragrafoDescricaoTarefa.textContent = tarefa.descricao;

    li.classList.add("app__section-task-list-item-active");
  };
  return li;
}
btnAdicionarTarefa.addEventListener("click", () => {
  formadicionarTarefa.classList.toggle("hidden");
});
formadicionarTarefa.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const tarefa = {
    descricao: textArea.value,
  };
  const ElementoTArefa = criarElementoTarefa(tarefa);
  ulTarfea.append(ElementoTArefa);
  tarefas.push(tarefa);
  atualizarTarefa();
  textArea.value = "";
  formadicionarTarefa.classList.add("hidden");
});
for (let i = 0; i < tarefas.length; i++) {
  const tarefa = tarefas[i];
  const ElementoTArefa = criarElementoTarefa(tarefa);
  ulTarfea.append(ElementoTArefa);
}
document.addEventListener("FocoFinalizado", () => {
  if (tarefaSelelacionada && liTarefaSelecionada) {
    liTarefaSelecionada.classList.remove("app__section-task-list-item-active");
    liTarefaSelecionada.classList.add("app__section-task-list-item-complete");
    liTarefaSelecionada
      .querySelector("button")
      .setAttribute("disabled", "disabled");
    tarefaSelelacionada.completa = true;
    atualizarTarefa()
  }
});
const removerTarefas = (somentecompletas)=>{
const seletor =somentecompletas ? '.app__section-task-list-item-complete' :'.app__section-task-list-item'
document.querySelectorAll(seletor).forEach(elemento =>{
  elemento.remove()
})
tarefas =somentecompletas ? tarefas.filter(tarefa => !tarefa.completa):[]
atualizarTarefa()
}
btnRemoverTodas.onclick = ()=>{

}
btnRemoverConcluidas.onclick =()=> removerTarefas(true)
btnRemoverTodas.onclick = ()=>removerTarefas(false)