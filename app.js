//Thought Class
class Thought {
    constructor(thought, whatElse, thatsIt) {
        this.thought = thought;
        this.whatElse = whatElse;
        this.thatsIt = thatsIt;
    }
}


//UI Class
class UI {
    static displayThoughts() {
        const thoughts = Store.getThoughts();

        thoughts.forEach((thought) => UI.addThoughtToList(thought));
    }
    static addThoughtToList(thought) {
        const list = document.querySelector('#thought-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${thought.thought}</td>
        <td>${thought.whatElse}</td>
        <td>${thought.thatsIt}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;

        list.appendChild(row);
    }

    static deleteThought(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');

        const form = document.querySelector("#thought-form");
        
        container.insertBefore(div, form);

        //Vanish in 1.5 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 1500);
    }

    static clearFields() {
        document.querySelector('#thought').value = '';
        document.querySelector('#what-else').value = '';
        document.querySelector('#all-out').value = '';
    }
}


//Storage Class
class Store {
    static getThoughts() {
        let thoughts;
        if(localStorage.getItem('thoughts') === null) {
            thoughts = [];
        } else {
            thoughts = JSON.parse(localStorage.getItem('thoughts'));
        }
        return thoughts;
    }

    static addThoughts(thought) {
        const thoughts = Store.getThoughts();
        thoughts.push(thought);

        localStorage.setItem('thoughts', JSON.stringify(thoughts));
    }

    static removeThoughts(thought) {
        const thoughts = Store.getThoughts();

        thoughts.forEach((thought, index) => {
            if(thought.thatsIt === thatsIt) {
                thoughts.splice(index, 1);
            }
        });

        localStorage.setItem('thoughts', JSON.stringify(thoughts));

    }
}

//Event: Show thought
document.addEventListener('DOMContentLoaded', UI.displayThoughts);

//Event: Add Thought
document.querySelector('#thought-form').addEventListener('submit', (e) => {
    // prevent default 
    e.preventDefault();

    //Get thought values 
    const thought = document.querySelector('#thought').value;
    const whatElse = document.querySelector('#what-else').value;
    const thatsIt = document.querySelector('#all-out').value;

    //Validate
    if (thought === '' || whatElse === '' || thatsIt === '') {
        UI.showAlert('All fields should be filled out', 'danger'); 
    } else {
    //instantiate thought
    const think = new Thought(thought, whatElse, thatsIt);

    //Add thought to the list
    UI.addThoughtToList(think);

    //Add thought to store
    Store.addThoughts(thought);

    //show success message
    UI.showAlert('Thought Added', 'success');

    //clear fields
    UI.clearFields();

    }
});

//Event: Remove Thought 
document.querySelector('#thought-list').addEventListener('click', (e) => {
    UI.deleteThought(e.target)


    //show success message
    UI.showAlert('Thought Removed', 'success');

});