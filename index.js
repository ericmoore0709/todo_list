function onFullyLoaded() {

    document.getElementById("task_list").addEventListener('click', (e) => {
        // if the clicked item is an li...
        if (e.target.tagName === "LI") {
            // toggle class "checked"
            e.target.classList.contains("checked") ? e.target.classList.remove("checked") : e.target.classList.add("checked")
        }
    })

    document.querySelector("form").addEventListener("submit", (e) => {
        // prevent default submission
        e.preventDefault();

        // get the input text
        const textValue = document.getElementById("task_text").value.trim();

        // if there isn't any input text, don't bother.
        if (!textValue) return;

        // else create an li node to add
        const newLi = document.createElement("li");

        newLi.innerText = textValue;

        // add li node
        document.getElementById("task_list").appendChild(newLi);

        // clear input text
        document.getElementById("task_text").value = ""

    });

    document.getElementById("clear_tasks").addEventListener("click", () => {
        // for each li...
        document.querySelectorAll("li").forEach((li) => {
            // if li is checked...
            if (li.classList.contains("checked")) {
                // remove li.
                document.getElementById("task_list").removeChild(li);
            }
        })
    });

    document.getElementById("save_config").addEventListener("click", () => {
        const originalData = document.querySelectorAll("li");
        const dataObj = [];
        originalData.forEach((li) => {
            dataObj.push({ text: li.innerText, checked: li.classList.contains("checked") });
        })
        localStorage.setItem("data", JSON.stringify(dataObj));
    });

    document.getElementById("load_config").addEventListener("click", () => {

        if (!confirm("Are you sure you want to load the previous configuration? All unsaved data will be lost.")) {
            return;
        }

        const data = JSON.parse(localStorage.getItem("data"));
        const taskList = document.getElementById("task_list");

        // clear the to-do list as-is
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        data.forEach((li) => {
            const newLi = document.createElement("li");
            newLi.innerText = li.text;
            if (li.checked) newLi.classList.add("checked");
            taskList.appendChild(newLi);
        })
    });
}

window.addEventListener("load", onFullyLoaded);