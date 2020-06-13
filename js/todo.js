class Todo{
    constructor(){
        this.$todoToggler = document.querySelector(".todo-toggler");
        this.$todoSection = document.querySelector(".todo-section");
        this.$todoList = document.querySelector(".todo-list");
        this.$todoPrimaryInput = document.querySelector(".todo-primary-input");
        this.$allTodoToggler = document.querySelector(".todo-toggle-checkbox");
        
        this.allCompleted = true; 
        this.todos = JSON.parse(localStorage.getItem("todos")) || [];
        this.activeTab = localStorage.getItem("activeTab") || "all";
        this.addEventListeners();
    }
    addEventListeners(){
        window.addEventListener("load",(e) => {
            this.createTodoInList();
            this.showBottomInfoAndAllCheckboxToggler();
            this.pendingTasksInformation()
        })

        document.body.addEventListener("click",(e) => {
            this.handleClickOnTodoClose(e);
            this.handleClickOnTodoCheckbox(e);
            this.handleClickOnAllTodoToggler(e);
            this.handleTodoInfoButtonClicks(e);
            
        })

        this.$todoToggler.addEventListener("click",(e) => {
            this.$todoSection.classList.toggle("hide-todo-section");
        })

        this.$todoPrimaryInput.addEventListener("keyup",(e) => {
            if(e.keyCode === 13){
                const primaryInputVal = e.target.value;
                this.$todoPrimaryInput.value = "";
                this.todos.push({
                    id:this.randomIdGeneratorLi(),
                    todoDesc:primaryInputVal[0].toUpperCase() + primaryInputVal.slice(1),
                    completed:false
                })
                localStorage.setItem("todos",JSON.stringify(this.todos));
                this.activeTab = "all";
                this.createTodoInList();
                this.showBottomInfoAndAllCheckboxToggler();
                this.pendingTasksInformation()
            }
        })

    }

    randomIdGeneratorLi(length = 10){
        let idPattern = "a";
        for(let i = 0; i < length; i++) {
            idPattern += Math.floor(Math.random() * length)
        }
        return idPattern;
    }

    createTodoInList(todosData = this.todos){
        this.$todoList.innerHTML = "";
        this.$todoList.innerHTML = todosData.map((todo,index) => {
            return `
                <li class="todo-item flex" data-id=${todo.id} >
                    <span class="todo-checkbox-span">
                        <input class="todo-checkbox" type="checkbox" id="todo-checkbox-${todo.id}" ${todo.completed ? "checked" : ""}>
                        <label for="todo-checkbox-${todo.id}"></label>
                    </span>
                    <span class="todo-description">
                        ${todo.todoDesc}
                    </span>
                    <span class="todo-close">
                        <i class="fas fa-times"></i>
                    </span>
                </li>
            `;
        }).join("")
    }

    handleClickOnTodoClose(e){
        let element = e.target.closest(".todo-close");
        if(!element) return;
        let parentLi = element.parentElement;
        const getId = parentLi.dataset.id;
        this.todos = this.todos.filter(todo => todo.id !== getId);
        localStorage.setItem("todos",JSON.stringify(this.todos));
        this.createTodoInList();
        this.showBottomInfoAndAllCheckboxToggler()
        this.pendingTasksInformation()
    }

    handleClickOnTodoCheckbox(e){
        let element = e.target.closest(".todo-checkbox");
        if(!element) return;
        let parentLi = element.parentElement.parentElement;
        const getId = parentLi.dataset.id;
        const todoToBeToggled = this.todos.find(todo => todo.id === getId);
        todoToBeToggled.completed = !todoToBeToggled.completed;
        localStorage.setItem("todos",JSON.stringify(this.todos));
        this.createTodoInList();
        this.showBottomInfoAndAllCheckboxToggler();
        this.pendingTasksInformation()
    }

    showBottomInfoAndAllCheckboxToggler(){
        if(this.todos.length){
            this.$allTodoToggler.classList.add("todo-toggle-checkbox-display");
            this.$todoPrimaryInput.classList.add("todo-primary-input-short");
            this.appendTodoInfoToTodoList();
        } else {
            this.$todoPrimaryInput.classList.remove("todo-primary-input-short");
            this.$allTodoToggler.classList.remove("todo-toggle-checkbox-display");
        }
    }

    handleClickOnAllTodoToggler(e){
        let element = e.target.closest(".todo-toggle-checkbox");
        if(!element) return;
        this.todos.map(todo => todo.completed = this.allCompleted)
        this.allCompleted = !this.allCompleted;
        localStorage.setItem("todos",JSON.stringify(this.todos));
        this.createTodoInList();
        this.showBottomInfoAndAllCheckboxToggler();
        this.pendingTasksInformation()
    }

    appendTodoInfoToTodoList(){
        this.$todoList.innerHTML += `
            <li class="todo-info todo-item flex">
                <div class="todo-items-left">
                    <span class="item-number-left">${this.todos.filter(todo => !todo.completed).length}</span> items left
                </div>
                <div class="button-container flex">
                    <button class="info-btn all ${this.activeTab === 'all' ? 'is-active' : '' }">All</button>
                    <button class="info-btn active ${this.activeTab === 'active' ? 'is-active' : '' }">Active</button>
                    <button class="info-btn completed ${this.activeTab === 'completed' ? 'is-active' : '' }">Completed</button>
                    <button class="info-btn clear-completed ${this.activeTab === 'clear-completed' ? 'is-active' : '' }">Clear Completed</button>
                </div>
            </li>
        `
    }

    handleTodoInfoButtonClicks(e){
        let element = e.target.closest(".info-btn");
        if(!element) return;
        if(element.classList.contains("all")){
            this.activeTab = "all"
            this.createTodoInList();
        } else if (element.classList.contains("active")) {
            this.activeTab = "active";
            this.createTodoInList(this.todos.filter(todo => !todo.completed));
        } else if (element.classList.contains("completed")) {
            this.activeTab = "completed";
            this.createTodoInList(this.todos.filter(todo => todo.completed));
        } else {
            this.activeTab === "clear-completed";
            this.todos = this.todos.filter(todo => !todo.completed);
            localStorage.setItem("todos",JSON.stringify(this.todos));
            this.createTodoInList();
            this.pendingTasksInformation()
        }
        this.showBottomInfoAndAllCheckboxToggler();
    }

    pendingTasksInformation(){
        let pendingTaskHtml = ``;
        let activeTasks = this.todos.filter(todo => !todo.completed);
        if(activeTasks.length){
            pendingTaskHtml += `
                <p class="pending-header">You have ${activeTasks.length} task pending. Top 3 tasks :</p>
                
            `;
            activeTasks = activeTasks.slice(0,3)
            pendingTaskHtml += `
                <ul class="pending-list">
                    ${activeTasks.map((activeTask,index) => {
                        return `<li class="pending-item"> 
                                    ${activeTask.todoDesc}
                                </li>`
                    }).join("")}
                </ul>
            `;
        }else {
            pendingTaskHtml += `<p class="pending-header">Hurray!!! You have no tasks pending</p>`
        }
        document.querySelector(".pending-task-container").innerHTML = pendingTaskHtml;
    }


}






new Todo();