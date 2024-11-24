// Function to populate task table with comments
function populateTaskTable(taskData) {
	const taskTable = document.getElementById("task-table").getElementsByTagName("tbody")[0];
	taskTable.innerHTML = ""; // Clear previous task rows

	taskData.forEach((task, idx) => {
		const row = taskTable.insertRow();
		row.innerHTML = `
			<td>${idx + 1}</td>
			<td>${task.content}</td> 
			<td>${task.comment_email}</td> 
			<td>${task.creation}</td>
		`;
	});
}

// Function to populate sidebar
function populateSidebar() {
	const taskList = document.getElementById("task-list");
	taskList.innerHTML = ""; // Clear existing items

	frappe.call({
		method: "get_all_tasks",
		callback: function(r) {
			r.message.forEach((task) => {
				const div = document.createElement("div");
				div.classList.add('listt');
				div.setAttribute('data-task-id', task.name); // Add a unique identifier

				const listItem = document.createElement("span");
				listItem.classList.add('text-sm')
				const customerName = document.createElement("span");
				customerName.classList.add('text-sm')

				listItem.textContent = `Task: ${task.subject}`;
				customerName.textContent = `Customer: ${task.name1}`;

				div.addEventListener("click", () => selectTask(task.name));
				div.appendChild(customerName);
				div.appendChild(listItem);
				taskList.appendChild(div);
			});
			
			// Select the first task automatically on page load
			if (r.message.length > 0) {
				selectTask(r.message[0].name); // Automatically select and display the first task
			}
		}
	});
}


// Function to select a task and update the task table with its comments
function selectTask(taskId) {
	// Fetch task comments
	frappe.call({
		method: "get_task_comments",
		args: {
			"task_id": taskId
		},
		callback: function(r) {
			// Update the task table with selected task data
			populateTaskTable(r.message);	
		}
	});

	// Fetch task details to update project details
	frappe.call({
		method: "get_task_by_id",
		args: {
			"task_id": taskId
		},
		callback: function(r) {
			const task = r.message[0];
			document.getElementById("project-title").textContent = task.project || "No project title specified";  
			document.getElementById("planned-completion-date").textContent = task.exp_start_date || "No date specified"; 
			document.getElementById("actual-completion-date").textContent = task.exp_end_date || "No date specified"; 
			document.getElementById("project-status").textContent = task.status || "No status specified"; 
			document.getElementById("project-manager").textContent = "Eng.Abdirahman Ahmed Hirsi"; 
			document.getElementById("Progress").textContent = `${task.progress}%`|| "No progress specified"; 
			document.getElementById("planned-closeout-date").textContent = task.completed_on || "No date specified"; 
		}
	});

	// Highlight selected task in the sidebar
	const taskListItems = document.querySelectorAll("#task-list .listt");
	taskListItems.forEach((item) => {
		item.classList.remove("selected");
		if (item.getAttribute('data-task-id') === taskId) { // Check using data-task-id attribute
			item.classList.add("selected");
			item.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	});
}


// Initialize page
frappe.pages['task-comments'].on_page_load = function(wrapper) {
	new TASKCOMMENTS(wrapper);
};

TASKCOMMENTS = Class.extend({
	init: function(wrapper) {
		this.page = frappe.ui.make_app_page({
			parent: wrapper,
			title: "Task comments",
			single_column: true
		});
		this.make();
	},

	make: function() {
		let me_s = this;
		$(frappe.render_template("task_comments", me_s)).appendTo(me_s.page.main);
		populateSidebar(); // Populate sidebar on page load
	}
});
