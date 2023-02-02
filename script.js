const addNoteButton = document.getElementById("add");
const allNotes = document.querySelector(".notes");

const storeData = () => {
  const notes = [];

  const textAreaData = document.querySelectorAll("textarea");
  textAreaData.forEach((note) => {
    return notes.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
};

const addFunction = (text = "") => {
  const div = document.createElement("div");
  div.classList.add("note");
  allNotes.insertAdjacentElement("beforeend", div);
  const noteData = `
    <div class="operation">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}">${text}</div>
    <textarea class="${text ? "hidden" : ""}">${text}</textarea>
    `;
  div.insertAdjacentHTML("beforeend", noteData);

  const editButton = div.querySelector(".edit");
  const mainDiv = div.querySelector(".main");
  const textArea = div.querySelector("textarea");
  const deleteButton = div.querySelector(".delete");

  textArea.addEventListener("change", (event) => {
    text = event.target.value;
    mainDiv.innerHTML = text;
  });

  editButton.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
    if (textArea.classList.contains("hidden") && text != "") {
      storeData();
    }
  });

  deleteButton.addEventListener("click", () => {
    div.remove();
    storeData();
  });
};

const notes = (JSON.parse(localStorage.getItem('notes')) || []);

notes.forEach((note) => {
    addFunction(note);
})

addNoteButton.addEventListener("click", () => addFunction());
