class Todo{
    constructor(){
        this.$todoToggler = document.querySelector(".todo-toggler");
        this.$todoSection = document.querySelector(".todo-section");
        this.$todoList = document.querySelector(".todo-list");
        this.$todoPrimaryInput = document.querySelector(".todo-primary-input");
        this.todos = JSON.parse(localStorage.getItem("todos")) || [];
        this.addEventListeners();
    }
    addEventListeners(){
        document.body.addEventListener("click",function(e){

        })

        this.$todoToggler.addEventListener("click",(e) => {
            this.$todoSection.classList.toggle("hide-todo-section");
        })

        this.$todoPrimaryInput.addEventListener("keyup",(e) => {
            if(e.keyCode === 13){
                const primaryInputVal = e.target.value;
                this.$todoPrimaryInput.value = "";
                this.todos.push({
                    todoDesc:primaryInputVal,
                    completed:false
                })
                localStorage.setItem("todos",JSON.stringify(this.todos));
                this.createTodoInList();
            }
        })

    }

    createTodoInList(todosData = this.todos){
        this.$todoList.innerHTML = "";
        this.$todoList.innerHTML = todosData.map(todo => {
            return `
                <li class="todo-item flex">
                    <span class="todo-checkbox-span">
                        <input type="checkbox" id="todo-checkbox-0">
                        <label for="todo-checkbox-0"></label>
                    </span>
                    <span class="todo-description">
                        Learning Javascript
                    </span>
                    <span class="todo-close">
                        <i class="fas fa-times"></i>
                    </span>
                </li>
            `;
        }).join("")
    }


}






new Todo();