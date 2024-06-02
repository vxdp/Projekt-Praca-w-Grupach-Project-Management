const cards = document.querySelector(".Projects_Holder");
const main = document.querySelector("main");
const AllUserList = document.querySelector(".all-users");
let CurrentSelectedUsers = null;
let IsOpen = false;

const projects = [
    {
        taskName :"Status Meeting with the Client",
        TODO : ["Prepare a proper roadmap for the meeting."],
        INPROGRESS : ["Carry out research into the topic."],
        DONE : ["Send out the invitations."],

    },
    {
        taskName :"Debug the Product",
        TODO : ["NPCs do not spawn."],
        INPROGRESS : ["Missing 2 items from the shop."],
        DONE : ["The Player-spawn does not work!"],

    },
    {
        taskName :"Finish the new Website",
        TODO : ["Publish it. "],
        INPROGRESS : ["Proofwrite the contents."],
        DONE : ["Search for bugs."],
    }
];

function hideCards(){
    RefreshDisplayAll()
    document.querySelector(".getBack").classList.remove("hide");
    cards.classList.add("hide");
    IsOpen = false;
    AllUserList.classList.remove("hide");
}

function showCards(){
    RefreshDisplayAll()
    cards.classList.remove("hide");
    document.querySelector(".getBack").classList.add("hide");
}

function showGetBack(project){
    if(!document.querySelector(".getBack")){

        const getBack = document.createElement("div");
        getBack.classList.add("getBack");

        const BackP = document.createElement("p");
        BackP.innerHTML = "Return"
        BackP.classList.add("getBack-btn");

        const GetBackText = document.createElement("p");
        GetBackText.classList.add("GetBackText");
        GetBackText.innerText = project.taskName;

        getBack.appendChild(BackP);
        getBack.appendChild(GetBackText);
        main.appendChild(getBack);
        main.insertBefore(getBack, main.firstChild);


        BackP.addEventListener("click", ()=>{
            showCards();
            main.removeChild(document.querySelector(".tasks-list"));
            document.querySelector(".users-list").innerHTML = "";
            document.querySelector(".extend-list").classList.add("hide");
        })
    } else{
        document.querySelector(".GetBackText").innerText = project.taskName;
    }
}



function showArrays(project, taskToShow, listElemToShow){
    const tasksList = document.createElement("div");
    tasksList.classList.add("tasks-list");

    function showTasksCards(t1, t2){
        const todoParent = document.createElement("div");
        todoParent.classList.add("card");
        const listHeader = document.createElement("h4");
        listHeader.innerText = t1;
        const todoChild = document.createElement("div");
        todoChild.classList.add("list-elem");
        todoChild.innerText = t2;
    
        todoParent.appendChild(listHeader);
        todoParent.appendChild(todoChild);
        tasksList.appendChild(todoParent);
    }

    const ProjectElems = [project.TODO, project.INPROGRESS, project.TESTING, project.DONE];
    
   
    ProjectElems.forEach((elems, i)=>{
        if(i == 0){
            showTasksCards("To-Do's", project.TODO)
        } else if(i == 1){
            showTasksCards("Work In Progress", project.INPROGRESS);
        } else if(i == 2){
            showTasksCards("Done", project.DONE);
    }
        main.appendChild(tasksList)
        })
}



const usersT1 = ["John Doe","Jack Smith"];
const usersT2 = ["Phill Williams", "Taylor Anderson"];
const usersT3 = ["Kate Garcia","Mike Wilson"];
const IdToTable = [usersT1,usersT2,usersT3]


projects.forEach((project, index)=>{
    console.log("id" + index)
    const div = document.createElement("div");
    div.classList.add("card");
    const projectName = document.createElement("h4");
    projectName.innerText = project.taskName;

    div.id = index + 1;

    div.appendChild(projectName);
    cards.appendChild(div);
    
    div.addEventListener("click", ()=>{
        IsOpen = true;
        AllUserList.classList.add("hide");
        showGetBack(project);
        hideCards();
        showArrays(project);

        document.querySelector(".extend-list").classList.remove("hide");
        CurrentSelectedUsers = IdToTable[index]

        CurrentSelectedUsers.forEach((e)=>{
            const user = document.createElement("li");
            user.innerText = e;

            document.querySelector(".users-list").appendChild(user);
        });
    })
})

document.querySelector(".addUser").addEventListener("click", ()=>{
    let addUserP = prompt("Assign another Person:");
     document.querySelector(".users-list").innerHTML = "";
     CurrentSelectedUsers.push(addUserP);

 refreshData(CurrentSelectedUsers)
})

function RefreshDisplayAll(){
    const myNode = AllUserList
    while (myNode.lastElementChild) {
      myNode.removeChild(myNode.lastElementChild);
    }
    let AllUsers = []
    for(i=0;i<usersT1.length;i++){
        AllUsers.push(usersT1[i])
    }
    for(i=0;i<usersT2.length;i++){
        AllUsers.push(usersT2[i])
    }
    for(i=0;i<usersT3.length;i++){
        AllUsers.push(usersT3[i])
    }
    for(i=0;i<AllUsers.length;i++){
        console.log("appending "+AllUsers)
        const user = document.createElement("li");
        user.innerText = AllUsers[i];
        AllUserList.appendChild(user);
    }
}

function refreshData(arr){
    RefreshDisplayAll()
    console.log("Refresher! "+arr);
    arr.forEach((e)=>{
        const user = document.createElement("li");
        user.innerText = e;
        
        document.querySelector(".users-list").appendChild(user);
    });
}