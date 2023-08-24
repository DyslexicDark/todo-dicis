const formulario = document.getElementById('formulario')
const listatareas = document.getElementById('lista-tareas')
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()
//Variable Global para las tareas como objeto
let tareas = {}
//Agregamos Eventos
document.addEventListener('DOKContentLoaded',()=>{
    if(localStorage.getItem('tareas'))
    {
        tareas=JSON.parse(localStorage.getItem('tareas'))
    }
    pintarTareas()
})
const pintarTareas = () =>{
    localStorage.setItem('Tareas', JSON.stringify(tareas))
    if(Object.values(tareas).length==0)
    {
        listatareas.innerHTML= `
            <div class="alert alert-dark">
                No task pending
            </div>
        `
        return
    }
    listatareas.innerHTML=''
    Object.values(tareas).forEach((tarea)=>{
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent=tarea.texto
        if (tarea.estado){
            clone.querySelector('.fas')[0].classList.replace('fa-circule-check', 'fa-undo-alt')
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
            clone.querySelector('p').style.textDecoration='line-through'
        }
        clone.querySelectorAll('.fas')[0].dataset.id=tarea.id
        clone.querySelectorAll('.fas')[1].dataset.id=tarea.id
        fragment.appendChild(clone)
    })
    listatareas.appendChild(fragment)
}