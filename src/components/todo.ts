export class TodoComponent {
    #targetEl: HTMLElement | undefined;
    #listEl: HTMLElement | undefined;
    #footerEl: HTMLElement | undefined;
    #inputEl: HTMLTextAreaElement | undefined;
    #addButtonEl: HTMLButtonElement | undefined;
    #boxEl: HTMLElement | undefined;
    #boxEl2: HTMLElement | undefined;
    #contentboxEl: HTMLElement | undefined;
    #deleteButtonEl: HTMLButtonElement | undefined;
    #editButtonEl: HTMLButtonElement | undefined;

    mount(targetEl: HTMLElement) {
        this.#targetEl = targetEl

        this.#listEl = document.createElement('ul');
        this.#targetEl.appendChild(this.#listEl);


        this.#footerEl = document.createElement('form');


        this.#inputEl = document.createElement('textarea');
        this.#footerEl.appendChild(this.#inputEl);

        this.#boxEl = document.createElement('div');
        this.#boxEl2 = document.createElement('div');
        this.#addButtonEl = document.createElement('button');
        this.#addButtonEl.textContent = 'Dodaj'


        this.#addButtonEl.addEventListener('click', (evt) => {
            this.addItem()
            evt.preventDefault()
        })
        this.#contentboxEl = document.createElement('div');
        this.#contentboxEl.classList.add('contentbox');

        this.#deleteButtonEl = document.createElement('button');
        this.#deleteButtonEl.textContent = 'Usuń'

        this.#editButtonEl = document.createElement('button');
        this.#editButtonEl.textContent = 'Edytuj'

        this.#contentboxEl.appendChild(this.#listEl);
        this.#targetEl.appendChild(this.#contentboxEl);
        this.#footerEl.appendChild(this.#boxEl);
        this.#footerEl.appendChild(this.#boxEl2);
        this.#boxEl.appendChild(this.#inputEl);
        this.#boxEl2.appendChild(this.#addButtonEl);


        this.#targetEl.appendChild(this.#footerEl);
        this.#footerEl.classList.add('formmax')
    }

    addItem(extText?: string) {
        const itemEl = document.createElement('li');
        const checkboxEl = document.createElement('input');
        const textEl = document.createElement('span');
        const buttonContainer = document.createElement('div');
    
        checkboxEl.type = 'checkbox';

        checkboxEl.addEventListener('change', () => {
            textEl.style.textDecoration = checkboxEl.checked ? 'line-through' : 'none';
        });

        textEl.textContent = extText ? extText : this.#inputEl?.value ?? '';
    
        itemEl.classList.add('licolor');
        buttonContainer.classList.add('buttonsli');

        const listLength = this.#listEl?.children.length ?? 0;
        if (listLength % 2 === 0) {
            itemEl.classList.add('licolorsecond');
        }

        const deleteButtonEl = document.createElement('button');
        deleteButtonEl.textContent = 'Usuń';
        deleteButtonEl.addEventListener('click', () => {
            itemEl.remove(); 
        });

        const editButtonEl = document.createElement('button');
        editButtonEl.textContent = 'Edytuj';
        editButtonEl.addEventListener('click', () => {
            const newText = prompt('Nowy tekst:', textEl.textContent || '');
            if (newText) {
                textEl.textContent = newText;
            }
        });
    
        buttonContainer.append(deleteButtonEl, editButtonEl);

        itemEl.append(checkboxEl, textEl, buttonContainer);

        if (this.#inputEl) this.#inputEl.value = '';
        else throw new Error('Component probably not initialized!');
    
        if (this.#listEl) {
            this.#listEl.appendChild(itemEl);
        } else {
            throw new Error('Component probably not initialized!');
        }
    }
}    


export function putLog(message: string) {
    console.log(message)
}