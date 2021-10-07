<template>
    <div class="container">
        <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
                <span class="fs-4">CRUD MEVN</span>
            </a>

            <ul class="nav nav-pills">
                <li class="nav-item"><a href="#" class="nav-link active" aria-current="page">Home</a></li>
                <li class="nav-item"><a href="#" class="nav-link">Features</a></li>
                <li class="nav-item"><a href="#" class="nav-link">Pricing</a></li>
                <li class="nav-item"><a href="#" class="nav-link">FAQs</a></li>
                <li class="nav-item"><a href="#" class="nav-link">About</a></li>
            </ul>
        </header>
        <div class="row g-5">
            <div class="col-md-8">
                <article class="blog-post">
                    <h2 class="blog-post-title">Mis tareas</h2>
                    <table class="table">
                        <thead>
                            <tr>
                            <th>Título</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="task of tasks" :key="task.id">
                                <td>{{task.title}}</td>
                                <td>{{task.description}}</td>
                                <td>
                                    <button class="btn btn-danger" @click="deteleTask(task._id)" >Eliminar</button>
                                    <button class="btn btn-primary" @click="editTask(task._id)" >Editar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    
                </article>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent="sendTask()">
                            <div class="form-group m-3">
                                <input v-model="task.title" type="text" placeholder="Ingrese una tarea" class="form-control">
                            </div>
                            <div class="form-group m-3">
                                <textarea v-model="task.description" cols="30" rows="20" class="form-control" placeholder="Ingrese una descripción"></textarea>
                            </div>
                            <template v-if="edit">
                                <div class="form-group m-3">
                                    <button class="btn btn-primary btn-block" > Actualizar</button>
                                </div>
                            </template>
                            <template v-else>
                                <div class="form-group m-3">
                                    <button class="btn btn-primary btn-block" > Enviar</button>
                                </div>
                            </template>
                        </form>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import TaskModel from '../../resources/js/models/Task.model';

    export default {    
        data(){
            return {
                task: new TaskModel(),
                tasks: [],
                edit: false,
                taskId:null,
            }
        },
        created(){
            this.getTasks();
        },
        methods:{
            getTasks(){
                fetch('/api/tasks')
                .then(res => res.json())
                .then(data => {
                    this.tasks = data;
                })
            },
            sendTask(){

                if(!this.edit){
                    fetch('/api/tasks',{
                        method: 'POST',
                        body: JSON.stringify(this.task),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type':'application/json',
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.getTasks();
                    })
                } else {
                    fetch('/api/tasks/'+this.taskId,{
                        method: 'PUT',
                        body: JSON.stringify(this.task),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type':'application/json',
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.getTasks();
                    })

                    this.edit = false;
                }
                
                this.task = new TaskModel();
            },
            deteleTask(id){
                fetch('/api/tasks/'+ id,{
                    method: 'DELETE',
                    body: JSON.stringify(this.task),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type':'application/json',
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.getTasks();
                })
            },
            editTask(id){
                this.edit = true;
                fetch('/api/tasks/'+ id)
                .then(res => res.json())
                .then(data => {
                    this.task = new TaskModel(data.title,data.description);
                    this.taskId = data._id;
                })
            }
        }
    }
</script>
