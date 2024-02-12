function onFullyLoaded() {

    document.getElementById("task_list").addEventListener('click', (e) => {

        if (e.target.tagName === "BUTTON") {
            // ensure the user wishes to delete the task
            if (!confirm("Are you sure you want to delete this task?"))
                return;

            // delete the li from the list
            document.getElementById("task_list").removeChild(e.target.parentElement);
        } else if (e.target.tagName === "LI") {
            // if the clicked item is the LI text, toggle class "checked"
            e.target.classList.contains("checked") ? e.target.classList.remove("checked") : e.target.classList.add("checked")
        }

        // add change to local storage
        saveData();

    })

    document.querySelector("form").addEventListener("submit", (e) => {
        // prevent default submission
        e.preventDefault();

        // get the input text (if it exists)
        const textValue = document.getElementById("task_text").value.trim();
        if (!textValue) return;

        // else create an li node to add
        const newLi = createLi(textValue, false);

        // add li node to tasklist
        document.getElementById("task_list").appendChild(newLi);

        // clear input text
        document.getElementById("task_text").value = ""

        // add change to local storage
        saveData();

    });

    document.getElementById("clear_tasks").addEventListener("click", () => {
        // ensure tasks to be cleared
        if (!confirm("Are you sure you want to clear all completed tasks? This action cannot be undone."))
            return

        // for each li...
        document.querySelectorAll("li").forEach((li) => {
            // if li is checked...
            if (li.classList.contains("checked")) {
                // remove li.
                document.getElementById("task_list").removeChild(li);
            }
        })

        saveData();

    });

    /**
     * Updates the local storage data store with the current task list data representation
     */
    function saveData() {
        const data = [];
        const taskList = document.getElementById("task_list").childNodes;

        taskList.forEach((li) => {

            const obj = {
                taskName: li.innerText.substring(0, li.innerText.length - 1),
                checked: li.classList.contains("checked"),
            }
            data.push(obj);
        });

        localStorage.setItem("data", JSON.stringify(data));
    }

}

document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(localStorage.getItem("data"));
    const taskList = document.getElementById("task_list");

    // for each task in data
    data.forEach((task) => {

        // create an li node to add
        const newLi = createLi(task.taskName, task.checked);

        // add li node to tasklist
        taskList.appendChild(newLi);
    });
})

/**
 * Returns an li element with innerText text and checked class if checked.
 * @param {*} text the innerText to set
 * @param {*} checked whether to add checked class to li
 * @returns the new li node
 */
function createLi(text, checked) {
    const li = document.createElement("li");
    li.innerText = text;
    if (checked)
        li.classList.add("checked");

    // add delete button
    const delBtn = document.createElement("button");
    delBtn.classList.add("delete_button");
    delBtn.innerText = "X"
    li.appendChild(delBtn);

    return li;

}

window.addEventListener("load", onFullyLoaded);